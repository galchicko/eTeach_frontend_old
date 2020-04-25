import React, { Component } from 'react';
import './MaterialResourcesList.scss'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MaterialResourceListItem from "../MaterialResourceListItem/MaterialResourceListItem";


class MaterialResourceList extends Component {
    constructor(props) {
        super(props);

        this.classes = makeStyles();
        this.handleMaterialResourceListItemClick = this.handleMaterialResourceListItemClick.bind(this)
    }

    handleMaterialResourceListItemClick (listItemData) {
        this.printJSXToPrintArea(listItemData)
    }

    render() {
        return (
            <List className={this.classes.root}>
                <MaterialResourceListItem
                    name="Google"
                    button={true}
                />
                <MaterialResourceListItem
                    name="Amazon"
                    button={true}
                />
                <MaterialResourceListItem
                    name="Facebook"
                    button={true}
                />
            </List>
        );
    }
}


export default MaterialResourceList;