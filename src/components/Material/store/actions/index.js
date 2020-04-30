export const createResource = (data={}) => {
    return({
       type: 'CREATE_RESOURCE',
       payload: data
    });
}

export const deleteResource = (resourceName) => {
    return {
        type: 'DELETE_RESOURCE',
        payload: resourceName
    }
}

export const toggleResourceCardExpansion = () => {
    return {type: 'TOGGLE_RESOURCE_CARD_EXPANSION'}
}