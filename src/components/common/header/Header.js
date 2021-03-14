import React from 'react';
import './Header.css';
import Web3ConnectionStatus from './web3-connection-status/Web3ConnectionStatus';

class Header extends React.Component {
    render (){
        return (
            <header className="app-header navbar" >
                <Web3ConnectionStatus providerInfo={this.props.providerInfo} />
            </header>
        );
    }
}

export default Header;