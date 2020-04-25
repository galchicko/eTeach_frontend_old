import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import './EventList.scss';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TablePaginationActionsWrapped from '../pagination/Pagination';
import TableBody from '@material-ui/core/TableBody';
import DownArrow from '@material-ui/icons/ArrowDropDown';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import {formatDateForEvents} from '../../../helpers/dateHelper';
import { withNamespaces } from 'react-i18next';
import { Collapse, Typography } from '@material-ui/core';
import {getLabelForEntityType} from '../../../consts/entityTypes';
import {getLabelForSeverity} from '../../../consts/severity';
import {isObserver} from '../../../consts/userRoles';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        overflowX: 'auto'

    },
    table: {
        minWidth: 500
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    statusFormControl: {
        border: '1px solid #E2E2E2',
        borderRadius: 20,
        padding: '0 10px',
        height: 27,
        marginLeft: -10
    },
    selectStatus: {
        fontSize: 12,
        '&:focus': {
            backgroundColor: 'transparent'
        }
    },
    selectStatusIcon: {
        fontSize: 20,
        color: '#CDCDCD',
        marginTop: 2
    },
    selectStatusMenu: {
        fontSize: 12,
        padding: '5px 10px'
    },
    fullDescription: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        padding: 24,
        textAlign: 'left',
        fontSize: 13,
        color: 'black'
    }
});

const getTableHeader = (t) =>{
    return [
        {name: t('events.table.Time'), prop: 'timestamp'},
        {name: t('events.table.Description'), prop: 'description'}
    ];
};

class EventList extends Component {

    componentWillReceiveProps (nextProps) {
        if (nextProps.events && nextProps.eventToExpand && !nextProps.isEventsLoading) {
            this.props.expandEventFromAlerts(nextProps.eventToExpand);
        }
    }

    renderHeader = () => getTableHeader(this.props.t).map((elem, index) => (
        <TableCell key={`${index}${elem.name}`}>
            <div className="row-wrap" onClick={() => this.props.handleSorting(elem.name)}>
                <span>{elem.name}</span>

                {this.props.sortedField === elem.name
                    ? (this.props.sortDirection === 'ascending' ?  <UpArrow/> : <DownArrow/>)
                    :  <DownArrow/>}
            </div>
        </TableCell>
    ));

    handleStatusChange = (value, id) => {
        this.props.handleStatusChange(value, id);
    };

    handleStatusClick = (e) => {
        e.stopPropagation();
    }


    onExpand = (id) => {
        this.props.toggleEvent(id);
    };

    renderBody = () =>  {
        const {events, classes, t} = this.props;
        return events.map(event => {
            return(
                <TableBody key={event.id}>
                    <TableRow className="eventRow" onClick={() => this.onExpand(event.id)}>
                        <TableCell component="th" scope="row">
                            {formatDateForEvents(event.timestamp)}
                        </TableCell>
                        <TableCell>{event.shortDescription}</TableCell>
                    </TableRow>
                    <tr>
                        <td colSpan="6">
                            <Collapse in={event.expanded}>
                                <div className={classes.fullDescription}>
                                    <Typography variant="subtitle2" gutterBottom>{t('events.table.FullDesc')}</Typography>
                                    <div>{event.description}</div>
                                </div>
                            </Collapse>
                        </td>
                    </tr>
                </TableBody>
                
            );
        });
    }
    render () {
        const {classes, count, perPage, currentPage, handleChangePage, handleChangeRowsPerPage} = this.props;
        return (
            <Paper className="eventListContainer" classes={{root: classes.root}} elevation={2}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {this.renderHeader()}
                        </TableRow>
                    </TableHead>
                    {this.renderBody()}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={count}
                                rowsPerPage={perPage}
                                page={currentPage}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }

    componentWillUnmount () {
        this.props.collapseAllEvents();
    }
};

export default withStyles(styles)(withNamespaces('translation')(EventList));