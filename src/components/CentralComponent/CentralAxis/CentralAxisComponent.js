import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import {timelines} from 'd3-timelines';
import {connect} from 'react-redux';

import './CentralAxisComponent.scss';

const createChart = (dateRange) => {
    return timelines()
        .tickFormat({
            tickSize: 20
        })
        .orient('top')
        .beginning(dateRange.from)
        .ending(dateRange.to);
};

const drawChart = (element, chart, width, data =[]) => {
    element
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', '60px')
        .datum(data)
        .call(chart);
};

const removeChart = (axis) => {
    axis
        .select('svg')
        .remove();
};

class CentralAxisComponent extends Component {
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
        let width = this.containerRef.current.clientWidth;
        this.myRef.current.style.display = 'block';
        this.setState({width});
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.setState({width: this.containerRef.current.clientWidth});
    }

    componentDidUpdate(prevProps){
        if(prevProps.pannelCollapsed !== this.props.pannelCollapsed){
            this.updateDimensions();
            return;
        }
        if (this.props.dateRange) {
            const node = this.myRef.current;
            const axis = d3.select(node);
            const chart = createChart(this.props.dateRange);
            removeChart(axis);
            drawChart(axis, chart, this.state.width);
        }
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <div ref={this.containerRef}>
                <div className="CentralAxisComponent" ref={this.myRef}></div>
            </div>
        );
    }
}

CentralAxisComponent.propTypes = {
    dateRange: PropTypes.object,
    pannelCollapsed: PropTypes.bool
};

const mapStateToProps = state => {
    return ({
        pannelCollapsed: state.selectedDeviceInfo.pannelCollapsed
    });
};

export default connect(mapStateToProps)(CentralAxisComponent);
