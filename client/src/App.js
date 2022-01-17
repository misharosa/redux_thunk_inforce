import './App.css';
import Modal from 'react-modal';
import {useEffect, useMemo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostsFromServer } from "./actionsAsync/getPosts";
import { removeErrorsAction } from "./store/reducers/errorReducer";
import {addPostAction, deleteAllPosts, editPostAction, removePostAction} from "./store/actions/actions";
import { customStyles } from "./style/styleModal";
import { v4 as uuidv4 } from 'uuid';

export const App = () => {
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false)

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const [filterValue, setFilterValue] = useState('')

  const [editPost, setEditPost] = useState(null)
  const [editTitleValue, setEditTitleValue] = useState('')
  const [editBodyValue, setEditBodyValue] = useState('')

    useEffect(() => {
        if (editPost) {
        setEditTitleValue(editPost.title)
        setEditBodyValue(editPost.body)
        }
    }, [editPost])

  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.posts)
  const errors = useSelector(state => state.errors.errors)

  const addPost = async (e) => {
      e.preventDefault()

   const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method:"POST",
          title: postTitle,
          body: postBody,
          id: uuidv4()
        })
      const data = await response.json()
      data.length && dispatch(addPostAction(data))

    dispatch(addPostAction({title: postTitle, body: postBody, id: uuidv4()}))
    setPostTitle('')
    setPostBody('')
    setAddIsOpen(false)
  }

  const handleFilterPosts = useMemo(() => {
      console.log('posts', posts)
      return posts.filter(post => (
            post.title.toLowerCase().includes(filterValue.toLowerCase()) ||
            post.body.toLowerCase().includes(filterValue.toLowerCase())
        ))
    }, [posts, filterValue, editPost])

  const deleteAllErrors = () => {
      dispatch(removeErrorsAction(errors))
  }

  const findPostById = (postId) => {
      setEditPost(posts.find(post => post.id === postId))
  }

  const editPostById = (postId) => {
      const postsAfterEdit = posts.map((item,index) => {
          if (item.id === postId) {
              return {...item, title: editTitleValue, body: editBodyValue, id: index}
          }

          return item
          }
      )
          dispatch(editPostAction(postsAfterEdit))
  }

  return (
    <div className="App">
        <button onClick={() => setAddIsOpen(true)}>Add post</button>
        <button onClick={() => dispatch(getPostsFromServer())}>Open post from server</button>
        <button onClick={() => dispatch(deleteAllPosts())}>delete all posts</button>
        <button onClick={() => deleteAllErrors()}>Remove all errors</button>
        <label htmlFor="filterPosts">
            <h4>Find post by title or comment:</h4>
            <input
                placeholder="filter post..."
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
              <li> <b>Title: </b>   {post.title}</li>
              <li> <b>Comment: </b> {post.body}</li>
              <button
                  type="button"
                  onClick={() => {
                  deletePost(post.id)
                  dispatch(removePostAction(post.id))
              }}>
                  delete
              </button>
                <button onClick={() => {
                    setEditIsOpen(true)
                    findPostById(post.id)
                }}
                >
                    edit
                </button>
            </ul>
      )}
      </div>
        <Modal
            isOpen={addIsOpen}
            style={customStyles}
            ariaHideApp={false}
        >
          <form onSubmit={(e) => addPost(e)}>
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
                  type="button"
                  style={{display: 'block', marginTop: '10px'}}
                  onClick={() => setAddIsOpen(false)}
              >
                Close
              </button>
          </form>
        </Modal>
          {editPost &&
            <Modal
              isOpen={editIsOpen}
              style={customStyles}
              ariaHideApp={false}
          >
              <form style={{padding: '10px'}}>
                  <h2 style={{margin: '3px'}}>You can to edit this post!</h2>
                  <label style={{display:'block'}}>
                      Title:
                      <input
                          value={editTitleValue}
                          onChange={(e) => setEditTitleValue(e.target.value)}
                      />
                  </label>
                  <label style={{display:'block', border: 'white', marginTop: '10px'}}>
                      Comment:
                      <input
                          value={editBodyValue}
                          onChange={(e) => setEditBodyValue(e.target.value)}
                      />
                  </label >
                  <div className="buttons-edit">
                      <button type="button" onClick={() => {
                        setEditIsOpen(false)
                          editPostById(editPost.id)
                      }}>
                          edit
                      </button>
                      <button type="button" onClick={() => setEditIsOpen(false)}>close</button>
                  </div>
              </form>
          </Modal>
          }
      </div>
    </div>
  );
}
