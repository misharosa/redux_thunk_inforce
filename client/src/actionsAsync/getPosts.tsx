import { catchErrorAction } from "../store/reducers/errorReducer";
import { addManyPostsAction } from "../store/actions/actions";

export const getPostsFromServer = () => {
    return async (dispatch: any)  => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
            const data = await response.json()

            dispatch(addManyPostsAction(data))
        } catch (e: any) {
            dispatch(catchErrorAction(e))
        }
    }
}

export const deletePost = (postId : number) => {
    return async (dispatch: any)  => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "DELETE"
        })
        const data = await response.json()
        console.log(data)
    } catch (e: any) {
        dispatch(catchErrorAction(e))
      }
   }
}
