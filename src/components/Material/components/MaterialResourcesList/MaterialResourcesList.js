import React, { Component } from 'react';
import './MaterialResourcesList.scss';
import '../../helpers/MaterialResourceObject';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MaterialResourceListItem from "../MaterialResourceListItem/MaterialResourceListItem";
import MaterialResource from "../../helpers/MaterialResourceObject";


class MaterialResourceList extends Component {
    constructor(props) {
        super(props);

        this.classes = makeStyles();
        this.handleMaterialResourceListItemClick = this.handleMaterialResourceListItemClick.bind(this)
        this.appendGithub = this.appendGithub.bind(this);
        this.updateListItems = this.updateListItems.bind(this);

        this.listItems = {};
        this.state = {listItemsState: this.listItems};
    }

    updateListItems() {
        this.setState({listItemsState: this.listItems});
        console.log(this.state);
    }

    appendGithub() {
        this.listItems.Github = new MaterialResource(
            "Github",
            "http://github.com",
            "externalLink",
            true,
            this.handleMaterialResourceListItemClick
        );
        console.log(this.listItems.Github.url);
        this.updateListItems();
    }

    handleMaterialResourceListItemClick (listItemData) {
        this.props.printJSXToPrintArea(listItemData)
    }

    createItems () {
        let JSXItems = [];
        for (const itemKey in this.state.listItemsState) {
            JSXItems.push(<MaterialResourceListItem {...this.state.listItemsState[itemKey]} />)
        }
        return JSXItems
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