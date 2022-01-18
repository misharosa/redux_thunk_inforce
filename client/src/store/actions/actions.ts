import * as actionTypes from "../type/types";

export function simulateHttpRequest(action: any) {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(action);
        }, 500);
    };
}

export const deleteAllPostsAction = (article: any) => {
    const action = {type: actionTypes.DELETE_ALL_POST, article}

    return simulateHttpRequest(action)
}

export const addPostAction = (payload: any) => {
    const action = { type: actionTypes.ADD_POST, payload }

    return simulateHttpRequest(action)
}

export const removePostAction = (payload: any) => {
    const action = { type: actionTypes.REMOVE_POST, payload }

    return simulateHttpRequest(action)
}

export const addManyPostsAction = (payload: any) => {
   const action = { type: actionTypes.ADD_MANY_POSTS, payload }

    return simulateHttpRequest(action)
}

export const editPostAction = (payload: any) => {
  const action = { type: actionTypes.EDIT_POST, payload }

  return simulateHttpRequest(action)
}