import React, { useContext } from 'react'
import '../../style/Navbar/BotttomNav.css'

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import VideoStableRoundedIcon from '@mui/icons-material/VideoStableRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';


import SideLink from './SideLink';

import { Theme } from '../Theme';
import { AppContext } from '../../App';

const BottomNav = () => {

    const {rootUser,themeToggler} = useContext(AppContext)

  return (
    <div className='bottom_nav' style={{
        // backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
    }}>
        <div style={{
            display:'flex',
            justifyContent:'space-around'
        }}>
            <SideLink icon={<GridViewRoundedIcon />} link={'/'} name={'Dashboard'}  open={false} /> 
            <SideLink icon={<PeopleOutlineRoundedIcon />} link={'/users'} name={'Users'} open={false} />
            <SideLink icon={<VideoStableRoundedIcon />} link={'/post'} name={'Post'} open={false} />
            <SideLink icon={<CodeRoundedIcon />} link={'/problems'} name={'Problems'} open={false} />
            <SideLink icon={<BookRoundedIcon />} link={`/courses`} name={'Courses'} open={false} />
            <SideLink icon={<QuizRoundedIcon />} link={`/quiz`} name={'Quiz'} open={false} />
        </div>
    </div>
  )
}

export default BottomNav