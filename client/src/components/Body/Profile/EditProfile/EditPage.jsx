import React, { useContext,useState,useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { AppContext } from "../../../../App";
import Button from "@mui/material/Button";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { Theme } from "../../../Theme";
import { ProfileContext } from "../Profile";


import { Box , Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TextareaAutosize from '@mui/material/TextareaAutosize';


import email from '../../../../images/social/email.png'
import linkedin from '../../../../images/social/linkedin.png'
import github from '../../../../images/social/github.png'
import facebook from '../../../../images/social/facebook.png'
import twitter from '../../../../images/social/twitter.png'
import instagram from '../../../../images/social/instagram.png'



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TemporaryDrawer() {
  const { themeToggler } = useContext(AppContext);
  const { toggle, setToggle, user, setUser, social , setSocial } = useContext(ProfileContext);


  const [userData, setUserData] = useState({})

  const [tit, setTit] = useState(false)
  const [eml, setEml] = useState(false)

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  const handleData = () =>{
    setUserData(
      user.socialLinks === undefined ? {
        name : '',
        profession : '',
        about : '',
        email : '',
        linkedin : '',
        github : '',
        twitter : '',
        facebook : '',
        instagram : '',
      } : {
        name : user.name,
        profession : user.profession,
        about : user.about,
        email : user.email,
        linkedin : user.socialLinks.linkedin,
        github : user.socialLinks.github,
        twitter : user.socialLinks.twitter,
        facebook : user.socialLinks.facebook,
        instagram : user.socialLinks.instagram,
      }
    )
  }

  useEffect(() => {
    handleData();
  }, [user])
  

  const inputHandler = (event) =>{
    var name = event.target.name;
    var value = event.target.value;

    if(name === 'name'){
      setTit(false)
    }

    if(name === 'email'){
      setEml(false)
    }

    setUserData({...userData,[name] : value})
  }

  const editData = async() =>{
    if(userData.name === ''){
      setTit(true);
      return;
    }
    console.log(validateEmail(userData.email));
    if(!validateEmail(userData.email)){
      setEml(true);
      return;
    }

    try {

      const res = await fetch('/updateUser',{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          id : user._id,
          name: userData.name,
          email: userData.email,
          about: userData.about,
          profession : userData.profession,
          socialLinks : {
            linkedin : userData.linkedin,
            github : userData.github,
            twitter : userData.twitter,
            facebook : userData.facebook,
            instagram : userData.instagram,
          }
        })
      })

      if(res.status !== 200){
        return;
      }

      setUser({
        ...user,
        name : userData.name,
        profession : userData.profession,
        about: userData.about,
        email : userData.email,
        socialLinks : {
          linkedin : userData.linkedin,
          github : userData.github,
          twitter : userData.twitter,
          facebook : userData.facebook,
          instagram : userData.instagram,
        }
      })


      setSocial([
        {
          logo : email,
          link : userData.email
        },
        {
          logo : linkedin,
          link : userData.linkedin
        },
        
        {
          logo : facebook,
          link : userData.facebook
        },
        {
          logo : twitter,
          link : userData.twitter
        },
        {
          logo : instagram,
          link : userData.instagram
        },
        {
          logo : github,
          link : userData.github
        },
      ])

      

      setToggle(false)
    } catch (error) {
      console.log(error);
    } 
  }
    

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={toggle}
        onClose={()=>setToggle(false)}
        className="Blog_drawer"
      >
        <section
          className="create_blog"
          style={{
            backgroundColor: themeToggler
              ? Theme.Dark.BodyBackgroundColor
              : Theme.Light.BodyBackgroundColor,
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
        >
          <div className="create_blog_body">
            <h2
              className="heading blog_header2"
              style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.BodyBackgroundColor
                  : Theme.Light.BodyBackgroundColor,
                color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
              }}
            >
              {" "}
              EDIT PROFILE{" "}
            </h2>
            <form className="blog_form">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
                <Grid item xs={6} >
                  <Item className='card_container' style={{
                    boxShadow:'none',
                    backgroundColor:'transparent',
                    textAlign:'initial',
                    color: themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                  }}>
                  <div >
                  <label
                    for="title"
                    class="form-label"
                    style={{
                      color: tit
                        ? "#f50057"
                        : themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                    }}
                  >
                    Name{" "}
                    <span
                      className="Red"
                      style={{
                        display: tit ? "inline" : "none",
                      }}
                    >
                      Required
                    </span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    name="name"
                    value={userData.name}
                    onChange={inputHandler}
                   
                    style={{
                          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                        }}
                  />
                </div>
                  </Item>
                </Grid>
                <Grid item xs={6} >
                  <Item className='card_container' style={{
                    boxShadow:'none',
                    backgroundColor:'transparent',
                    textAlign:'initial',
                    color: themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                  }}>
                  <div >
                  <label
                    for="title"
                    class="form-label"
                  >
                    Profession{" "}
                    
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    name="profession"
                    value={userData.profession}
                    onChange={inputHandler}
                   
                    style={{
                          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                        }}
                  />
                </div>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <div class="mt-2">
                  <label
                    for="description"
                    class="form-label"
                    style={{
                      color:themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                    }}
                  >
                    About{" "}
                    
                  </label>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Add about yourself ...."
                    name="about"
                    value={userData.about}
                    onChange={inputHandler}
                    class="form-control"
                    style={{
                          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border

                        }}
                  />
                </div>
                <h5 className="social_header">Social Media</h5>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container className="mt-2" spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
                    <Grid item xs={6} >
                      <Item className='card_container' style={{
                        boxShadow:'none',
                        backgroundColor:'transparent',
                        textAlign:'initial',
                        color: themeToggler
                            ? Theme.Dark.Color
                            : Theme.Light.Color,
                      }}>
                      <div >
                      <label
                        for="title"
                        class="form-label"
                        style={{
                          color: eml
                            ? "#f50057"
                            : themeToggler
                            ? Theme.Dark.Color
                            : Theme.Light.Color,
                        }}
                      >
                        <span
                          className="Red"
                          style={{
                            display: eml ? "inline" : "none",
                          }}
                        >
                          Invalid {" "}
                        </span>
                        Email
                        
                      </label>
                      <div className="logo_input_holder" style={{
                                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                              }}>
                        <img src={email} alt="" srcset="" className="logo_link"/>
                        <input
                          type="email"
                          class="form-control"
                          id="title"
                          name="email"
                          value={userData.email}
                          onChange={inputHandler}
                          style={{
                            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          }}
                        />
                      </div>
                    </div>
                      </Item>
                    </Grid>
                    <Grid item xs={6} >
                    <Item className='card_container' style={{
                        boxShadow:'none',
                        backgroundColor:'transparent',
                        textAlign:'initial',
                        color: themeToggler
                            ? Theme.Dark.Color
                            : Theme.Light.Color,
                      }}>
                      <div >
                      <label
                        for="title"
                        class="form-label"
                      >
                        Linkedin{" "}
                        
                      </label>
                      <div className="logo_input_holder" style={{
                                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                              }}>
                        <img src={linkedin} alt="" srcset="" className="logo_link"/>
                        <input
                          type='text'
                          class="form-control"
                          id="linkedin"
                          name="linkedin"
                          value={userData.linkedin}
                          onChange={inputHandler}
                          style={{
                            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          }}
                        />
                      </div>
                    </div>
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container className="mt-2" spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
                    <Grid item xs={6} >
                    <Item className='card_container' style={{
                        boxShadow:'none',
                        backgroundColor:'transparent',
                        textAlign:'initial',
                        color: themeToggler
                            ? Theme.Dark.Color
                            : Theme.Light.Color,
                      }}>
                      <div >
                      <label
                        for="title"
                        class="form-label"
                      >
                        GitHub{" "}
                        
                      </label>
                      <div className="logo_input_holder" style={{
                                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                              }}>
                        <img src={github} alt="" srcset="" className="logo_link"/>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          name="github"
                          value={userData.github}
                          onChange={inputHandler}
                          style={{
                            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          }}
                        />
                      </div>
                    </div>
                      </Item>
                    </Grid>
                    <Grid item xs={6} >
                    <Item className='card_container' style={{
                        boxShadow:'none',
                        backgroundColor:'transparent',
                        textAlign:'initial',
                        color: themeToggler
                            ? Theme.Dark.Color
                            : Theme.Light.Color,
                      }}>
                      <div >
                      <label
                        for="title"
                        class="form-label"
                      >
                        FaceBook{" "}
                        
                      </label>
                      <div className="logo_input_holder" style={{
                                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                              }}>
                        <img src={facebook} alt="" srcset="" className="logo_link"/>
                        <input
                          type="email"
                          class="form-control"
                          id="title"
                          name="facebook"
                          value={userData.facebook}
                          onChange={inputHandler}
                          style={{
                            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          }}
                        />
                      </div>
                    </div>
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container className="mt-2" spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
                    <Grid item xs={6} >
                    <Item className='card_container' style={{
                        boxShadow:'none',
                        backgroundColor:'transparent',
                        textAlign:'initial',
                        color: themeToggler
                            ? Theme.Dark.Color
                            : Theme.Light.Color,
                      }}>
                      <div >
                      <label
                        for="title"
                        class="form-label"
                      >
                        Twitter{" "}
                        
                      </label>
                      <div className="logo_input_holder" style={{
                                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                              }}>
                        <img src={twitter} alt="" srcset="" className="logo_link"/>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          name="twitter"
                          value={userData.twitter}
                          onChange={inputHandler}
                          style={{
                            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          }}
                        />
                      </div>
                    </div>
                      </Item>
                    </Grid>
                    <Grid item xs={6} >
                    <Item className='card_container' style={{
                        boxShadow:'none',
                        backgroundColor:'transparent',
                        textAlign:'initial',
                        color: themeToggler
                            ? Theme.Dark.Color
                            : Theme.Light.Color,
                      }}>
                      <div >
                      <label
                        for="title"
                        class="form-label"
                      >
                        Instagram{" "}
                        
                      </label>
                      <div className="logo_input_holder" style={{
                                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                              }}>
                        <img src={instagram} alt="" srcset="" className="logo_link"/>
                        <input
                          type="email"
                          class="form-control"
                          id="title"
                          name="instagram"
                          value={userData.instagram}
                          onChange={inputHandler}
                          style={{
                            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          }}
                        />
                      </div>
                    </div>
                      </Item>
                    </Grid>
                  </Grid>
            </Box>
            </form>
          </div>
          <footer
            className="blog_footer_action"
            style={{
              backgroundColor: themeToggler
                ? Theme.Dark.BodyBackgroundColor
                : Theme.Light.BodyBackgroundColor,
              color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            }}
          >
            <Button className="back" onClick={()=>setToggle(false)}>
              <ChevronLeftRoundedIcon />
              Back
            </Button>
            <div>
              <Button variant="contained" onClick={editData} >submit</Button>
            </div>
          </footer>
        </section>
      </Drawer>
    </div>
  );
}
