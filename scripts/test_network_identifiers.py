"""Checks assets/celo-identifiers.json against the pages that publish the same facts.

Run: python3 -m unittest discover -s scripts -p 'test_*.py'

The JSON file is the machine-readable copy of learn/network/overview.mdx. Every value in it
must appear on that page, and every address must match the pages generated from the chain by
update_contracts.py (fee-currencies.mdx, core-contracts.mdx), so the three cannot drift apart.
Matching is case-sensitive: the generated pages carry EIP-55 checksummed addresses.
"""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IDENTIFIERS = ROOT / "assets" / "celo-identifiers.json"
OVERVIEW = ROOT / "learn" / "network" / "overview.mdx"
FEE_CURRENCIES = ROOT / "build" / "tools" / "contracts" / "fee-currencies.mdx"
CORE_CONTRACTS = ROOT / "build" / "tools" / "contracts" / "core-contracts.mdx"

# Section headings used by the generated contract pages, keyed by chain ID.
SECTIONS = {42220: "## Celo Mainnet", 11142220: "## Celo Sepolia Testnet"}
ADDRESS = re.compile(r"^0x[0-9a-fA-F]{40}$")


def section(text, chain_id):
    """Return the part of a generated page under the heading for this chain."""
    start = text.index(SECTIONS[chain_id])
    rest = text[start + len(SECTIONS[chain_id]):]
    end = rest.find("\n## ")
    return rest if end == -1 else rest[:end]


def table_rows(text):
    return [line for line in text.splitlines() if line.startswith("|")]


class NetworkIdentifiersTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads(IDENTIFIERS.read_text())
        cls.overview = OVERVIEW.read_text()
        cls.fee_currencies = FEE_CURRENCIES.read_text()
        cls.core_contracts = CORE_CONTRACTS.read_text()

    def networks(self):
        self.assertEqual({n["chainId"] for n in self.data["networks"]}, set(SECTIONS))
        return self.data["networks"]

    def overview_row(self, chain_id, label):
        rows = [r for r in table_rows(section(self.overview, chain_id)) if r.startswith(f"| {label}")]
        self.assertEqual(len(rows), 1, f"overview needs exactly one '| {label}' row for {chain_id}")
        return rows[0]

    def test_network_rows_on_the_overview_page(self):
        # Each value must sit in its own labelled row of the right network's table,
        # not merely somewhere on the page (an explorer URL also appears in address links).
        for net in self.networks():
            cid = net["chainId"]
            expected = [("Chain ID", str(cid))]
            expected += [("RPC Endpoint", url) for url in net["rpcUrls"]]
            expected += [("Block Explorer", f"[{e['url']}]({e['url']})") for e in net["explorers"]]
            expected += [("Faucet", f"[{url}]({url})") for url in net.get("faucets", [])]
            if "opNodeRpcUrl" in net:
                expected.append(("OP-Node RPC Endpoint", net["opNodeRpcUrl"]))
            for label, value in expected:
                with self.subTest(network=net["name"], label=label, value=value):
                    self.assertIn(value, self.overview_row(cid, label))
            with self.subTest(network=net["name"], value="FeeCurrencyDirectory"):
                self.assertIn(net["contracts"]["feeCurrencyDirectory"], section(self.overview, cid))

    def test_token_rows_on_the_overview_page(self):
        # Row: symbol | decimals | token address | feeCurrency address, in that order.
        for net in self.networks():
            for token in net["tokens"]:
                with self.subTest(network=net["name"], token=token["symbol"]):
                    row = self.overview_row(net["chainId"], f"{token['symbol']} |")
                    cells = [c.strip() for c in row.strip("|").split("|")]
                    self.assertEqual(cells[1], str(token["decimals"]))
                    self.assertIn(token["address"], cells[2])
                    if token["feeCurrency"]:
                        self.assertIn(token["feeCurrency"], cells[3])
                    else:
                        self.assertNotRegex(cells[3], r"0x[0-9a-fA-F]{40}")

    def test_addresses_are_well_formed(self):
        for net in self.networks():
            addresses = [net["contracts"]["feeCurrencyDirectory"]]
            addresses += [t["address"] for t in net["tokens"]]
            addresses += [t["feeCurrency"] for t in net["tokens"] if t["feeCurrency"]]
            for address in addresses:
                with self.subTest(network=net["name"], address=address):
                    self.assertRegex(address, ADDRESS)

    def test_fee_currency_pairs_match_the_generated_page(self):
        # A row of fee-currencies.mdx is: name | symbol | feeCurrency address | token address.
        # Requiring both addresses in that order catches a swapped pair.
        for net in self.networks():
            rows = table_rows(section(self.fee_currencies, net["chainId"]))
            for token in net["tokens"]:
                if token["feeCurrency"] is None:
                    continue
                with self.subTest(network=net["name"], token=token["symbol"]):
                    pair = re.compile(
                        re.escape(token["feeCurrency"]) + r".*\|.*" + re.escape(token["address"])
                    )
                    self.assertTrue(
                        any(pair.search(row) for row in rows),
                        f"no fee-currencies.mdx row pairs feeCurrency {token['feeCurrency']} "
                        f"with token {token['address']}",
                    )

    def test_core_contracts_match_the_generated_page(self):
        for net in self.networks():
            rows = table_rows(section(self.core_contracts, net["chainId"]))
            celo = next(t for t in net["tokens"] if t["symbol"] == "CELO")
            expected = {
                "FeeCurrencyDirectory": net["contracts"]["feeCurrencyDirectory"],
                "GoldToken": celo["address"],
            }
            for name, address in expected.items():
                with self.subTest(network=net["name"], contract=name):
                    self.assertTrue(
                        any(row.startswith(f"| {name} |") and address in row for row in rows),
                        f"core-contracts.mdx has no {name} row with {address}",
                    )

    def test_six_decimal_tokens_use_an_adapter(self):
        for net in self.networks():
            for token in net["tokens"]:
                if token["decimals"] == 18 or token["feeCurrency"] is None:
                    continue
                with self.subTest(network=net["name"], token=token["symbol"]):
                    self.assertNotEqual(token["feeCurrency"], token["address"])


if __name__ == "__main__":
    unittest.main()
