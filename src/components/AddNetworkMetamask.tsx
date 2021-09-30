import React from 'react'
import styles from './Metamask.module.css'

export default function AddNetworkMetamask({params}) {

    async function add(){
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params],
        });
    }

    return (
        <div className={styles.center}>
            <button className={styles.metamaskButton} onClick={add}>Add / Switch to {params.chainName}</button>
        </div>
    )

}