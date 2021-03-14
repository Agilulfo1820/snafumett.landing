import React from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from '../home/HomePage'

class Content extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className={`main full`}>
                <div className="container-fluid">
                    <div id="app" className="animated fadeIn">
                        <span>Text</span>
                        <HomePage/>
                    </div>
                </div>
            </main>
        )
    }
}

export default Content