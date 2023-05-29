// import {createStore , applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../Reducers/index.js'

// const initialState = {} ;

// const middleware = [thunk];

// const store = createStore(
//     rootReducer ,
//     initialState,
    
// )

 

import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on/ export default store ;
 export default store ;