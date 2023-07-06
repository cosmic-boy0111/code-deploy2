import { Avatar, Button, IconButton, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { convertDateToActualTime } from '../../../../Shared/Functions'

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';
import BasicMenu from './CommentMenu';
import { useParams } from 'react-router-dom';

const CommentCard = ({ CommentId, getTargetComments,comments }) => {

    const {id} = useParams();

    const [comment, setComment] = useState({})
    const [user, setUser] = useState({})
    const [userImage, setUserImage] = useState('')
    const [isEditing, setIsEditing] = useState(false);
    const [alterComment, setAlterComment] = useState('')

    const { themeToggler, rootUser } = useContext(AppContext)

    const getComment = async () => {
        console.log("cdata");
        try {

            const res = await fetch(`/getCommentById/${CommentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json();
            console.log('comment data', data);
            setComment(data);

            const userRes = await fetch(`/getUser/${data.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const user = await userRes.json();
            setUser(user);

            const imgRes = await fetch(`/getImg/${data.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const imgData = await imgRes.json();
            setUserImage(imgData.img);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getComment();
    }, [CommentId])

    const editingComment = () => {
        setIsEditing(true);
        setAlterComment(comment.text);
    }

    const deleteComment = async () => {
        try {

            console.log(comments);
            const arr = [];
            comments.forEach(element => {
                if(element !== CommentId) arr.push(element);
            });

            console.log(arr);

            const res = await fetch(`/deleteComment`,{
                method:'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    arr : arr,
                    CommentId : CommentId,
                    targetId : id
                })
            })

            const data = await res.json();
            console.log(data);

            getTargetComments();

        } catch (error) {
            
        }
    }

    const cancleComment = () => {
        setIsEditing(false);
        setAlterComment('')
    }

    const submitComment = async () => {

        try {
            
            setComment({
                ...comment,
                text : alterComment
            })


            const res = await fetch('/editComment',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    CommentId : CommentId,
                    text : alterComment
                })
            })

            const data = await res.json();

            cancleComment();

        } catch (error) {
            
        }

    }


    return (
        <div style={{
            marginTop: '1rem'
        }} >
            <div style={{
                display: 'flex',
                // alignItems:'center',
                justifyContent: isEditing ? 'space-between' : '',
            }} >
                <Avatar src={userImage} className='point' sx={{ width: 35, height: 35 }} />

                {
                    isEditing ?
                        <div style={{
                            width: '89%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf:'flex-end'
                        }} >
                            <TextField
                                inputProps={{
                                    style: {
                                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    }
                                }}
                                sx={{
                                    "& label": {
                                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                        "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
                                            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                        }
                                    }
                                }}
                                multiline
                                id="standard-basic"
                                label="Add a comment..."
                                variant="standard"
                                style={{
                                    width: '100%',
                                    fontSize:'12px'
                                }}
                                value={alterComment}
                                onChange={(e) => {
                                    setAlterComment(e.target.value);
                                }}
                            />
                            <div style={{
                                marginTop: '.5rem',
                                alignSelf: 'flex-end'
                            }} >
                                <Button
                                    onClick={cancleComment}
                                    variant="outlined" size='small' sx={{
                                        marginRight: '.5rem'
                                    }} >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={alterComment === ""}
                                    onClick={submitComment}
                                    variant="contained" size='small' >
                                    Save
                                </Button>
                            </div>
                        </div>
                        :

                        <div style={{
                            marginLeft: '1.5rem',
                            width: '85%',
                            display: 'flex',
                            flexDirection: 'column',
                            // justifySelf:'flex-start'
                        }} >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                alignSelf: 'flex-start'
                            }} >

                                {user.name}
                                <span style={{
                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    fontSize: '12px',
                                    marginLeft: '.5rem'
                                }} >
                                    {convertDateToActualTime(comment.date)}
                                </span>
                            </div>
                            <div>

                                {
                                    comment.text?.split("\n").map((e) => {
                                        return <div> {e} </div>;
                                    })

                                }


                            </div>
                        </div>
                }
                <div>
                    {
                        isEditing ? null :
                        rootUser._id === user._id ?
                            <BasicMenu  editingComment = {editingComment} deleteComment={deleteComment}/>
                            : <IconButton size='small' disabled >
                                {/* <MoreVertIcon fontSize='small' /> */}
                            </IconButton>
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentCard
