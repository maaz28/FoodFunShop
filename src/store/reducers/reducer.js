const INITIAL_STATE = {
    featuredPlaces : [],
    trendingPlaces : [],
    foodListSorted : [], 
    hangoutPlaces : [],
    allFetauredPlaces : [],
    singleDetails : {},
    singleId : '',
    listingRoute : '',
    hangoutId : '',
    formatted_phone_number : '',
    clientImagesArrayForSliderOnHomePage : [],
    isLogin : true
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HANGOUT_ID':
        return({
            ...state,
            hangoutId : action.payload
        })
        case 'HANGOUT_PLACES':
        return({
            ...state,
            hangoutPlaces : action.payload
        })
        case 'FOOD_LIST_SORTED':
        return({
            ...state,
            foodListSorted : action.payload
        })
        case 'SINGLE_ID':
            return ({
                ...state,
                singleId: action.payload
            })
            case 'SINGLE_DETAILS':
            return ({
                ...state,
                singleDetails : action.payload,
                formatted_phone_number : action.payload.formatted_phone_number
            })
            case 'LISTING_ROUTE':
            return ({
                ...state,
                listingRoute : action.payload
            })
            case 'ERROR_MESSAGE':
            return({
                ...state,
                errorMessage : action.payload
            })
            case 'CLIENT_IMAGES_ARRAY':
            return({
                ...state,
                clientImagesArrayForSliderOnHomePage : action.payload
            })
            case 'FEATURED_PLACES':
            return({
                ...state,
                featuredPlaces : action.payload
            })
            case 'TRENDING_PLACES':
            return({
                ...state,
                trendingPlaces : action.payload
            })
        default:
            return state;
    }

}