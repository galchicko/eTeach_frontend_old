import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { loadReCaptcha } from 'react-recaptcha-google';
import { ReCaptcha } from 'react-recaptcha-google';


//components
import {loginValidationProps, loginPropsErrorsLabel, isLoginPropValid} from './loginValidators';

//styles
import './LoginComponent.scss';
import {styles} from './LoginComponentStyles';


class LoginComponent extends Component {
    state = {
        formPristine: true,
        usernameField: {
            value: '',
            invalid: true,
            helperText: loginPropsErrorsLabel[loginValidationProps.username]
        },
        passwordField: {
            value: '',
            invalid: true,
            helperText: loginPropsErrorsLabel[loginValidationProps.password]
        },
        captchaField: {
            value: '',
            invalid: true,
            helperText: loginPropsErrorsLabel[loginValidationProps.captcha]
        }
    };
    componentDidMount() {
        loadReCaptcha();
    };
    _isDisabledSubmitButton = () => {
        const {usernameField, passwordField,captchaField} = this.state;
        return this.props.inProgress
            || !isLoginPropValid(loginValidationProps.username, usernameField.value)
            || !isLoginPropValid(loginValidationProps.password, passwordField.value)
            || ( !this.captcha ? false : !isLoginPropValid(loginValidationProps.captcha, captchaField.value));
    };

    _handleUsernameChange = (event) => {
        const value = event.target.value;
        const invalid = !isLoginPropValid(loginValidationProps.username, value);
        const helperText = invalid ? loginPropsErrorsLabel[loginValidationProps.username] : null;
        const newUsernameField = {
            ...this.state.usernameField,
            value,
            invalid,
            helperText
        };
        this.setState({usernameField: newUsernameField});
    };

    _handlePasswordChange = (event) => {
        const value = event.target.value;
        const invalid = !isLoginPropValid(loginValidationProps.password, value);
        const helperText = invalid ? loginPropsErrorsLabel[loginValidationProps.password] : null;

        const newPasswordField = {
            ...this.state.passwordField,
            value,
            invalid,
            helperText
        };
        this.setState({passwordField: newPasswordField});
    };

    _handleSubmitButton = () => {
        const {usernameField, passwordField, formPristine} = this.state;
        if (formPristine) {
            this.setState({formPristine: false});
        }

        if (!this._isDisabledSubmitButton()) {
            this.props.sendCredentials(usernameField.value, passwordField.value);
        }
    };

    verifyCallback = (recaptchaToken) => {
        const value = recaptchaToken;
        const invalid = !isLoginPropValid(loginValidationProps.captcha, value);
        const helperText = invalid ? loginPropsErrorsLabel[loginValidationProps.captcha] : null;

        const newCaptchaField = {
            ...this.state.captchaField,
            value,
            invalid,
            helperText
        };
        this.setState({captchaField: newCaptchaField});
        console.log('newCaptchaField=' + newCaptchaField);
    };
    onLoadRecaptcha =() => {
        if (this.captcha) {
            this.captcha.reset();
        }
    }
    renderReCaptcha = () => {
        if ( this.props.errorCount < 3){
            return (<div></div>);
        }

        const {t, classes, inProgress, error} = this.props;
        const { formPristine,captchaField} = this.state;

        console.log('renderReCaptcha');


       return (
        <div className="LoginComponent__form__captcha">
            <ReCaptcha
                ref={(el) => {this.captcha = el;}}
                size="normal"
                render="explicit"
                sitekey="6LeNB7gUAAAAABhR3MBpIjbXNvTT7TrxEg4dT0sJ"
                verifyCallback={this.verifyCallback}
                onloadCallback={this.onLoadRecaptcha}
            />
            <TextField
                id="captchaField"
                className="LoginComponent__form__captchaField"
                fullWidth
                value={captchaField.value}
                error={!formPristine && captchaField.invalid}
                helperText={!formPristine && captchaField.helperText && t(`login.invalidMessages.${captchaField.helperText}`)}
                name="captchaField"
                InputProps={{ disableUnderline: true }}/>

        </div>
       );
    };

    render() {
        const {t, classes, inProgress, error} = this.props;
        const {usernameField, formPristine, passwordField,captchaField} = this.state;

        return (
            <div className="LoginComponent">
                <form className="LoginComponent__form" noValidate autoComplete="off">
                    <div className="LoginComponent__form__logo-container">

                    </div>
                    <div className="LoginComponent__form__title">
                        {t('login.Title')}
                    </div>
                    {error && <p className="LoginComponent__form__server-error">{t(error)}</p>}
                    <div className="LoginComponent__form__email">
                        <TextField
                            value={usernameField.value}
                            error={!formPristine && usernameField.invalid}
                            helperText={!formPristine && usernameField.helperText && t(`login.invalidMessages.${usernameField.helperText}`)}
                            label={t('login.placeholders.Username')}
                            fullWidth
                            id="usernameField"
                            name="login"
                            margin="none"
                            variant="outlined"
                            onChange={this._handleUsernameChange}
                            disabled={inProgress}
                            InputLabelProps={{
                                shrink: true
                            }}/>
                    </div>
                    <div className="LoginComponent__form__password">
                        <TextField
                            value={passwordField.value}
                            error={!formPristine && passwordField.invalid}
                            helperText={!formPristine && passwordField.helperText && t(`login.invalidMessages.${passwordField.helperText}`)}
                            label={t('login.placeholders.Password')}
                            fullWidth
                            type="password"
                            name="password"
                            id="passwordField"
                            margin="none"
                            variant="outlined"
                            onChange={this._handlePasswordChange}
                            disabled={inProgress}
                            InputLabelProps={{
                                shrink: true
                            }}/>
                    </div>
                    {this.renderReCaptcha()}
                    <div className="LoginComponent__form__log-in">
                        <Fab
                            variant="extended"
                            size="large"
                            color="primary"
                            aria-label="Add"
                            className={classes.button}
                            onClick={this._handleSubmitButton}
                            disabled={!formPristine && this._isDisabledSubmitButton()}>
                            {t('login.LogInButtonText')}
                        </Fab>
                    </div>



                </form>



            </div>
        );
    }
}

LoginComponent.propTypes = {
    sendCredentials: PropTypes.func,
    inProgress: PropTypes.bool,
    error: PropTypes.string
};

LoginComponent.defaultProps = {
    sendCredentials: () => {},
    inProgress: false
};

export default withStyles(styles)(withNamespaces('translation')(LoginComponent));
