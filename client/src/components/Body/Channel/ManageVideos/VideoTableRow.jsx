import { Checkbox, IconButton, Skeleton, TableCell, TableRow } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { TabsContext } from './Tabs';
import { ChannelContext } from '../Channel';


const VideoTableRow = ({ row, setRows, handleClick, isItemSelected, labelId }) => {

    const { themeToggler } = useContext(AppContext);

    const [thumbnail, setThumbnail] = useState('')
    const [views, setViews] = useState(0)
    const [likes, setLikes] = useState(0)

    const [checkMouse, setCheckMouse] = useState(false);

    const { setChannelVideos } = React.useContext(ChannelContext)

    const {handleChangePnnel, setExpandVideoId,onEdit, setOnEdit} = useContext(TabsContext)

    const handleEdit = () => {
        handleChangePnnel(true)
        setExpandVideoId(row.id);
        setOnEdit(!onEdit);
    }

    const getThumbnail = async () => {
        try {

            console.log('under thumbnails');


            const res = await fetch(`/getThumbnailsFile/${row.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const file = await res.json();
            //   if (file.file === '') getThumbnail();
            setThumbnail(file.file);

        } catch (error) {

        }
    }

    const getViews = async () => {
        try {



            const res3 = await fetch(`/getView/${row.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const viewData = await res3.json();
            setViews(viewData.videosCount)
        } catch (error) {
            console.log(error);
        }
    }

    const getLikeCount = async () => {
        try {

            const res = await fetch(`/getVideoLikeCount/${row.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json();
            console.log(data);
            setLikes(data.likeCount);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getThumbnail();
        getViews();
        getLikeCount();
    }, [row])


    const handleDelete = async () => {
        try {
            
            const res = await fetch(`/deleteVideo/${row.id}`, {
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json();
            console.log(data);

            setChannelVideos((pre)=>{
                return pre.filter((e) => e._id !== row.id);
            })
            setRows((pre)=>{
                return pre.filter((e) => e.id !== row.id);
            })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}

                    />
                </TableCell>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    sx={{
                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                    }}
                >
                    <div 
                    onMouseEnter={() => setCheckMouse(true)} 
                    onMouseLeave={() => setCheckMouse(false)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            widows: '100px',
                            height: '50px',
                            margin: '.5rem'
                        }}>
                            {
                                thumbnail === '' ? <Skeleton variant="rounded" width={90} height={50} /> :
                                    <img src={thumbnail} alt="" srcset="" style={{
                                        width: '100px',
                                        height: '100%',
                                        borderRadius: '5px'
                                    }} />
                            }
                        </div>
                        {
                            checkMouse ? <div style={{
                                display:'flex',
                                justifyContent: 'space-between'
                            }} >
                                <IconButton color='primary' onClick={handleEdit} >
                                    <EditRoundedIcon />
                                </IconButton>
                                <IconButton color='secondary' onClick={handleDelete}>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </div> :
                                <div style={{
                                    width: '150px',
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: 'nowrap',
                                    fontSize: '15px'
                                }}>

                                    {row.title}
                                </div>
                        }
                    </div>
                </TableCell>
                <TableCell align="right" sx={{
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>
                    {row.date}
                </TableCell>
                <TableCell align="right" sx={{
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>
                    {views}
                </TableCell>
                <TableCell align="right" sx={{
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>
                    {row.comments}
                </TableCell>
                <TableCell align="right" sx={{
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>
                    {likes}
                </TableCell>
            </TableRow>
        </>
    )
}

export default VideoTableRow