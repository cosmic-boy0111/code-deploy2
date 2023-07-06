import React, { useContext } from 'react'
import { AppContext } from "../../../App";
import { Theme } from "../../Theme";
import Skeleton from '@mui/material/Skeleton';

import Grid from '@mui/material/Grid';
import { Box , Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const PreProfile = () => {

    const {themeToggler} = useContext(AppContext)

  return (
    <div>
        <header>
            <div
            className="Header_main_body"
            style={{
            backgroundColor: themeToggler
                ? Theme.Dark.boxColor
                : Theme.Light.boxColor,
            boxShadow: themeToggler
                ? Theme.Dark.BoxShadow
                : Theme.Light.BoxShadow,
            border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
            }}
        >
            <Skeleton variant="rectangular"  height={200}  animation='wave'/>
            <div className="Header_main_bottom">
            <div className="logo_holder">
                <div
                className="logo_img"
                style={{
                    backgroundColor: themeToggler
                    ? Theme.Dark.boxColor
                    : Theme.Light.boxColor,
                }}
                >
                
                <Skeleton variant="circular" animation='wave' style={{
                    width:'100%',
                    height : '100%'
                }} />
                
                </div>
                <div className="name_role_info">
                <span> <Skeleton animation="wave" width={100}/>  </span>
                <span> <Skeleton animation="wave" width={150}/> </span>
                </div>
            </div>
            
            <div className="tabs" style={{
                display:'flex',
                flexWrap:'wrap'
            }}>
                <Skeleton animation="wave" width={80} style={{marginLeft:'1rem'}} />
                <Skeleton animation="wave" width={80} style={{marginLeft:'1rem'}} />
                <Skeleton animation="wave" width={80} style={{marginLeft:'1rem'}} />
                <Skeleton animation="wave" width={80} style={{marginLeft:'1rem'}} />
            </div>
            </div>
        </div>
        </header>
        <section>
            <div className='info_holder'>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={5} style={{
                // display :  window.screen.width < '900' ? 'none' : 'block'
                // display :    Switch !== 'Profile' ? 'none' : 'block'
                }}>
                <Item className='card_container'
                style={{
                        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                        border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                    }}
                >
                    <div className='follow_div'>
                        <div className='follow'>
                            
                            <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={45} height={45} />
                            <div className='follow_count'>
                                <Skeleton animation="wave" width={100} height={30}/>
                                <Skeleton animation="wave" width={50}/>
                            </div>
                        </div>
                        <div className='follow'>
                        <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={45} height={45} />
                            <div className='follow_count'>
                                <Skeleton animation="wave" width={100} height={30}/>
                                <Skeleton animation="wave" width={50}/>
                            </div>
                        </div>
                    </div>

                    <div className='About' style={{
                        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                    }}>
                        <Skeleton animation="wave" width={100}/>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <div style={{
                            display:'flex',
                            justifyContent:'space-between',
                            flexWrap:'wrap',
                            marginTop:'1rem'
                        }}>
                            <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={40} height={40} />
                            <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={40} height={40} />
                            <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={40} height={40} />
                            <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={40} height={40} />
                            <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={40} height={40} />
                            <Skeleton variant="rectangular" className='follow_icon' animation='wave' width={40} height={40} />
                        </div>
                    </div>
                </Item>
                </Grid>
                <Grid item xs={ 7 } >
                    <Item className='card_container'
                    style={{
                            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                            boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                            border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                          
                        }}
                    >
                        {/* <div style={{
                           width:'100%',
                            alignItems:'center',
                            justifyContent:'center'
                        }}> */}

                        <Skeleton variant="circular" style={{
                            margin:'2rem 0'
                        }} animation='wave'  width={350} height={350}/>
                        {/* </div> */}
                    </Item>
                </Grid>
            </Grid>
            </Box>
        </div>
        </section>
    </div>
  )
}

export default PreProfile