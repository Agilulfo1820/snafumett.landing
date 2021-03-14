import React from 'react'
import {ethers} from 'ethers'
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

//components
import Header from './components/common/header/Header'
import Content from './components/common/Content'
import GenuNFT from './abi/GenuNFT'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            title: 'SNAFU | Homepage',
            contract: null,
            providerInfo: null,
            eventListen: false,
        }

        this.getProvider = this.getProvider.bind(this)
        this.setContract = this.setContract.bind(this)

    }

    componentDidMount() {
        /**
         * MetaMask init
         */
        this.setContract()

    }


    getProvider = async () => {
        try {
            if (typeof window.ethereum !== undefined) {
                await window.ethereum.enable()
                console.log(window.ethereum)
                console.log('ciao')
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const network = (await provider.getNetwork()).chainId
                //console.log(provider)
                //console.log(network)
                window.ethereum.autoRefreshOnNetworkChange = false
                return {provider, network}

            } else {
                console.log("No injected web3 found")
            }
        } catch (e) {
            console.log(e)
        }
    }

    getContract = async (provider, _contract, network) => {

        if (_contract.networks[network] === undefined) {
            //alert("Cannot find the contract abi on this network")
            return null
        }
        return new ethers.Contract(
            _contract.networks[network].address,
            _contract.abi,
            provider.getSigner(),
        )
    }


    setContract = async () => {
        const providerInfo = await this.getProvider()
        if (providerInfo !== undefined) {
            const contract = await this.getContract(providerInfo.provider, GenuNFT, providerInfo.network)
            this.setState({
                contract: contract,
                providerInfo: providerInfo,
            })
        } else {
           // alert("Metamask non è stato installato")
        }
    }

    render() {
        return (
            [<Router>
                <Header key="header" providerInfo={this.state.providerInfo}/>
                <div className="app-body" key="app-body">
                    <Content key="content" state={this.state}/>
                </div>
            </Router>,
            ]
        )
    }
}

export default App
