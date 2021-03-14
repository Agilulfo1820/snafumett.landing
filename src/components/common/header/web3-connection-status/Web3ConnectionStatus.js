import React from 'react';
import './Web3ConnectionStatus.css';
import GenuNFT from '../../../../abi/GenuNFT'

class Web3ConnectionStatus extends React.Component {
    getNetworkName = (network) => {
        switch (network.chainId) {
            case 100:
                return 'Xdai'
            case 77:
                return 'poasokol'
            default:
                return network.name
        }
    }

    getButtonType = (network) => {
       return network.chainId === 1 || network.chainId === 100 ? "btn-success" : "btn-warning"
    }

    isContractConnected = (network) => {
        return GenuNFT.networks[network]
    }

    getConnectionButtonType = (network)=> {
        return this.isContractConnected(network) !== undefined ? "btn-success" : "btn-danger"
    }

    getContractText = (network) => {
        return this.isContractConnected(network) ? 'found'  : 'not found'
    }

    render() {
        return (
            <ul className="nav navbar-nav ml-auto metamsk-info-navbar">
                <button key = "metamask" className={`btn btn-brand btn-sm ${this.props.providerInfo !== null ? "btn-success" : "btn-danger"} status-button web3StatusButtons`} type="button">
                    <span id="textMetamask">{this.props.providerInfo !== null ? 'Metamask connesso' : 'Metamask non connesso'}</span>
                </button>
                <button key = "network" className={`btn btn-brand btn-sm ${this.props.providerInfo !== null ? this.getButtonType(this.props.providerInfo.provider.network) : 'btn-warning' } status-button web3StatusButtons`} type="button">
                    <span id="textMetamaskNetwork">{this.props.providerInfo !== null ? 'Network: ' +  this.getNetworkName(this.props.providerInfo.provider.network) : 'Network non individuato'} </span>
                </button>
                <button key = "contract" className={`btn btn-brand btn-sm ${this.props.providerInfo !== null ? this.getConnectionButtonType(this.props.providerInfo.network) : 'btn-warning' } status-button web3StatusButtons`} type="button">
                    <span id="textContract">{this.props.providerInfo !== null ?'Contract: ' + this.getContractText(this.props.providerInfo.network): 'Contract: not found'} </span>
                </button>
            </ul>
        );
    }
}

export default Web3ConnectionStatus;