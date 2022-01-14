import './App.css';
import Modal from 'react-modal';
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostsFromServer } from "./actionsAsync/getPosts";
import {addPostAction, deleteAllPosts} from "./store/reducers/postReducer";
import { removeErrorsAction } from "./store/reducers/errorReducer";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [filterValue, setFilterValue] = useState('')

  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.posts)
  const errors = useSelector(state => state.errors.errors)


  const addPost = async () => {
   const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method:"POST",
          title: postTitle,
          body: postBody,
          id: posts.length + 1
        })
      const data = await response.json()
      data.length && dispatch(addPostAction(data))

    dispatch(addPostAction({title: postTitle, body: postBody, id: posts.length + 1}))
    setPostTitle('')
    setPostBody('')
    setIsOpen(false)
  }

  const handleFilterPosts = useMemo(() => {
        return posts.filter(post =>(
            post.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        post.body.toLowerCase().includes(filterValue.toLowerCase())
        ))
    }, [posts, filterValue])

  const deleteAllErrors = () => {
      dispatch(removeErrorsAction(errors))
  }

  return (
    <div className="App">
        <button onClick={() => setIsOpen(true)}>Add post</button>
        <button onClick={() => dispatch(getPostsFromServer())}>Open post from server</button>
        <button onClick={() => dispatch(deleteAllPosts())}>delete all posts</button>
        <button onClick={() => deleteAllErrors()}>Remove all errors</button>
        <label htmlFor="filterPosts">
            <h4>Find post by title or comment:</h4>
            <input
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                id="filterPosts"
                type="text"
            />
        </label>
        {errors.length !== 0 &&
        <ul>
            {errors.map(error => <li>{error.message}</li>)}
        </ul>
        }
      <div>
      <div>
      {posts.length !== 0
      && handleFilterPosts.map((post,index) =>
            <ul key={index}>
              <li> <b>Title:</b> {post.title}</li>
              <li> <b>Comment:</b> {post.body}</li>
              <button type="button" onClick={deletePost(post.id)}>delete</button>
            </ul>
      )}
      </div>
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            ariaHideApp={false}
        >
          <form onSubmit={(e) => {
            e.preventDefault()
            addPost()
          }}>
            <h1>We can to add post!</h1>
              <label style={{display:'block'}}>
              Title:
                <input
                  value={postTitle}
                  onChange={(e) =>{
                  setPostTitle(e.target.value)
                  }}
                />
              </label >
                Comment:
                <textarea
                  style={{display: 'block'}}
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                />
              <button type="submit" style={{display: 'block'}}>Send</button>
              <button
                  style={{display: 'block', marginTop: '10px'}}
                  onClick={() => setIsOpen(false)}
              >
                Close
              </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
