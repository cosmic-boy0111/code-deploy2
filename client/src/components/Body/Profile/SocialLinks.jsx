import React, { useContext } from 'react'
import { Theme } from '../../Theme'
import { ProfileContext } from './Profile'
import { AppContext } from '../../../App';


const SocialLinks = () => {

  const { social } = useContext(ProfileContext)

  const {themeToggler} = useContext(AppContext)

  return (
    <div className='social_container'>
      {
        social.map((e, index) => {
          if (index === 0) {
            return <a href={`mailto:${e.link}`} className='social_link_inside' style={{
              backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
              border:themeToggler ? Theme.Dark.Border : Theme.Light.Border
            }} > 
              <img src={e.logo} alt="" srcset="" style={{
                opacity: '.7',
                filter: `invert( ${themeToggler ? '100%' : '0%'})`
              }} />
              {e.name}
            </a>
          }
          return e.link === '' ? <a  key={index}  className='social_link_inside' style={{
            backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            border:themeToggler ? Theme.Dark.Border : Theme.Light.Border
          }} > 
            <img src={e.logo} alt="" srcset="" style={{
              opacity: '.7',
              filter: `invert( ${themeToggler ? '100%' : '0%'})`
            }} /> 
              {e.name}
            </a> : <a target={'_blank'} key={index} href={e.link} className='social_link_inside' style={{
            backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            border:themeToggler ? Theme.Dark.Border : Theme.Light.Border
          }} >
            <img src={e.logo} alt="" srcset="" style={{
              opacity: '.7',
              filter: `invert( ${themeToggler ? '100%' : '0%'})`
            }} /> 
              {e.name}
            </a>
        })
      }
    </div>
  )
}

export default SocialLinks