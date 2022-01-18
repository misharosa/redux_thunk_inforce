import * as actionTypes from "../type/types"
import { ActionType, InitialTypeState, Posts } from "../../typescript/types";

const initialState: InitialTypeState = {
    posts: [],
}

export const postsReducer = (state = initialState, action: ActionType) : InitialTypeState => {
    switch(action.type) {
        case actionTypes.ADD_MANY_POSTS:
            return { ...state, posts: [...state.posts, ...action.payload] }

        case actionTypes.ADD_POST:
            return { ...state, posts: [...state.posts, action.payload] }

        case actionTypes.REMOVE_POST:
            return { ...state, posts: state.posts.filter((post: Posts) => post.id !== action.payload) }

        case actionTypes.DELETE_ALL_POST:
            return { ...state, posts: [] }

        case actionTypes.EDIT_POST:
            return { ...state, posts: action.payload }

        default:
            return state;
    }
}
