import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/withStyles';
import { TextField, ButtonBase, Grid } from '@material-ui/core';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createResource} from '../store/actions';
import {toggleResourceCardExpansion} from '../store/actions';



const styles = (theme) => ({});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    createResource: (data) => dispatch(createResource(data)),
    toggleExpansion: () => dispatch(toggleResourceCardExpansion())
})


class ResourceEditForm extends Component {
    constructor(props) {
        super(props);

        // Methods
        this.onSubmit = (formValues) => {
            this.props.toggleExpansion();
            console.log(formValues)
            this.props.createResource(formValues)

        }

        this.renderTextField = ({ input, label }) => {
            return (
                <div className="field">
                    <TextField {...input} label={label} />
                </div>
            );
        };

    }


    render() {
        console.log(this.props);
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Grid container spacing={2} justify="left">
                    <Grid item xs={4}>
                        <Field name="name" component={this.renderTextField} label="Name" />
                    </Grid>
                    <Grid item xs={4}>
                        <Field name="url" component={this.renderTextField} label="URL" />
                    </Grid>
                    <Grid item xs={2}>
                        <ButtonBase type="submit">Submit</ButtonBase>
                    </Grid>
                </Grid>

            </form>
        );
    }
}


ResourceEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceEditForm);

export default reduxForm({
    form: 'editResource'
})(ResourceEditForm);