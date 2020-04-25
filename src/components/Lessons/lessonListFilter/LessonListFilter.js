import React, {Component} from 'react';
import './LessonListFilter.scss';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {FilterList, Close} from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Switch from '@material-ui/core/Switch/Switch';
import Input from '@material-ui/core/Input/Input';
import { withNamespaces } from 'react-i18next';
import {getLabelForEventStatus} from '../../../consts/eventStatuses';
import {getLabelForSeverity} from '../../../consts/severity';

const styles = theme => ({
    fieldsGroup: {
        display: 'inline-flex'
    },
    fab: {
        // margin: theme.spacing.unit,
        width: 'auto',
        padding: '0 16px',
        fontSize: '12px'
    },
    filter: {
        boxSizing: 'border-box',
        height: '31.7px',
        border: '0.7px solid #267FFA',
        color: '#267FFA',
        borderRadius: '15.5px',
        backgroundColor: '#FFFFFF'
    },
    root: {
        flexGrow: 1,
        padding: '21px',
        marginTop: '16px'
    },
    apply: {
        height: '24px',
        borderRadius: '17.5px',
        color: '#FFFFFF',
        backgroundColor: '#267FFA',
        marginLeft: theme.spacing.unit
    },
    cancel: {
        height: '24px',
        borderRadius: '17.5px',
        backgroundColor: '#E0E0E0',
        color: '#000000'
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    colorSwitchBase: {
        color: '#C6C6C6',
        '&$colorChecked': {
            color: '#267FFA',
            '& + $colorBar': {
                backgroundColor: '#FFFFFF',
                border: '1px solid #DDDDDD'
            }
        }
    },
    colorBar: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #DDDDDD'
    },
    colorChecked: {}
});

class eventListFilter extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
            status: this.props.status,
            date: this.props.date,
            search: this.props.search
        };
    }

    onToggle = () => {
        const currentState = this.state.open;
        this.setState({open: !currentState});
    };

    handleInputChange = (event) => {
        this.setState({search: event.target.value});
    };


    handleChangeStatus = name => event => {
        this.setState({
            status: {
                ...this.state.status,
                [name]: event.target.checked
            }
        });
    };

    handleDateChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            date: {
                ...this.state.date,
                [name]: value
            }
        });
    };
    close = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, t} = this.props;
        const button = (<Button onClick={this.onToggle}
            className={[classes.fab, classes.filter].join(' ')}>
            <FilterList className={classes.extendedIcon}/>
            {t('events.filter.Filters')}
        </Button>);
        const form = (
            <Paper className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} className='close'>
                        <Close onClick={this.close}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div>{t('events.filter.Date')}</div>
                        {
                            Object.keys(this.state.date)
                                .map((key, index) => {
                                    return (
                                        <div key={key + index}>
                                            <TextField
                                                key={key + index}
                                                label={key}
                                                type="date"
                                                name={key}
                                                onChange={this.handleDateChange}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}/>
                                        </div>
                                    );
                                })
                        }
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div>{t('events.filter.Description')}</div>
                        <Input
                            style={{margin: 8}}
                            value={this.state.search}
                            onChange={this.handleInputChange}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div>{t('events.filter.Status')}</div>
                        <FormGroup className={classes.fieldsGroup}>
                            {
                                Object.keys(this.state.status)
                                    .map((key, index) => {
                                        return <FormControlLabel
                                            key={key + index}
                                            control={
                                                <Switch
                                                    checked={this.state.status[key]}
                                                    onChange={this.handleChangeStatus(key)}
                                                    name={key}
                                                    classes={{
                                                        switchBase: classes.colorSwitchBase,
                                                        checked: classes.colorChecked,
                                                        bar: classes.colorBar
                                                    }}/>
                                            }
                                            label={getLabelForEventStatus(key)}/>;
                                    })
                            }
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} className='actions'>
                        <Button className={[classes.fab, classes.cancel].join(' ')}
                            onClick={this.close}>{t('events.filter.cancel')}</Button>
                        <Button className={[classes.fab, classes.apply].join(' ')}
                            onClick={() => this.props.handleApplyFilter(this.state)}>{t('events.filter.apply')}</Button>
                    </Grid>
                </Grid>
            </Paper>
        );


        return (
            <div className='EventListFilter'>
                <div className='EventListFilter__buttons'>{button}</div>
                {this.state.open ? form : null}
            </div>
        );
    };

}

export default withStyles(styles)(withNamespaces('translation')(eventListFilter));