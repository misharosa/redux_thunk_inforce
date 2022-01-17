import { ADD_MANY_POSTS, ADD_POST, DELETE_ALL_POST, EDIT_POST, REMOVE_POST } from "../type/types";

export const deleteAllPosts = (payload: any) => ({ type: DELETE_ALL_POST, payload })
export const addPostAction = (payload: any) => ({ type: ADD_POST, payload })
export const removePostAction = (payload: any) => ({ type: REMOVE_POST, payload })
export const addManyPostsAction = (payload: any) => ({ type: ADD_MANY_POSTS, payload })
export const editPostAction = (payload: any) => ({ type: EDIT_POST, payload })