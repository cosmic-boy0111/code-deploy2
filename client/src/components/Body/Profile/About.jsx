import React, { useContext } from 'react';
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EmailIcon from '@mui/icons-material/Email';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './Profile';
import SocialLinks from './SocialLinks';


import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const About = () => {
    const navigate = useNavigate();
    const { themeToggler, rootUser } = useContext(AppContext)
    const { setToggle, user, followCount } = useContext(ProfileContext)

    const logoutUser = async () => {
        if (user._id !== rootUser._id) return;
        try {
            const res = await fetch('/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) {
                toast.success('logout successful')
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }


    const deleteUser = async () => {
        if (user._id !== rootUser._id) return;
        try {

            if (!window.confirm('Are you sure?')) {
                return;
            }

            const res = await fetch('/deleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user._id
                })
            })

            if (res.status === 200) {
                toast.success('Account Deleted');
                navigate('/register')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const gotoForgot = () => {
        if (user._id !== rootUser._id) return;
        navigate('/forgot')
    }

    return <div style={{
        marginBottom: '2rem'
    }}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={12} sm={4} md={8} >
                    <Item
                        style={{
                            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                            boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                            border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                            textAlign: 'left',
                            height: '100%',
                            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                        }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div className='follow_div'>
                                <div className='follow'>
                                    <div className='follow_icon' style={{
                                        backgroundColor: 'rgb(255, 151, 119)'
                                    }}>
                                        <GroupAddIcon />
                                    </div>
                                    <div className='follow_count'>
                                        <h6 style={{
                                            color: 'rgb(148, 164, 196)'
                                        }} >Following</h6>
                                        <h6 style={{
                                            fontWeight: 'bold',
                                            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
                                        }}>{followCount.followings}</h6>
                                    </div>
                                </div>
                                <div className='follow'>
                                    <div className='follow_icon' style={{
                                        backgroundColor: 'rgb(36, 153, 239)'
                                    }}>
                                        <GroupAddIcon />
                                    </div>
                                    <div className='follow_count'>
                                        <h6 style={{
                                            color: 'rgb(148, 164, 196)'
                                        }} >Followers</h6>
                                        <h6 style={{
                                            fontWeight: 'bold',
                                            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
                                        }}>{

                                                followCount.followers
                                            }</h6>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                padding: '0 1rem'
                            }}>
                                <h6>About</h6>
                                <p style={{ opacity: '.7' }}> {user.about}
                                </p>

                            </div>
                            <div style={{
                                justifySelf:'end'
                            }}>

                            <SocialLinks />
                            </div>
                        </div>
                    </Item>
                </Grid>
                {
                    user._id !== rootUser._id ? null :
                        <Grid item xs={12} sm={4} md={4} >
                            <Item style={{
                                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                                color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                            }}>


                                <div style={{
                                    padding: '1rem',
                                    height: '100%',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',

                                }}>
                                    <div className='info_holder2' onClick={() => user._id !== rootUser._id ? setToggle(false) : setToggle(true)} style={{
                                        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor
                                    }}>
                                        <ModeEditOutlineRoundedIcon />{' '} <span style={{ opacity: '.7' }}>Edit </span>  <span style={{ float: 'right' }}> <ArrowRightRoundedIcon /> </span>
                                    </div>
                                    <div className='info_holder2' onClick={logoutUser} style={{
                                        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
                                    }}>
                                        <LogoutRoundedIcon />{' '} <span style={{ opacity: '.7' }}>Logout </span> <span style={{ float: 'right' }}> <ArrowRightRoundedIcon /> </span>
                                    </div>
                                    <div className='info_holder2' onClick={deleteUser} style={{
                                        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor
                                    }}>
                                        <DeleteRoundedIcon />{' '} <span style={{ opacity: '.7' }}>Delete </span> <span style={{ float: 'right' }}> <ArrowRightRoundedIcon /> </span>
                                    </div>
                                    <div className='info_holder2' onClick={gotoForgot} style={{
                                        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor
                                    }}>
                                        <ChangeCircleRoundedIcon />{' '} <span style={{ opacity: '.7' }}>Change Password </span> <span style={{ float: 'right' }}> <ArrowRightRoundedIcon /> </span>
                                    </div>
                                </div>

                            </Item>
                        </Grid>
                }
            </Grid>
        </Box>


    </div>;
};

export default About;
