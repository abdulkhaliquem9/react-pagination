import React from "react";
// import {createStore, applyMiddleware} from 'redux'
// import reduxThunk from 'redux-thunk'
// import {Provider} from 'react-redux'
// import Users from './Users'
import Pagination from './Pagination'
// import "./style.css";

// const reducer = (state={users: []}, action) => {
//   const {type, payload} = action
//   switch(type){
//    case 'Store_user': {
//      return {...state, users: payload}
//    }
//      default:
//       return state
//    } 
//   }
// const store = createStore(reducer, applyMiddleware(reduxThunk))


export default function App() {
  return (
    // <Provider   store={store}>
    //   <Users/>
    // </Provider>
    <Pagination></Pagination>
  );
}
