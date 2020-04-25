import {connect} from 'react-redux';
import VerificationDialog from '../VerificationDialog';

const mapStateToProps = state => {
    return ({
        open : state.alertDialog.isOpen,
        title: state.alertDialog.title,
        text: state.alertDialog.text,
        okBtnText: state.alertDialog.okBtnText
    });
};

const mapDispatchToProps = () => ({
    handleClose: () => {
        window.location.assign('/login');
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(VerificationDialog);
