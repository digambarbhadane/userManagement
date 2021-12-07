import * as types from './actionTypes'

const intialState = {
    users: [],
    user: {},
    loading: false,
    userDetail: [],
    userCreated:false
}

const usersReducer = (state = intialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                userCreated: false,
            }
        case types.DELETE_USER:
            return {
                ...state,
                loading: false,
            }
        case types.ADD_USER:
            return {
                ...state,
                loading: false,
                userCreated: true,
            }
        case types.EDIT_USER:
            return {
                ...state,
                userDetail: action.payload,
                loading: false,
            }
        default:
            return state;
    }
};

export default usersReducer