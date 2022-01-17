import { ADD_ERROR, REMOVE_ERROR } from "../type/types";

const defaultState = {
    errors: []
}

export const errorReducer = (state = defaultState, action) => {
    switch (action.type)  {
        case ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        case REMOVE_ERROR:
            return {...state, errors: []}

        default:
            return state;
    }
}

export const catchErrorAction = (payload) => ({type: ADD_ERROR, payload})
export const removeErrorsAction = (payload) => ({type: REMOVE_ERROR, payload})