const INITIAL_STATE = {
    isLogin : false,
    name : '',
    email : '',
    chat : [],
    uuid : '',
    token : '',
    profile_photo_url : ''
}
// Have to setup the response from authentication api here here
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'IS_LOGGEDIN':
        return({
            ...state,
            isLogin : action.payload
        })
        case 'UPDATE_USER_DATA':
        return({
            ...state,
            name : action.payload.name,
            email : action.payload.email,
            uuid : action.payload.uuid,
            profile_photo_url : action.payload.profile_photo_url
        })
        case 'SAVE_TOKEN':
        return({
            ...state,
            token : action.payload
        })
    }
    return state;
}