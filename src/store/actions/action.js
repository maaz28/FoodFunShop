import history from '../../history';

export function foodListing(list){
    return dispatch => {
        dispatch({ type: "FOOD_LIST", payload: list })
        }
} 

// This function is used to update the store for featured, trending, clients's data, single Place Data
// WelcomeArea Data fetch will also be displaye by this report love it
// Action Trriggers with this function are 
// SINGLE_DETAILS
export function UpdateTheStore(action ,list){ 
    return dispatch => {
        dispatch({ type: action, payload: list })
        }
}


export function changeRouteToDetailedView(id){
    return dispatch => {
        dispatch({ type: "SINGLE_ID", payload: id })
        history.push('/singleListing');
        }
}

export function changeRouteToDetailedHangoutView(id){
    console.log(id, 'In Action hahahaha')
        return dispatch => {
        dispatch({ type: "HANGOUT_ID", payload: id })
        history.push('/hangoutSingle');
        }
}

export function changeRouteToOnBoardDetailedView(id){
    return dispatch => {
        dispatch({ type: "SINGLE_ID", payload: id })
        history.push('/onBoardSingleListing');
        }
}

export function detailsOfAPlaceToAReducer(obj){
    return dispatch => {
        dispatch({ type: "SINGLE_DETAILS", payload: obj })
        }
}

//this method updates store ListingRoute Property to be used by Listing component, This function is used by FeaturedPlaces compoonent, and WElcomeArea Component
export function routeStringForListingComponent(routeToBeFetched){
    return dispatch => {
        dispatch({ type: "LISTING_ROUTE", payload: routeToBeFetched })
        history.push('/listing');
        }
}

// ******************************************** USER AUTHENTICATION ACTIONS ***********************************
// this functioon updates the user logged in state
export function isLoginAction(value){
    return dispatch => {
        dispatch({ type: "IS_LOGGEDIN", payload: value })
        }
}

export function updateUserData(value){
    return dispatch => {
        dispatch({ type: "UPDATE_USER_DATA", payload: value })
        } 
}

export function saveToken(token){
    return dispatch => {
        dispatch({ type: "SAVE_TOKEN", payload: token })
        }
}
