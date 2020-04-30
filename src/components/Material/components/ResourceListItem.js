import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import { deleteResource } from '../store/actions';


const styles = (theme) => ({
    item: {}
});


const mapStateToProps = (state) => {
    return {resources: state.material.resources};
};

class ResourceListItem extends Component {
    constructor(props) {
        super(props);

        this.listItemProps = {
            button: true,
            onClick: () => this.handleClick()
        };


        // Methods
        this.handleClick = () => {
            console.log('Click');
            window.open(this.props.url, "_blank");
        }

        this.handleDelete = () => {
            console.log('Delete');
            this.props.deleteResource(this.props.name);
        }
    }


    render() {
        const { classes } = this.props;

        return (
            <ListItem {...this.listItemProps} className={classes.item}>
                <ListItemIcon><LinkIcon /></ListItemIcon>
                <ListItemText
                    primary={this.props.name}
                    primaryTypographyProps={{color: 'textPrimary'}}
                    secondary={this.props.url}
                    secondaryTypographyProps={{color: 'textSecondary'}}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => {if (window.confirm('Are You Sure?')) {this.handleDelete()}}}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}


export default connect(
    null,
    {deleteResource: deleteResource}
)(withStyles(styles, {withTheme: true})(ResourceListItem));