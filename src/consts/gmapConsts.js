export const StatusColors = {
    CONNECTED : '#1FDA2F',
    DISCONNECTED:'#F7464A'
};

export const getStatusColor = (isConnected) =>{
    return isConnected ? StatusColors.CONNECTED : StatusColors.DISCONNECTED;
};

export const getClusterImagePath = (isConnected) =>{
    return isConnected ? '/gmap/m_connected1.png' : '/gmap/m_disconnected1.png';
};