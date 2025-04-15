#!/usr/bin/env python3
import urllib.request
import json

tokenlist_url = "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/refs/heads/master/optimism.tokenlist.json"
tokenlist = json.load(urllib.request.urlopen(tokenlist_url))

l1_address_for_token = {}
for token in tokenlist["tokens"]:
    if token["chainId"] != 1:
        continue
    l1_address_for_token[token["extensions"]["opTokenId"]] = token["address"]


output = []
for token in tokenlist["tokens"]:
    if token["chainId"] != 42220:
        continue

    l1_address = l1_address_for_token[token["extensions"]["opTokenId"]]
    output.append(
        [
            token["symbol"],
            token["name"],
            f"L1: [{l1_address}](https://etherscan.io/token/{l1_address})"
            "<br />"
            f"L2: [{token['address']}](https://celoscan.io/token/{token['address']})"
        ]
    )

with open("tokens.md", "w") as f:
    f.write("| Symbol | Token Name | Contract Addresses |\n")
    f.write("| ------ | ---------- | ------------------ |\n")
    for line in sorted(output, key=lambda x: x[1]):
        f.write("| " + " | ".join(line) + " |\n")
