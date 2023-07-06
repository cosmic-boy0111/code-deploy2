import { CardMedia } from '@mui/material'
import React, { useContext } from 'react'
import quiz from '../../../../images/assets/quize.jpg'

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Theme } from '../../../Theme';
import { AppContext } from '../../../../App';
import { QuizContext } from './Quiz';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(1),
    width: '30%',
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
    width: '100%'
  },
}));


const QuizHeader = () => {

  const { themeToggler } = useContext(AppContext)

  const { quizList, setQuizList, allQuiz } = useContext(QuizContext);

  const filterQuiz = (text) => {
    console.log(text);
    if (text === '') {
      setQuizList(allQuiz);
      return;
    }

    

    var arr = [];
    allQuiz.forEach(e => {
      if(e.title.toLowerCase().includes(text.toLowerCase()) || e.description.toLowerCase().includes(text.toLowerCase())){
        arr.push(e);
      }
    });

    setQuizList(arr);


  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <CardMedia
        component="img"
        height="150"
        src={quiz}
        style={{
          objectFit: 'cover',
          borderRadius: '5px',
          marginBottom: '1rem'
        }}
      />
      <Search onChange={(e) => filterQuiz(e.target.value)} style={{
        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      }}>
        <SearchIconWrapper>
          <SearchIcon color='primary' />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </div>
  )
}

export default QuizHeader