import React, { useContext, useEffect, useState } from 'react'
import { PostForEditContext } from '../../store/context/postForEdit.context'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../store/actions/post.actions'
import './index.scss'

const Form = () => {
    const initInputValue = {
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    }

    const [postData, setPostData] = useState(initInputValue)

    const { postForEdit, setPostForEdit } = useContext(PostForEditContext)

    useEffect(() => {
        if (postForEdit) setPostData(postForEdit)
        else setPostData(initInputValue)
    }, [postForEdit])

    const dispath = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (postForEdit) {
            dispath(updatePost(postForEdit._id, postData))
        } else {
            dispath(createPost(postData))
        }
        clearForm()
    }

    const clearForm = () => {
        setPostForEdit(undefined)
        setPostData(initInputValue)
    }

    return (
        <form
            className='memories-form'
            onSubmit={handleSubmit}
        >
            <h2>{ postForEdit ? 'Update' : 'Create' } a Memory</h2>
            <div className="group">
                <input 
                    type="text"
                    required
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <span className="bar"></span>
                <label>Creator</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    required
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                ></input>
                <span className="bar"></span>
                <label>Title</label>
            </div>
            <div className="group"> 
                <input 
                    type="text" 
                    required
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                ></input>
                <span className="bar"></span>
                <label>Message</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    required
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                ></input>
                <span className="bar"></span>
                <label>Tags</label>
            </div>
            <div className="image">
                <FileBase 
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                />   
            </div>
            <div className='button-group'>
                <button type='submit' className='submit'>{ postForEdit ? 'Update' : 'Submit' }</button>
                <button type='button' className='clear' onClick={() => clearForm()} >Clear</button>
            </div>
        </form>
    )
}

export default Form