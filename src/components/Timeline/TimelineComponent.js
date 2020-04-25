import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import {timelines} from 'd3-timelines';

import {mapAttandanceToTimeLineData, mapLessonStatusToTimeLineData} from '../../helpers/timelinesLessonHepler';

import './TimelineComponent.scss';

const createChart = () => {
    return timelines()
        .showTimeAxis();
};

const TIMELINE_NATIVE_PADDING = 60;

const drawChart = (element, chart, data, width) => {
    element
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', '10px')
        .datum(data)
        .call(chart);
};

const removeChart = (element) => {
    element
        .select('svg')
        .remove();
};

class TimelineComponent extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.containerRef = React.createRef();
        this.state = {
            width: 0
        };
    }

    updateDimensions = () => {
        this.myRef.current.style.display = 'none';
        let width = this.containerRef.current.clientWidth + TIMELINE_NATIVE_PADDING;
        this.myRef.current.style.display = 'block';
        this.setState({width});
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.setState({width: this.containerRef.current.clientWidth + TIMELINE_NATIVE_PADDING});
    }

    componentDidUpdate(prevProps){
        if(prevProps.pannelCollapsed !== this.props.pannelCollapsed){
            this.updateDimensions();
            return;
        }

        let times = null;
        if (this.props.attandanceIntervals) {
            times = mapAttandanceToTimeLineData(this.props.startAt,this.props.endAt, this.props.attandanceIntervals);
        }else if (this.props.status) {
            times = mapLessonStatusToTimeLineData(this.props.startAt,this.props.endAt, this.props.status);
        }

        if (times) {
            const chartData = [{ times }];
            const node = this.myRef.current;
            const element = d3.select(node);
            const chart = createChart();
            removeChart(element);
            drawChart(element, chart, chartData, this.state.width);
        }
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <div ref={this.containerRef}>
                <div className="TimelineComponent" ref={this.myRef}></div>
            </div>
        );
    }
}

TimelineComponent.propTypes = {
    startAt: Number,
    endAt:Number,
    status:String,
    attandanceIntervals: PropTypes.array,
    pannelCollapsed: PropTypes.bool
};

const mapStateToProps = state => {
    return ({
        pannelCollapsed: state.selectedEntity.pannelCollapsed
    });
};

export default connect(mapStateToProps)(TimelineComponent);