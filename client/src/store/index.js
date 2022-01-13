import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { errorReducer } from "./reducers/errorReducer";
import { postsReducer } from "./reducers/postReducer";

const rootReducer = combineReducers({
    posts: postsReducer,
    errors: errorReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))