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

        this.handleClick = props.handleMaterialResourceListItemClick;

        if (this.props.button) {
            this.listItemProps = {
                button: true,
                onClick: () => this.handleClick(<h3><i>{this.props.name}</i></h3>)
            }
        } else { this.listItemProps = {} }
        this.listItemProps.key = this.props.url;
    }

    render() {
        return (
            <div className="MaterialResourceListItem">
                <ListItem {...this.listItemProps}>
                    <ListItemIcon><LinkIcon /></ListItemIcon>
                    <ListItemText primary={this.props.name} />
                </ListItem>
            </div>
        );
    }
}


export default MaterialResourceListItem