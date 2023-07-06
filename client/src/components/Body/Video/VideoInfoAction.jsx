import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

import { Icon, IconButton, useEventCallback } from '@mui/material';
import { Tooltip } from '@mui/material';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import { formatDate } from '../../Shared/Functions';
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';

const VideoInfoAction = ({
  data,
  views,
  like,
  setLike,
  dislike,
  setDislike
}) => {
  const { themeToggler, rootUser } = useContext(AppContext)


  const { id } = useParams();





  const clickLike = async () => {
    setDislike(false)
    if (like) {


      setLike(false)
      const res = await fetch(`/removeLikedVideo/${rootUser.activeChannel}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })


      // console.log(res);
    } else {

      setLike(true)
      const res = await fetch(`/addLikedVideo/${rootUser.activeChannel}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  const disLike = async () => {
    try {
      setLike(false)
      if (dislike) {
        setDislike(false)
      } else {
        setDislike(true)
        const res = await fetch(`/removeLikedVideo/${rootUser.activeChannel}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='video_page_video_info px-2 mt-0 pt-1' >
      <h6>{data.headerTitle}</h6>
      <div className='video_action_container'>
        <span style={{
          color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }}>{views}{" "} views  |{" "}{formatDate(data.createAt)}</span>
        <div>
          <Tooltip title='like'>
            <IconButton onClick={clickLike} style={{
              color: like ? '#f73378' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }}>
              <ThumbUpRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='dislike'>
            <IconButton onClick={disLike} style={{
              color: dislike ? '#f73378' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }}>
              <ThumbDownAltRoundedIcon />
            </IconButton>
          </Tooltip>
          <RWebShare
              data={{
                text: "check out this amazing video",
                url: `${window.location.origin}/video/${id}`,
                title: "Code++",
              }}
              onClick={() => console.log("shared successfully!")}
            >

          <Tooltip title='share'>
            <IconButton style={{
              color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }}>
              <ShareRoundedIcon />
            </IconButton>
          </Tooltip>
              </RWebShare>
          <Tooltip title='save'>
            <IconButton style={{
              color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }}>
              <PlaylistAddRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default VideoInfoAction