import React, { Component } from 'react';
import './MaterialResourceListItem.scss';
import MaterialComponent from "../../index";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LinkIcon from '@material-ui/icons/Link';


class MaterialResourceListItem extends Component {
    constructor(props) {
        super(props);

        this.name = props.name;
        this.button = props.button;
        this.handleClick = props.handleMaterialResourceListItemClick;

        if (this.button) {
            this.listItemProps = {
                button: true,
                onClick: () => this.handleClick(<h3><i>{this.name}</i></h3>)
            }
        } else { this.listItemProps = {} }
    }

    render() {
        return (
            <div className="MaterialResourceListItem">
                <ListItem {...this.listItemProps}>
                    <ListItemIcon><LinkIcon /></ListItemIcon>
                    <ListItemText primary={this.name} />
                </ListItem>
            </div>
        );
    }
}


export default MaterialResourceListItem