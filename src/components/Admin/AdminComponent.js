import React, {Component} from 'react';
import { withNamespaces } from 'react-i18next';
import './styles.scss';

class AdminComponent extends Component {

    renderTitle=(title)=>{
        return (
            <div className="adminTableTitleContainer">
                <div className="adminTableTitle">
                    {title}
                </div>
            </div>
        ) ;
    };

    render() {
        const {t} = this.props;
        return (
            <div className="adminComponentContainer">
                admin
            </div>
        );
    }
}

export default withNamespaces('translation')(AdminComponent);