import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import { AppContext } from '../../../App';
import { Theme } from '../../Theme';


import { CourseTags } from '../../Shared/Tags';
import { Button, FormControl, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',

  },
}));

const Filter = () => {

  const { themeToggler } = useContext(AppContext)
  const [currentItems, setCurrentItems] = useState(4)
  const [selectedTags, setSelectedTags] = useState([]);


  return (
    <>
      {/* <h3>Filter</h3> */}
      <h6>
        Search Course
      </h6>
      <Search style={{
        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
      }}>
        <SearchIconWrapper>
          <SearchIcon color='primary' />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <div className='extra_search'>
        <div className='course_tags'>
          <h6 className='display_flex' >
            <span> Course Tags  </span>
            <Button color="secondary" style={{
              textTransform: 'none'
            }} onClick={() => setCurrentItems(4)} >Clear</Button>
          </h6>
          <div className='tags_container' style={{
            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,

          }}>
            <FormControl>
              <RadioGroup>
                {
                  CourseTags.slice(0, currentItems).map((e) => {
                    return <div >
                      <Checkbox sx={{
                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                        '&.Mui-checked': {
                          color: "success",
                        },
                      }} size="small" color="success" onClick={() => {
                        var f = selectedTags.find((k) => {
                          return k === e;
                        })
                        if (f) {
                          var newArray = selectedTags.filter((t) => {
                            return t !== e;
                          })
                          setSelectedTags(newArray);
                          console.log(selectedTags);
                          return;
                        }

                        setSelectedTags([...selectedTags, e])
                        console.log(selectedTags);
                      }}


                      />
                      <span>{e}</span>
                    </div>
                  })
                }
              </RadioGroup>
            </FormControl>
            <div style={{
              cursor: 'pointer'
            }} onClick={() => setCurrentItems(currentItems === 4 ? CourseTags.length : 4)}>
              <IconButton>

                <UnfoldMoreRoundedIcon style={{
                  color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }} />
              </IconButton>
              <span>
                {
                  currentItems === 4 ? "Expand" : "Collapse"
                }
              </span>
            </div>
          </div>
        </div>
        <div className='course_tags'>
          <h6 className='display_flex' >
            <span> Upload Date  </span>

          </h6>
          <div className='tags_container' style={{
            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,

          }}>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                style={{
                  marginLeft: '.7rem'
                }}
              >
                {
                  ['Today', 'This Week', 'This Month', 'This Year'].map((e) => {
                    return <FormControlLabel value={e} control={<Radio size='small' sx={{
                      color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                      '&.Mui-checked': {
                        color: "success",
                      },
                    }} />} label={e} />
                  })
                }
              </RadioGroup>
            </FormControl>



          </div>
        </div>
      </div>
    </>
  )
}

export default Filter