import { ADD_MANY_POSTS, ADD_POST, REMOVE_POST } from "../types";

const defaultState = {
    posts: [],
}

export const postsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_MANY_POSTS:
            return {...state, posts: action.payload}

        case ADD_POST:
            return {...state, posts: [...state.posts,
                     {
                         title: action.payload.title,
                         body: action.payload.body,
                         id: action.payload.id
                     }
                ]}

        case REMOVE_POST:
            return {...state, posts: action.payload}

        default:
            return state;
    }
}

export const addPostAction = (payload) => ({type: ADD_POST, payload})
export const removePostAction = (payload) => ({type: REMOVE_POST, payload})
export const addManyPostsAction = (payload) => ({type: ADD_MANY_POSTS, payload})