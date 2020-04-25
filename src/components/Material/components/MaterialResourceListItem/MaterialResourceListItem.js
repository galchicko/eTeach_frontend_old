import React, { Component } from 'react';
import './MaterialResourceListItem.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

        this.handleDelete = () => {
            console.log('Delete' + this.props.name);
            this.props.handleDelete(this.props.name)
        }
    }

    render() {
        return (
            <div className="MaterialResourceListItem">
                <ListItem {...this.listItemProps} key={this.props.url}>
                    <ListItemIcon><LinkIcon /></ListItemIcon>
                    <ListItemText primary={this.props.name} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={this.handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    }
}


export default MaterialResourceListItem