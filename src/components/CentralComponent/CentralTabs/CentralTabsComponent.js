import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {ALL_SCHOOLS,isAllSchools} from '../../../consts/entityTypes';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
        borderBottom: '1px solid',
        borderColor: '#D4D4D4'
    },
    scrollButtons: {
        width: 30
    },
    scrollable: {
        overflowX: 'hidden'
    }
});

class CentralTabs extends Component {
    handleChange = (event, value) => {
        const {tabs, setActiveTab} = this.props;
        const updatedActiveTab = tabs.find((tab) => tab.value === value);
        setActiveTab(updatedActiveTab);
    };

    render() {
        const {activeTab, tabs,t,selectedEntity, classes} = this.props;
        const dataIsCorrect = tabs && activeTab && tabs.find((tab) => tab.value === activeTab.value);
        if(!tabs || !selectedEntity || !dataIsCorrect){
            return (<div></div>);
        }
        const type = isAllSchools(selectedEntity) ? ALL_SCHOOLS : selectedEntity.type;
        return (
            <div className='CentralTabs'>
                <Tabs
                    classes={{root: classes.root, scrollButtons: classes.scrollButtons, scrollable: classes.scrollable }}
                    value={activeTab.value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                    variant="scrollable">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.value}
                            label={t('tabs.' + type + '.' +  tab.value)}
                            value={tab.value}/>
                    ))}
                </Tabs>
            </div>
        );
    }
}

CentralTabs.propTypes = {
    tabs: PropTypes.array,
    activeTab: PropTypes.object,
    setActiveTab: PropTypes.func
};

export default withStyles(styles)(withNamespaces('translation')(CentralTabs));