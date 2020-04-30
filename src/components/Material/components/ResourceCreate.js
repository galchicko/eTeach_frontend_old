import React, {Component} from 'react';
import {connect} from 'react-redux';
import ResourceEditForm from './ResourceEditForm';


function mapStateToProps(state) {
    return {};
}

class ResourceCreate extends Component {
    render() {
        return (
            <div>
                <ResourceEditForm />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ResourceCreate);