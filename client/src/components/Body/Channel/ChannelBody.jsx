import React,{useContext} from 'react'
import { ChannelContext } from './Channel'

import Videos from './ChannelPages/Videos'
import PlayLists from './ChannelPages/PlayLists'
import Channels from './ChannelPages/Channels'
import About from './ChannelPages/About'
import Library from './ChannelPages/Library'

import { AppContext } from '../../../App'
import { Theme } from '../../Theme'

const ChannelBody = () => {

    const {page, setPage} = useContext(ChannelContext)
    const {themeToggler} = useContext(AppContext)

    const getPage = () =>{
        
        switch (page) {
            case 'Videos':
                return <Videos />
            case 'PlayLists':
                return <PlayLists />
            case 'Channels':
                return <Channels />
            case 'About':
                return <About />
            case 'Library' : 
                return <Library />
            default:
                break;
        }

    }

  return (
    <section className='channel_page_body' style={{
        // backgroundColor : 
    }}>
        {getPage()}
    </section>
  )
}

export default ChannelBody