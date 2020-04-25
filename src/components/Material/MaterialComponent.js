import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import './MaterialComponent.scss';
import { withNamespaces } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import MaterialResourceTowerItem from './components/MaterialResourceTowerItem/MaterialResourceTowerItem';
import MaterialResourcesList from './components/MaterialResourcesList/MaterialResourcesList';
import MaterialResourceContainer from './components/MaterialResourceContainer/MaterialResourceContainer';
import CentralComponent from '../CentralComponent/CentralComponent';
import MaterialCentralComponent from "./components/MaterialCentralComponent/MaterialCentralComponent";


// added by Anastasia
const styles = theme => ({
    center: {
        margin: theme.spacing.unit * 2
    },
    textClassFromTheme: {
        fontColor: 'red'
    },
    root: {
        minWidth: 275,
    },
});

class MaterialComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {printAreaData: 'empty'};
        this.printJSXToPrintArea = this.printJSXToPrintArea.bind(this)
    }

    printJSXToPrintArea(data) {
        // makes JSX type data appear at the print area
        this.setState({ printAreaData: data})
    }

    render() {
        const { classes, user } = this.props;

        return (
            <div className="Main">
                <div className="DeviceList">
                    <MaterialResourceTowerItem title="A" href="/" />
                    <MaterialResourceTowerItem title="B" href="/" />
                    <MaterialResourceTowerItem title="C" href="/" />
                </div>
                <div className="Central">
                    <MaterialCentralComponent />
                </div>
                <div className="DeviceInfo">
                    <Typography color="textPrimary">Right Sidebar</Typography>
                </div>
            </div>
        );
    }
}


export default withNamespaces('translation')(withStyles(styles)(MaterialComponent));


// EntityInfoTab-infoTable-673
// EntityInfoTab-divRow-674