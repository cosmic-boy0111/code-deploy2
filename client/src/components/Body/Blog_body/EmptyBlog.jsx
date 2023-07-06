import React from 'react'
import empty from '../../../images/assets/undraw_font_re_efri.svg'

const EmptyBlog = () => {
  return (
      <>
          <img src={empty} alt="" srcset="" style={{
              width:'50%',
              // height:'500px'e 
          }}/>
            <h3>Be The first to create post</h3>
      </>
  )
}

export default EmptyBlog