import { ADD_ERROR, REMOVE_ERROR } from "../type/types";
import { ActionType, StateErrorType } from "../../typescript/types";

const defaultState: StateErrorType = {
    errors: []
}

export const errorReducer = (state = defaultState, action: ActionType): StateErrorType => {
    switch (action.type)  {
        case ADD_ERROR:
            return {...state, errors: [...state.errors, action.payload]}
        case REMOVE_ERROR:
            return {...state, errors: []}

        default:
            return state;
    }
}

export const catchErrorAction = (payload: string) => ({ type: ADD_ERROR, payload })
export const removeErrorsAction = (payload: string) => ({ type: REMOVE_ERROR, payload })