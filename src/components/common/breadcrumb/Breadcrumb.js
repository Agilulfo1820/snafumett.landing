import React from 'react';

class Breadcrumb extends React.Component {
/*     constructor(props){
        super(props);
    } */
    render() {
        return (
            <ol className="breadcrumb">
                <li key = "breadcrumb" id="breadcrumbName" className="breadcrumb-item">{this.props.title}</li>
            </ol>
        );
    }
}

export default Breadcrumb;