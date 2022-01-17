import {ADD_MANY_POSTS, ADD_POST, DELETE_ALL_POST, EDIT_POST, REMOVE_POST} from "../type/types";

const initialState = {
    posts: [],
}

export const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MANY_POSTS:
            return { ...state, posts: [...state.posts, ...action.payload]}

        case ADD_POST:
            return { ...state, posts: [...state.posts, action.payload] }

        case REMOVE_POST:
            return { ...state, posts: state.posts.filter(post => post.id !== action.payload) }

        case DELETE_ALL_POST:
            return { ...state, posts: [] }

        case EDIT_POST:
            return { ...state, posts: action.payload }

        default:
            return state;
    }
}