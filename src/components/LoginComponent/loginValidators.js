export const loginValidationProps = {
    email: 'email',
    username: 'username',
    password: 'password',
    captcha: 'captcha'
};

export const loginPropsErrorsLabel = {
    [loginValidationProps.email]: 'InvalidEmail',
    [loginValidationProps.username]: 'InvalidUsername',
    [loginValidationProps.password]: 'InvalidPassword',
    [loginValidationProps.captcha]: 'InvalidCaptcha'
};

export const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape, max-len
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const validateRequired = (value) => {
    return !!value.trim();
};

export const validationFunctions = {
    [loginValidationProps.email]: validateEmail,
    [loginValidationProps.password]: validateRequired,
    [loginValidationProps.username]: validateRequired,
    [loginValidationProps.captcha]: validateRequired
};

export const isLoginPropValid = (prop, value) => {
    return validationFunctions[prop](value);
};