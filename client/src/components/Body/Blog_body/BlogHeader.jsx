import React,{useContext} from 'react'
import { AppContext } from '../../../App'
import { Theme } from '../../Theme'


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,

}));



const BlogHeader = () => {

    const {themeToggler} = useContext(AppContext);

  return (
    <div style={{
        display:'flex',
        // border:'1px solid red',
        paddingTop:'.5rem',
        position:'sticky',
        top:'0',
        backdropFilter: 'blur(6px)',
        display : 'flex',
        justifyContent : 'space-between'
    }}>

        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 4, md: 8 }}>
                
                <Grid item xs={4} sm={4} md={4} >
                    <Item  style={{
                        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                        // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                        // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                        border:'none',
                        boxShadow:'none',
                        backgroundColor:'transparent'
                    }}>
                        <h3 style={{
                            fontWeight:'bold',
                            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                            opacity: 0.7
                        }} >Blogs and Articals</h3>
                        <small style={{
                            
                            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                        }} > Share your ideas with blog </small>
                    </Item>
                    
                </Grid>
                <Grid item xs={4} sm={4} md={3} >
                    <Item   style={{
                        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                        // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                        // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                        border:'none',
                        boxShadow:'none',
                        backgroundColor:'transparent'
                    }}>
                        <div style={{display:'flex',alignItems:'stretch',}}>

                        <input type="text" placeholder='Search...' name="" id="" style={{
                            border:'none',
                            outline:'none',
                            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
                            borderRadius:'5px',
                            padding:'.5rem',
                            boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                            width:'100%',
                            marginRight:'1rem'
                            
                        }}/>
                        
                        <Button variant="contained" >
                            <SearchRoundedIcon />
                        </Button>
                            </div>
                    </Item>
                    
                </Grid>
            </Grid>
        </Box>

       
    </div>
  )
}

export default BlogHeader