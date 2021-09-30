import React from 'react'
import styles from './Metamask.module.css'

export default function AddTokenMetamask({params}) {

    async function add(){
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: params
        });    
      }

    return (
        <div className={styles.center}>
            <button className={styles.metamaskButton} onClick={add}>Add {params.options.symbol} Token</button>
        </div>
    )

}