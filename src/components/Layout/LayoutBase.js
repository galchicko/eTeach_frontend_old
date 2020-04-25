import React, {Component} from 'react';
import {isTeacher} from '../../consts/entityTypes';

export class LayoutBase extends Component {

    componentDidUpdate (prevProps) {
        // User was navigated to '/'
        if (this.props.location.pathname === '/') {
            this.props.history.push(`/overview/all`);
            //this.props.history.push(`/dashboard/${this.props.currentRegion.id}`);
            if(isTeacher(this.props.user.type)) {
                this.props.onHomeNavigate(this.props.user.id);
            }
        }
    }
}

export default LayoutBase;
