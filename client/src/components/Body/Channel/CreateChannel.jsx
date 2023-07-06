import React, { createContext, useContext , useState } from "react";
import Drawer from "@mui/material/Drawer";
import { AppContext } from "../../../App";
import Button from "@mui/material/Button";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { Theme } from "../../Theme";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import LinearProgress from '../../Shared/LinearProgress'

import {ChannelContext} from './Channel'

export default function TemporaryDrawer() {
  const { themeToggler } = useContext(AppContext);

  const {toggle,setToggle} = useContext(ChannelContext)

  return (
    <div>
      {/* {['right'].map((anchor) => ( */}
      <React.Fragment key={"right"}>
        {/* <Button onClick={toggleDrawer('right', true)}>{'right'}</Button> */}
        <Drawer
          anchor={"right"}
          open={toggle}
          onClose={() => setToggle(false)}
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
                Create Channel
              </h2>
              <form className="blog_form">
                
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
              <Button className="back" onClick={() => setToggle(false)}>
                {/* <IconButton component="span" onClick={toggleDrawer('right', false)}> */}
                <ChevronLeftRoundedIcon />
                {/* </IconButton> */}
                Back
              </Button>
              <div>
                <Button variant="contained" >  submit</Button>
              </div>

            </footer>
            
          </section>
        </Drawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}
