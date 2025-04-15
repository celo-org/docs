#!/usr/bin/env python3
import urllib.request
import json

tokenlist_url = "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/refs/heads/master/optimism.tokenlist.json"
tokenlist = json.load(urllib.request.urlopen(tokenlist_url))

output = []
for token in tokenlist["tokens"]:
    if token["chainId"] != 42220:
        continue

    output.append(
        [
            token["symbol"],
            token["name"],
            f"[{token['address']}](https://celoscan.io/token/{token['address']})",
        ]
    )

with open("tokens.md", "w") as f:
    f.write("| Symbol | Token Name | L2 Contract Address |\n")
    f.write("| ------ | ---------- | ------------------- |\n")
    for line in sorted(output, key=lambda x: x[1]):
        f.write("| " + " | ".join(line) + " |\n")
