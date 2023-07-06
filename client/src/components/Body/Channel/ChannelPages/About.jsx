import React, { useContext } from 'react'
import { ChannelContext } from '../Channel'

const About = () => {
  const {channel} = useContext(ChannelContext);
  return (
    <div>{channel.about}</div>
  )
}

export default About