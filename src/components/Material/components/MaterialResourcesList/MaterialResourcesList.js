import React, { Component } from 'react';
import './MaterialResourcesList.scss';
import MaterialResourceManager from '../../helpers/MaterialResourceManager';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MaterialResourceListItem from "../MaterialResourceListItem/MaterialResourceListItem";
import MaterialResource from "../../helpers/MaterialResourceManager";


class MaterialResourceList extends Component {
    constructor(props) {
        super(props);

        this.classes = makeStyles();
        this.handleMaterialResourceListItemClick = this.handleMaterialResourceListItemClick.bind(this)
        this.appendGithub = this.appendGithub.bind(this);
        this.updateListItems = this.updateListItems.bind(this);
        this.createItems = this.createItems.bind(this);

        this.resourceManager = new MaterialResourceManager();
        this.state = {listItemsState: this.resourceManager};

        this.handleResourceItemDelete = (resourceName) => {
            console.log("handleResourceItemDelete");
            this.resourceManager.removeResource(resourceName);
            this.updateListItems()
        }
    }

    updateListItems() {
        this.setState({listItemsState: this.resourceManager});
        console.log(this.state);
    }

    appendGithub() {
        this.resourceManager.addResource (
            "Github",
            "http://github.com",
            "externalLink",
            true,
            this.handleMaterialResourceListItemClick
        );
//        console.log(this.listItems.Github.url);
        console.log('appendGithub')
        console.log(MaterialResource.Github);
        this.updateListItems();
    }

    handleMaterialResourceListItemClick (listItemData) {
        this.props.printJSXToPrintArea(listItemData)
    }

    createItems () {
        return this.resourceManager.getResourcesAsArray().map(
            resourceProps => <MaterialResourceListItem
                {...resourceProps}
                handleDelete={this.handleResourceItemDelete}
            />
        );
    }


    render() {
        return (
            <div>
                <List className={this.classes.root}>
                    {this.createItems()}
                </List>

                <button onClick={this.appendGithub}>Github</button>
            </div>
        );
    }
}


export default MaterialResourceList;