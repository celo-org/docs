import React from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"
import styles from './Metamask.module.css'

export default function ConnectToMetamask() {

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const injected = new InjectedConnector({
      supportedChainIds: [1, 42220, 44787],
    })

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
      }
    
    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div>
          <button className={styles.metamaskButton} onClick={connect}>Connect to MetaMask</button>
          {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
          <button className={styles.metamaskButton} onClick={disconnect}>Disconnect</button>
        </div>
    )

}