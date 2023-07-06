import React,{useState,useEffect,useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import More_Filter from './More_Filter';
import { CourseContext } from './Courses';


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
  

export default function Filter_Accordian() {

    const { themeToggler } = useContext(AppContext)

    const {searchText,setSearchText} = useContext(CourseContext)


  return (
    <div>
      <Accordion style={{
        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
        border : 'none',
        outline : 'none',
        boxShadow:'none',
        marginBottom:'1rem'
      }}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            padding:'0',
            backgroundColor: 'transparent',
          }}
        >
          <Search style={{
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
            }}>
                <SearchIconWrapper>
                <SearchIcon color='primary' />
                </SearchIconWrapper>
                <StyledInputBase
                    style={{
                        color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                    }}
                    value={searchText}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Search>
        </AccordionSummary>
        <AccordionDetails style={{
            padding:'0'
        }}>
          <Typography>
                    
            <More_Filter />

          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}