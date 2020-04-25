import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';
import cn from 'classnames';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './EventFiltersComponent.scss';

import {mapToRangeMoment, mapRangeMomentToTimestamp, 
    getLastMonth, getLastDay, getLastHour, getLastWeek} from '../../../helpers';
import DateRangePicker from '../../DateRangePicker';

class EventFiltersComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false,
            value: null,
            selectedButton: 'week'
        };
    }

    onSelect = (value, states) => {
        this.setState({
            value, states,
            selectedButton: null
        });
    };

    onToggle = () => {
        if (!this.state.isOpen) {
            this.setState({value: this.cloneDateRange()});
        }
        this.setState({isOpen: !this.state.isOpen});
    };

    cloneDateRange = () => {
        return mapToRangeMoment(this.props.dateRange);
    };

    onClickLastHour = () => {
        this.setState({value: getLastHour(), selectedButton: 'hour'});
    };

    onClickLastDay = () => {
        this.setState({value: getLastDay(), selectedButton: 'day'});
    };

    onClickLastWeek= () => {
        this.setState({value: getLastWeek(), selectedButton: 'week'});
    };

    onClickLastMonth = () => {
        this.setState({value: getLastMonth(), selectedButton: 'month'});
    };

    onApplyClick = () => {
        const dateRange = mapRangeMomentToTimestamp(this.state.value, this.state.selectedButton);
        this.props.setFilters(dateRange);
        this.onToggle();
    };

    getButtonText() {
        const value = this.cloneDateRange();
        let {selectedButton} = this.state;

        switch (selectedButton) {
        case 'hour':
            return i18next.t('date.lastHour');
        case 'day':
            return i18next.t('date.lastDay');
        case 'week':
            return i18next.t('date.lastWeek');
        case 'month':
            return i18next.t('date.lastMonth');
        default:
            return `${value.start.format('MMM DD, YYYY')} - ${value.end.format('MMM DD, YYYY')}`;
        }
    }

    renderSelectionValue = () => {
        let buttonText = this.getButtonText();
        
        return (
            <div className="EventFilters__range-filter"
                onClick={this.onToggle}>
                {buttonText}
            </div>
        );
    };

    render() {
        let {t} = this.props;
        let {selectedButton} = this.state;
        return (
            <div className="EventFilters">
                <div>
                    <div>{this.renderSelectionValue()}</div>
                    <Dialog open={this.state.isOpen}
                        onClose={this.onToggle}
                        aria-labelledby="simple-dialog-title">
                        <DialogTitle id="simple-dialog-title">{t('date.dateFilterTitle')}</DialogTitle>
                        <DialogContent>
                            <div className="Date-range-picker">
                                <div className="Date-range-picker__actions">
                                    <Button onClick={this.onClickLastHour} color="default"
                                        className={cn('DateRangeHour', {'DateRangeActive': selectedButton === 'hour'})}>
                                        {t('date.lastHour')}
                                    </Button>
                                    <Button onClick={this.onClickLastDay} color="default"
                                        className={cn('DateRangeHour', {'DateRangeActive': selectedButton === 'day'})}>
                                        {t('date.lastDay')}
                                    </Button>
                                    <Button onClick={this.onClickLastWeek} color="default"
                                        className={cn('DateRangeHour', {'DateRangeActive': selectedButton === 'week'})}>
                                        {t('date.lastWeek')}
                                    </Button>
                                    <Button onClick={this.onClickLastMonth} color="default"
                                        className={cn('DateRangeHour', {'DateRangeActive': selectedButton === 'month'})}>
                                        {t('date.lastMonth')}
                                    </Button>
                                </div>
                                <div className="Date-range-picker__calendar">
                                    <DateRangePicker
                                        value={this.state.value}
                                        onSelect={this.onSelect}
                                        singleDateRange={true}/>
                                </div>
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onToggle} color="default">
                                {t('date.cancel')}
                            </Button>
                            <Button onClick={this.onApplyClick} color="primary" autoFocus>
                                {t('date.apply')}
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        );
    }
}

EventFiltersComponent.propTypes = {
    dateRange: PropTypes.object,
    inProgress: PropTypes.bool,
    setFilters: PropTypes.func,
    clearFilters: PropTypes.func,
    applyEventFilters: PropTypes.func
};

export default withNamespaces('translation')(EventFiltersComponent);
