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
import './AssignmentList.scss';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TablePaginationActionsWrapped from '../pagination/Pagination';
import TableBody from '@material-ui/core/TableBody';
import DownArrow from '@material-ui/icons/ArrowDropDown';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import {formatDateForEvents} from '../../../helpers/dateHelper';
import {assignmentStatuses} from '../../../consts/assignmentStatuses';
import { withNamespaces } from 'react-i18next';
import { Collapse, Typography } from '@material-ui/core';
import {getLabelForAssignmentStatus} from '../../../consts/assignmentStatuses';



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
        {name: t('assignment.form.postedAt'), prop: 'assignedAt'},
        {name: t('assignment.form.title'), prop: 'title'},
        {name: t('assignment.form.due'), prop: 'due'},
        {name: t('assignment.form.status'), prop: 'status'}
    ];
};

class AssignmentList extends Component {

    componentWillReceiveProps (nextProps) {
        if (nextProps.assignments && nextProps.assignmentToExpand && !nextProps.isLoading) {
            this.props.expandAssignmentFromAlerts(nextProps.assignmentToExpand);
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
    
    renderStatusSelectMenu = (statuses) => {
        return statuses.map((status) => ( 
            <MenuItem classes={{ root: this.props.classes.selectStatusMenu }}
                key={status}
                value={status}>
                {getLabelForAssignmentStatus(status)}
            </MenuItem>)
        );
    };
    
    renderStatus = (status, id) => {
        const {classes, user} = this.props;

        if (!status || status === assignmentStatuses.CLEARED) {
            return (<span className={`textStatus ${status.toLowerCase()}`}>{getLabelForAssignmentStatus(status)}</span>);
        }
    
        let menuStatuses = Object.values(assignmentStatuses);
        if (status === assignmentStatuses.ACKNOWLEDGED) {
            // ACKNOWLEDGED can't be changed to OUTSTANDING
            menuStatuses = menuStatuses.filter(status => status !== assignmentStatuses.OUTSTANDING);
        }
    
        return (
            <FormControl className={classes.statusFormControl}>
                <Select disableUnderline={true}
                    className={status.toLowerCase()}
                    classes={{ select: classes.selectStatus, icon: classes.selectStatusIcon }}
                    value={status}
                    onClick={this.handleStatusClick}
                    onChange={(e) => this.handleStatusChange(e.target.value, id)}
                    inputProps={{
                        name: 'status',
                        id: 'status-select'
                    }}>
                    {this.renderStatusSelectMenu(menuStatuses)}
                </Select>
            </FormControl>
        );
    };

    onExpand = (id) => {
        this.props.toggleAssignment(id);
    };

    renderBody = () =>  {
        const {assignments, classes, t} = this.props;
        return assignments.map(postedAssignment => {
            return(
                <TableBody key={postedAssignment.id}>
                    <TableRow className="eventRow" onClick={() => this.onExpand(postedAssignment.id)}>
                        <TableCell component="th" scope="row">
                            {formatDateForEvents(postedAssignment.assignedAt)}
                        </TableCell>
                        <TableCell>{postedAssignment.assignment.title}</TableCell>
                        <TableCell component="th" scope="row">
                            {formatDateForEvents(postedAssignment.due)}
                        </TableCell>
                        <TableCell>{this.renderStatus(postedAssignment.status, postedAssignment.id)}</TableCell>
                    </TableRow>
                    <tr>
                        <td colSpan="6">
                            <Collapse in={postedAssignment.expanded}>
                                <div className={classes.fullDescription}>
                                    <Typography variant="subtitle2" gutterBottom>{t('assignment.form.topic')}</Typography>
                                    <div>{postedAssignment.assignment.topic}</div>

                                    <Typography variant="subtitle2" gutterBottom>{t('assignment.form.points')}</Typography>
                                    <div>{postedAssignment.assignment.points}</div>

                                    <Typography variant="subtitle2" gutterBottom>{t('assignment.form.instructions')}</Typography>
                                    <div>{postedAssignment.assignment.instructions}</div>
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
        this.props.collapseAllAssignments();
    }
};

export default withStyles(styles)(withNamespaces('translation')(AssignmentList));