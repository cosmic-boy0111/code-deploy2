import { Divider } from '@mui/material'
import React from 'react'
import History from './LibrarySubPages/History'
import LikedVideos from './LibrarySubPages/LikedVideos'
import PlayList from './LibrarySubPages/PlayList'

const Library = () => {
  return (
    <>
      <History />
      <Divider />
      <PlayList />
      <Divider />
      <LikedVideos />
    </>
  )
}

export default Library