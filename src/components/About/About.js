import React, {Component} from 'react';
import { withNamespaces } from 'react-i18next';

const version = process.env.REACT_APP_VERSION;
class About extends Component {

    render() {
        const { t } = this.props;

        return (
            <div>
                <div className="title">
                {t('about.title')} <a href="https://www.ondas.com/" target="_blank">ondas.com</a>
                </div>
                <div className="version">
                {t('about.version')}:  {version}
                </div>

            </div>

        );
    }
}

export default withNamespaces('translation')(About);