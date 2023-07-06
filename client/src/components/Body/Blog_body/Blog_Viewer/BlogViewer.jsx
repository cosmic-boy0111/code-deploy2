import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { Theme } from '../../../Theme';
import { AppContext } from '../../../../App';
import FileViewer from './FileViewer';
import '../../../../style/Body/BlogViewer.css'
import BlogData from './BlogData';
import Comments from './Comments';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BlogViewer = () => {

    const { themeToggler } = useContext(AppContext);

    useEffect(() => {
        var myDiv = document.getElementsByTagName("body")[0];
        myDiv.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);


    const style = {
        padding: '0',
        borderRadius: '10px',
        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        textAlign: 'left'
    }

    return (
        <div className='body_margin'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={6} sm={4} md={6} >
                        <Item style={style} >
                            <FileViewer />
                        </Item>
                        <Item style={style} >
                            <Comments />
                        </Item>
                    </Grid>
                    <Grid item xs={6} sm={4} md={6} >
                        <Item style={style} >
                            <BlogData />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default BlogViewer
