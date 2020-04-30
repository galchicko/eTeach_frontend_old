import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/styles';

import ResourceListCard from './ResourceListContainer';
import {BrowserRouter} from 'react-router-dom';

const styles = (theme) => ({});


function mapStateToProps(state) {
    return {};
}

class MaterialCentralComponent extends Component {
    render() {
        return (
            <BrowserRouter>
                <ResourceListCard />
            </BrowserRouter>
        );
    }
}

//export default connect(mapStateToProps)(MaterialCentralComponent);
export default withStyles(styles)(MaterialCentralComponent);