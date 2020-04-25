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
        this.appendGithub = this.appendGithub.bind(this);

        this.state = {listItems: {
            Google: {
                name: "Google",
                url: "http://google.com",
                category: "externalLink",
                button: true,
                handleMaterialResourceListItemClick: this.handleMaterialResourceListItemClick
            },
            Amazon: {
                name: "Amazon",
                url: "http://amazpn.com",
                category: "externalLink",
                button: true,
                handleMaterialResourceListItemClick: this.handleMaterialResourceListItemClick
            },
            Facebook: {
                name: "Facebook",
                url: "http://facebook.com",
                category: "externalLink",
                button: true,
                handleMaterialResourceListItemClick: this.handleMaterialResourceListItemClick
            }
        }};
    }

    appendGithub() {
        const currentItems = this.state.listItems;
        currentItems.Github = {
            name: "Github",
            url: "http://github.com",
            category: "externalLink",
            button: true,
            handleMaterialResourceListItemClick: this.handleMaterialResourceListItemClick
        }
        this.setState({listItems: currentItems})
    }

    handleMaterialResourceListItemClick (listItemData) {
        this.props.printJSXToPrintArea(listItemData)
    }

    createItems () {
        let JSXItems = [];
        for (const itemKey in this.state.listItems) {
            JSXItems.push(<MaterialResourceListItem {...this.state.listItems[itemKey]} />)
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