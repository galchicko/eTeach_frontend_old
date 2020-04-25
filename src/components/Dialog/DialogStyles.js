const styles = theme => ({

    dialogBox: {
        height: 209,
        width: 447
    },
    dialogOkBtn: {
        fontSize: 12,
        height: 35,
        width: 112.13,
        borderRadius: 17.5,
        backgroundColor: '#267FFA',
        color: '#FFFFFF',
        textTransform:'none',
        marginLeft:20
    },
    dialogCancelBtn: {
        fontSize: 12,
        height: 35,
        width: 112.13,
        borderRadius: 17.5,
        backgroundColor: '#E0E0E0',
        color: '#000000',
        textTransform:'none'
    },

    dialogOpenBtn: {
        fontSize: 12,
        height: 32,
        width: 115,
        border: '0.7px solid #000000',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        marginLeft:20,
        textTransform:'none'
    },
    dialogCloseButton: {
        position: 'absolute',
        right: 0
    },
    actions: {
        justifyContent: 'center',
        paddingTop: 47
    },
    text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 300,
        textAlign:'center',
        paddingTop: 33.5
    },
    dialogOpenBtnIcon:{
        marginRight:5
    }
});

export default styles;