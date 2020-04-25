import React, { Component } from 'react';
import './MaterialPrintAreaCardContainer.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


class MaterialPrintAreaCardContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardHeader title="Print Area" />
                <CardContent>{this.props.printAreaData}</CardContent>
            </Card>
        );
    }
}


export default MaterialPrintAreaCardContainer;