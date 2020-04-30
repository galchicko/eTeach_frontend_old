import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import List from '@material-ui/core/List';
import ResourceListItem from './ResourceListItem';


const styles = (theme) => ({});


const mapStateToProps = (state) => {
    return {resources: state.material.resources};
};

class ResourceListComponent extends Component {
    constructor(props) {
        super(props);

        // Methods
        this.createListItems = () => {
            return Object.values(this.props.resources).map(
                resourceProps => {
                    return(<ResourceListItem {...resourceProps} />);
                }
            );
        };
    }


    render() {
        const {classes} = this.props;

        return (
            <List>
                {this.createListItems()}
            </List>
        );
    };
}


export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(ResourceListComponent));