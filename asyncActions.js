const { createStore, applyMiddleware } = require("redux")
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: true,
    users: [],
    error: ''
}

// declare the constants for action type
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// action creator
const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE: return {
            ...state,
            loading: false,
            users: [],
            error: action.payload
        }
        default: return state
    }
}

// action creator return a function
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                // res.data is the array of users
                const users = res.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                // error.message is the error description
                dispatch(fetchUsersFailure(error.message))
            })
    }
}
// store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())