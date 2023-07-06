import React, { useState, useEffect, useContext } from 'react'

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';

import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'

import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import LayersRoundedIcon from '@mui/icons-material/LayersRounded';

const PlayListCard = ({ data }) => {

  const navigate = useNavigate();

  const { themeToggler } = useContext(AppContext)

  const [thumbnail, setThumbnail] = useState('')

  const getData = async () => {
    try {
      const res = await fetch(`/getThumbnailsFile/${data.firstVideoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const file = await res.json();
      console.log(file);
      setThumbnail(file.file);
    } catch (error) {

    }
  }

  useEffect(() => {
    getData();
  }, [])



  const goToVideo = () => {
    navigate(`/video/${data.firstVideoId}`)
  }

  return (
    <div style={{
      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      // backgroundColor:'transparent',
      // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
      // boxShadow:'none',

      textAlign: 'initial',
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      borderRadius: '4px'
    }}>

      <CardActionArea>
        <div onClick={goToVideo} >

          <CardMedia
            component="img"
            height="170"
            image={thumbnail}
            alt="green iguana"
            style={{
              borderRadius: '5px'
          }}
          />
          {/* <div className='playlist_card_info' style={{
              // color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
              color: 'white'
            }}>
                <span>{data.videoCount}</span>
                <PlaylistPlayRoundedIcon />
            </div> */}
        </div>

      </CardActionArea>
      {/* <div style={{
        padding:'0 .5rem'
      }}>
        {data.name}
      </div>
      <Button onClick={goToVideo} style={{
        textTransform:'uppercase',
        cursor:'pointer',
        marginTop : '.2rem',
        // padding:'.2rem 0'
      }}> View full course</Button> */}
      <div style={{
        padding: '1rem'
      }}>
        <div style={{
          width: '100%',
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: 'nowrap',
          fontSize: '16px',
          color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }}>
          {data.name}
        </div>
        <div className='my-1' style={{
          color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }}>
          { data.description.length > 60 ? data.description.substring(0,60) + '...' : data.description}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }}>
          <LayersRoundedIcon color='secondary' />
          <span style={{ marginLeft: '.5rem' }} >{data.videoCount} Lessons</span>
        </div>
      </div>
    </div>
  )
}

export default PlayListCard