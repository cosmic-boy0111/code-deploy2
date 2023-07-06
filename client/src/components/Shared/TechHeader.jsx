import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Theme } from "../Theme";
import { CardMedia } from "@mui/material";
import { Avatar } from "@mui/material";

const ProgrammingHeader = ({
    logo, bg, text
}) => {
  const { themeToggler } = useContext(AppContext);
  

  return (
    <>
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
          marginBottom:'2rem'
        }}
      >
      
        <CardMedia
          component="img"
          height="200"
          src={bg}
          style={{
            objectFit: 'cover'
          }}
          
        />
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
              <Avatar
                aria-label="recipe"
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor:'transparent'
                }}
              >
                <img
                    src={logo}
                    alt=""
                    style={{
                      width: "90%",
                      height: "90%",
                    }}
                  />
              </Avatar>
              
            </div>
            <h2 className="name_role_info">
                {text}
            </h2>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ProgrammingHeader;
