import { addManyPostsAction, removePostAction } from "../store/reducers/postReducer";
import { catchErrorAction } from "../store/reducers/errorReducer";

export const getPostsFromServer = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
            const data = await response.json()

            dispatch(addManyPostsAction(data))
        } catch (e) {
            dispatch(catchErrorAction(e))
        }
    }
}

export const deletePost = (postId) => {
    return async dispatch => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "DELETE"
        })
        const data = await response.json()
        dispatch(removePostAction(data))
    } catch (e) {
        dispatch(catchErrorAction())
      }
   }
}
