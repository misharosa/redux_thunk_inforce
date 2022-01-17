import {ADD_MANY_POSTS, ADD_POST, DELETE_ALL_POST, EDIT_POST, REMOVE_POST} from "../type/types";

export const deleteAllPosts = (payload) => ({type: DELETE_ALL_POST, payload})
export const addPostAction = (payload) => ({type: ADD_POST, payload})
export const removePostAction = (payload) => ({type: REMOVE_POST, payload})
export const addManyPostsAction = (payload) => ({type: ADD_MANY_POSTS, payload})
export const editPostAction = (payload) => ({type: EDIT_POST, payload})