const BUY_CAKE = 'BUY_CAKE'

const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First redux function'
    }
}

// (previousState, action) => newState

const initialState = {
    numberOfCake: 10
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numberOfCake: state.numberOfCake - 1
        }
        default: return state
    }
}