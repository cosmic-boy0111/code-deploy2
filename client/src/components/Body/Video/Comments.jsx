import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Theme } from '../../Theme';
import { AppContext } from '../../../App';
import { Avatar, Button, CardMedia } from '@mui/material';
import TextField from '@mui/material/TextField';
import CommentCard from './Cards/CommentCard';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Comments = () => {

    const { id } = useParams();

    const [comments, setComments] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [userImage, setUserImage] = useState('');
    const [comment, setComment] = useState('');
    const [showBtn, setShowBtn] = useState(false)
    const [userId, setUserId] = useState('')
    const [showComments, setShowComments] = useState(window.screen.width <= '900' ? false : true)

    const { themeToggler } = useContext(AppContext);


    const getTargetComments = async () => {

        try {

            const res = await fetch(`/getCommentsByTargetId/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            console.log('Comments', data);
            setComments(data);

        } catch (error) {
            console.log(error);
        }

    }

    const getUserImage = async () => {
        try {

            const userRes = await fetch('/about', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const user = await userRes.json();
            setUserId(user._id);

            const res = await fetch(`/getImg/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json();
            setUserImage(data.img);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTargetComments();
        getUserImage();
    }, [id])


    const handleExpandClick = () => {
        setExpanded(!expanded);
        setShowComments(!showComments);
    }

    const cancleComment = () => {
        setComment('');
        setShowBtn(false);
    }



    const submitComment = async () => {
        try {

            const res = await fetch('/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    targetId: id,
                    text: comment
                })
            })

            const data = await res.json();
            setComment("");
            setShowBtn(false);

            getTargetComments();

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div style={{
            padding: '0.6rem'
        }} >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h6 style={{ margin: '0' }} >
                    {comments.length} Comments
                </h6>
                {
                    window.screen.width <= '900' ?
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            style={{
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            }}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore> : null
                }
            </div>
            <div style={{
                display: 'flex',
                // alignItems:'center',
                justifyContent: 'space-between',
            }} >
                <Avatar src={userImage} className='point' style={{
                    marginTop: '1rem'
                }} />
                <div style={{
                    width: '92%',
                    display: 'flex',
                    flexDirection: 'column',

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
                            width: '100%'
                        }}
                        onClick={() => setShowBtn(true)}
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                    {
                        showBtn ?
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
                                    disabled={comment === ""}
                                    onClick={submitComment}
                                    variant="contained" size='small' >
                                    Comment
                                </Button>
                            </div> : null
                    }
                </div>
            </div>

            {
                showComments &&
                <div>
                    {
                        comments.map(id => {
                            return <CommentCard CommentId={id} getTargetComments={getTargetComments} comments={comments} />
                        })
                    }
                </div>
            }

        </div>
    )
}

export default Comments
