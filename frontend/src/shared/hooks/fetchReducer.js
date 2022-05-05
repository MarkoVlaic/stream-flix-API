import { useReducer } from "react";

export const ARRAY_PAYLOAD = 'ARRAY_PAYLOAD';
export const OBJECT_PAYLOAD = 'OBJECT_PAYLOAD';

const payloadTypeError = new TypeError('A fetch reducer payloadType should be: ARRAY_PAYLOAD or OBJECT_PAYLOAD');

const fetchReducer = (payloadType) => {
  const reducer =  (state, action) => {
    switch (action.type) {
      case 'fetch':
        console.log('fetch action');
        return { ...state, error: null, fetching: true };
      case 'error':
        return { ...state, error: action.payload, fetching: false };
      case 'success':
        if(payloadType === ARRAY_PAYLOAD) {
          return { ...state, data: [...state.data, ...action.payload], error: null, fetching: false };
        } else if(payloadType === OBJECT_PAYLOAD){
          return { ...state, data: action.payload, error: null, fetching: false };
        } else {
          throw payloadTypeError;
        }
      default:
        return state;
    }
  };

  let initialState = {
    fetching: false,
    error: null
  };

  if(payloadType === ARRAY_PAYLOAD) {
    initialState = {...initialState, data: []};
  } else if(payloadType === OBJECT_PAYLOAD) {
    initialState = {...initialState, data: {}};
  } else {
    throw payloadTypeError;
  }

  return { reducer, initialState };
} 

export const useFetchReducer = (payloadType) => {
  const { reducer, initialState } = fetchReducer(payloadType);
  return useReducer(reducer, initialState);
};