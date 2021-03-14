import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './Transaction.css'


export class Transaction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pending: false,
            errorTx: false,
            error: null,
            hash: null,
            url: null,
            showAlert: true

        }
        this.executeTransaction = this.executeTransaction.bind(this)

    }

    UNSAFE_componentWillReceiveProps(props){
        if(props.tx !== this.props.tx){
            this.setState({pending: true})
            this.executeTransaction(props.tx);
        }

        if(props.error !== this.state.error){
            this.setState({error: props.error})
        }
    }

    executeTransaction = async(tx) =>{
        tx.wait().then((success) => {
            console.log(success)
            this.setState({pending: false})
        }).catch( (err) => {
            console.log(err)
            this.setState({pending: false})
            this.setState({errorTx: true})
        });
    }

    render(){

        if(this.state.error){
            return (
                <Alert className="transaction-info" onClose={()=>{this.setState({error:null})}} variant="danger" dismissible>
                    <p><strong>Error:</strong> {this.state.error.code} </p>
                    {this.state.error.reason && <p><strong>Reason:</strong> {this.state.error.reason} </p>}
                    {this.state.error.arg && <p><strong>Argument:</strong> {this.state.error.arg} </p>}
                    {(!this.state.error.reason && this.state.error.message) && <p><strong>Message:</strong> {this.state.error.message} </p>}
                </Alert>    
            )
        }

        if(!this.props.tx){
            return(null)
        }

        return (
            <Alert className="transaction-info" variant={this.state.pending ? "info" : this.state.errorTx ? "danger" : "success" } >
            {this.state.pending ? "Pending Tx" : this.state.errorTx ? "Failed Tx " : "Completed Tx "} : <Alert.Link variant={this.state.pending ? "info" : this.state.errorTx ? "danger" : "success" } href={ "https://" + ((this.props.networkId === 3) ? "ropsten." : "") + "etherscan.io/tx/"+ this.props.tx.hash} target="_blank">{this.props.tx.hash} </Alert.Link>
            </Alert>
        )
    }
}

