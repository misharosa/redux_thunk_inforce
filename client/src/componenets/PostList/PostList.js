import React from "react";
import { deletePost } from "../../actionsAsync/dataFromServer";
import { removePostAction } from "../../store/actions/actions";
import { store } from "../../store";
import "./PostList.css"

export const PostList = ({ posts, findPostById, setEditIsOpen }) => {
    const { dispatch } = store
    return (
        <div className="post-container">
            {posts.length !== 0
            && posts.map((post,index) =>
                <ul className="post" key={index}>
                    <div>
                        <li className="post__item"> <b>Title: </b>   {post.title}</li>
                        <li className="post__item"> <b>Comment: </b> {post.body}</li>
                    </div>
                    <div className="post__buttons">
                        <button
                            type="button"
                            className="btn btn-secondary post__button"
                            onClick={() => {
                                setEditIsOpen(true)
                                findPostById(post.id)
                            }}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger post__button"
                            onClick={() => {
                                deletePost(post.id)
                                dispatch(removePostAction(post.id))
                            }}
                        >
                            Delete
                        </button>
                    </div>
                        <p className="post__number">{index + 1}</p>
                </ul>
            )}
        </div>
    )
}