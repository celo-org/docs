---
title: Hosted Nodes
description: How to get a preconfigured Celo blockchain node running on one of the major cloud providers.
---

# Hosted Nodes

How to get a preconfigured Celo blockchain node running on one of the major cloud providers.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Before getting started

cLabs currently provides machine images for launching full and lightest nodes on Alfajores and Mainnet. These prebuilt images are updated with every release of the Celo blockchain client and are available on Amazon Web Services and Google Cloud Platform.

Before proceeding with a hosted Celo blockchain node, you'll need to have an account with your cloud provider of choice and basic knowledge of networking.

:::info

If you would like to keep up-to-date with all the news happening in the Celo community, including validation, node operation and governance, please sign up to our [Celo Signal mailing list](https://share.hsforms.com/1Qrhush1vSA2WIamd_yL4ow53n4j).

You can add the [Celo Signal public calendar](https://calendar.google.com/calendar/u/0/embed?src=c_9su6ich1uhmetr4ob3sij6kaqs@group.calendar.google.com) as well which has relevant dates.

:::

Currently, cLabs provides the following machine images:

- `celo-alfajores-full-node-latest`
- `celo-alfajores-lightest-node-latest`
- `celo-mainnet-full-node-latest`
- `celo-mainnet-lightest-node-latest`

Please note that the time taken to sync a full node could be significant.

## Google Cloud Platform

GCP by default won't display public machine images when you search for them in your console. This means you'll need to go via the API or [gcloud](https://cloud.google.com/cli) command line to launch a node.

Depending on the type of node you'd like to launch (see the above list), the `gcloud` command to use may look a bit like this:

```bash
gcloud compute instances create <INSTANCE_NAME> --image <IMAGE_NAME> --image-project devopsre --project <YOUR_GCP_PROJECT>
```

If you are running a image with `full` syncmode, please increase the disk size and instance type, and optionally use a `SSD` disk:

```bash
--boot-disk-size 250 --boot-disk-type pd-ssd --machine-type=n2-standard-4 
```

For full sync mode, it will take several days to sync the whole chain. You can check the status by running the next command:

```bash
container_name=celo-full-node
docker exec -it $container_name geth attach --exec 'eth.syncing'
```

For more information please check the excellent [GCP documentation](https://cloud.google.com/compute/docs/images) on how to launch a compute instance from a public image.
