import React, { useContext } from 'react'
import { Player, PosterImage, BigPlayButton } from 'video-react';
import { CardMedia } from '@mui/material';
import "../../../../node_modules/video-react/dist/video-react.css"
import { AppContext } from '../../../App';

const VideoPlayer = ({ url, video }) => {

  const { rootUser } = useContext(AppContext);

  const videoComplete = async (e) => {
    const apiData = {
      videoId: video._id,
      userId: rootUser._id,
      courseId: video.playlist_id
    }

    try {
      const res = await fetch('/add_video_course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
      })

      console.log(res);

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className='video_player' >

      <Player
        playsInline
        // poster="/assets/poster.png"
        // auto
        autoPlay={true}
        src={url}
        onEnded={videoComplete}
      >
        {/* <source autoPlay src={url} /> */}
        <BigPlayButton position="center" />
      </Player>
    </div>
  )
}

export default VideoPlayer