import * as actionTypes from "../type/types";
import { ActionType, StateErrorType } from "../../typescript/types";

const defaultState: StateErrorType = {
    errors: []
}

export const errorReducer = (state = defaultState, action: ActionType): StateErrorType => {
    switch (action.type)  {
        case actionTypes.ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        case actionTypes.REMOVE_ERROR:
            return {...state, errors: []}

        default:
            return state;
    }
}

export const catchErrorAction = (payload: string) => ({ type: actionTypes.ADD_ERROR, payload })
export const removeErrorsAction = (payload: string) => ({ type: actionTypes.REMOVE_ERROR, payload })