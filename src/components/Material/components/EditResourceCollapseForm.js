import React from "react";
import { connect } from "react-redux";
import {createResource} from '../store/actions';
import {toggleResourceCardExpansion} from '../store/actions';
import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import {Button} from '@material-ui/core';
import {Grid} from '@material-ui/core';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    createResource: (data) => dispatch(createResource(data)),
    toggleExpansion: () => dispatch(toggleResourceCardExpansion())
});


class EditResourceCollapseForm extends React.Component {
    constructor(props) {
        super(props);

        // Methods
        this.onSubmit = (formValues) => {
            this.props.toggleExpansion();
            this.props.createResource(formValues);
            this.props.reset();
            console.log(formValues);
        }

        this.renderTextField = ({ input, label }) => {
            return (
                <div>
                    <TextField {...input} label={label} />
                </div>
            );
        };
    }

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <form className={classes.root} onSubmit={handleSubmit(this.onSubmit)}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <Field
                            name="name"
                            component={this.renderTextField}
                            label="Name"
                        />
                    </Grid>
                    <Grid item>
                        <Field
                            name="url"
                            component={this.renderTextField}
                            label="URL"
                        />
                    </Grid>
                    <Grid item>
                        <input type="submit" value="Submit"></input>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

EditResourceCollapseForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EditResourceCollapseForm));

export default reduxForm({
    form: "editResource"
})(EditResourceCollapseForm);
