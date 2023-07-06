import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import {CompilerContext} from './Compiler'
import { Theme } from "../../Theme";
import "../../../style/Body/Problems.css";
import { Divider } from "@mui/material";
import { IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

export default function ScrollDialog() {
  const { themeToggler } = useContext(AppContext);
  const {problem , setMini , mini} = useContext(CompilerContext)
  var [counter, setCounter] = React.useState(1);

  const diff = ["Easy", "Medium", "Hard"];
  const col = ["#00e676", "#eeff41", "#ff6e40"];
  const getDiff = (df) => {
    return (
      <span
        style={{
          backgroundColor: `${col[df]}`,
          borderRadius: "20px",
          fontSize: "15px",
          padding: ".2rem .5rem",
          textTransform: "lowercase",
        }}
      >
        {" "}
        {diff[df]}{" "}
      </span>
    );
  };

  const getString = () => {
    if (problem.subTags === undefined) {
      return ``;
    }
    return [problem.mainTag, ...problem.subTags].join();
  };

  return (
    <div>
      <div>
      <h5>{problem.title}</h5>
        <div className="problem_header">
          <div>{getDiff(problem.difficulty)}</div>
          {/* <div className="mini">
            {
              mini ? <IconButton onClick={()=>setMini(false)} style={{
                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                opacity:'.5'
              }}>
              <OpenInFullIcon />
            </IconButton> :  <IconButton onClick={()=>setMini(true)} style={{
                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                opacity:'.5'
              }}>
              <CloseFullscreenIcon />
            </IconButton>
            }
          </div> */}
        </div>
        <div
          className="problem_body"
          
        >
          
          <p> {getString()} </p>
          {problem.description === undefined
            ? ``
            : problem.description.split("\n").map((e) => {
                if (e === "") return ``;
                return <p> {e} </p>;
              })}

          <Divider />
          {problem.testCases === undefined
            ? ``
            : problem.testCases.map((e, index) => {
                if (e.input === "" || e.output === "") {
                  return ``;
                }
                return (
                  <div
                    className="test_case_holder"
                    style={{
                      color: themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                      
                    }}
                  >
                    <h6>Example {counter++}</h6>
                    <div
                      className="input_output"
                      style={{
                        border: themeToggler
                          ? Theme.Dark.Border
                          : Theme.Light.Border,
                        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
                        marginBottom:'1rem',
                      }}
                    >
                      <div style={{ marginBottom:'.5rem' }}> <div> INPUT : </div> <div> {
                        e.input.split("\n").map((e) => {
                          return <div> {e} </div>;
                        })}
                      </div> </div>
                      <div> <div> OUTPUT : </div> <div> {
                        e.output.split("\n").map((e) => {
                          return <div> {e} </div>;
                        })
                      }</div> </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
