const redux = require('redux')
const createStore = redux.createStore
const combineReducer = redux.combineReducers

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'

const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First redux function'
    }
}

const buyIceCream = () => {
    return {
        type: BUY_ICE_CREAM,
    }
}

const initialCake = {
    numberOfCake: 10
}
const initialIceCream = {
    numberOfIceCream: 20
}

const cakeReducer = (state = initialCake, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numberOfCake: state.numberOfCake - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCream, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM: return {
            ...state,
            numberOfIceCream: state.numberOfIceCream - 1
        }
        default: return state
    }
}

const rootReducer = combineReducer({
    cake: cakeReducer,
    iceCreamReducer: iceCreamReducer,
})

const store = createStore(rootReducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()

