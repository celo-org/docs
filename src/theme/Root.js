import React from 'react';
import { Web3ReactProvider } from "@web3-react/core"
import Web3 from 'web3'

// Default implementation, that you can customize
function Root({children}) {

    function getLibrary(provider) {
        return new Web3(provider)
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <>{children}</>;
        </Web3ReactProvider>
    )
}

export default Root;