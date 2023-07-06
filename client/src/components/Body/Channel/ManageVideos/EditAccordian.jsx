import React, { useContext, useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabsContext } from './Tabs';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Theme } from '../../../Theme';
import { AppContext } from '../../../../App';
import { ChannelContext } from '../Channel';


function createData(id, file, title, date, views, comments, likes) {
    return {
        id,
        file,
        title,
        date,
        views,
        comments,
        likes
    };
}


const EditAccordian = () => {

    const { expanded, handleChangePnnel, expandVideoId, onEdit, setRows } = useContext(TabsContext);
    const { themeToggler } = useContext(AppContext)
    const { setChannelVideos, playLists } = useContext(ChannelContext);

    const [videoFields, setVideoFields] = useState({
        id: '',
        title: '',
        description: '',
        playlist_id: ''
    })

    const [selectedOption, setSelectedOption] = useState('');

    const getVideo = async () => {
        try {
            if (expandVideoId === '') return;
            const res = await fetch(`/getVideoById/${expandVideoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json();
            console.log(data);

            setVideoFields({
                id: expandVideoId,
                title: data.headerTitle,
                description: data.description,
                playlist_id: data.playlist_id
            })

            setSelectedOption(data.playlist_id)

        } catch (error) {

        }
    }

    useEffect(() => {

        getVideo();

    }, [onEdit])


    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value

        setVideoFields({
            ...videoFields,
            [name]: value
        })

    }

    const updateVideoData = async () => {
        try {

            const res = await fetch('/updateVideoTitleDescription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(videoFields)
            })

            const data = await res.json()
            console.log(data);
            const ele = createData(
                data._id,
                '',
                data.headerTitle,
                data.createAt.split('T')[0],
                0,
                0,
                0
            )

            setRows((pre) => {
                var rows = [];
                pre.forEach(element => {
                    if (element.id === data._id) {
                        rows.push(ele)
                    } else {
                        rows.push(element)
                    }
                });
                return rows;
            })

            setChannelVideos((pre) => {
                var rows = [];
                pre.forEach(element => {
                    if (element._id === data._id) {
                        rows.push(data)
                    } else {
                        rows.push(element)
                    }
                });
                return rows;
            })

            handleChangePnnel(false);

        } catch (error) {
            console.log(error);
        }
    }



    const selectPlaylist = (event) => {
        setSelectedOption(event.target.value);
        setVideoFields({
            ...videoFields,
            playlist_id : event.target.value
        })
    };

    return (
        <>
            {
                expanded &&
                <div style={{
                    width: '100%',
                    padding: '0 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                }} >

                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        <Grid item xs={12} sm={12} md={5}>
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
                                style={{
                                    width: '100%'
                                }}
                                id="filled-basic"
                                label={'Title'}
                                name="title"
                                value={videoFields.title}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={7}>
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
                                style={{
                                    width: '100%'
                                }}
                                multiline={true}
                                minRows={1}
                                id="filled-basic"
                                label={'Description'}
                                name="description"
                                value={videoFields.description}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <FormControl variant="standard" style={{
                                width: '100%',
                                position: 'relative',
                                left: '-.5rem'
                            }}
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
                            >
                                <InputLabel id="demo-simple-select-standard-label">Course</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={selectedOption}
                                    onChange={selectPlaylist}
                                    name={'playlist_id'}
                                    label="Course"

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {playLists.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <div style={{
                        alignSelf: 'flex-end',
                        marginTop: '.5rem'
                    }} >
                        <Button size='small' onClick={() => handleChangePnnel(false)}>
                            cancel
                        </Button>
                        <Button size='small' disabled={videoFields.title === ''} onClick={updateVideoData} >
                            save
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default EditAccordian