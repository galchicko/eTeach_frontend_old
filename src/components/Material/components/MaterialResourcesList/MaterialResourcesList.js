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

        this.state = {listItems: {
            Google: {
                name: "Google",
                url: "http://google.com",
                category: "externalLink",
                button: true}
            }
        };
    }

    handleMaterialResourceListItemClick (listItemData) {
        this.props.printJSXToPrintArea(listItemData)
    }

    render() {
        return (
            <List className={this.classes.root}>
                <MaterialResourceListItem
                    name="Google"
                    button={true}
                    handleMaterialResourceListItemClick={this.handleMaterialResourceListItemClick}
                />
                <MaterialResourceListItem
                    name="Amazon"
                    button={true}
                    handleMaterialResourceListItemClick={this.handleMaterialResourceListItemClick}
                />
                <MaterialResourceListItem
                    name="Facebook"
                    button={true}
                    handleMaterialResourceListItemClick={this.handleMaterialResourceListItemClick}
                />
            </List>
        );
    }
}


export default MaterialResourceList;