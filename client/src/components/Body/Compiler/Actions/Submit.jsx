import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../../Theme";
import { AppContext } from "../../../../App";
import { CompilerContext } from "../Compiler";
import Loader from "./Loader";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';


const Submit = ({ setIsUpload }) => {
  const { themeToggler, rootUser } = useContext(AppContext);
  const { problem, code, upload, selectLang, checker, setChecker,closeConsole } =
    useContext(CompilerContext);
  const [load, setLoad] = useState(false);

  const [error, setError] = useState("");

  const checkCases = async (index) => {
    console.log(checker);
    var res;
    var Data;

    try {
      setLoad(true);
      setIsUpload(false)
      res = await fetch("/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: selectLang,
          input: problem.testCases[index].input,
          code: code,
        }),
      });

      Data = await res.json();

      console.log(Data);

      if (Data.error) {
        console.log(Data.error);
        setLoad(false);
        setIsUpload(true)
        setError(Data.error);
        return;
      } else {
        // console.log(Data.output);
        // Data = {
        //   output: Data.output.replaceAll("\r", ""),
        // };

        var output1 = problem.testCases[index].output.replaceAll("\r", "");
        output1 = output1.replaceAll("\n", "")

        var output2 = Data.output.replaceAll("\r", "");
        output2 = output2.replaceAll("\n", "");

        console.log(problem.testCases[index], Data);
        // if (Data.output === problem.testCases[index].output) {
        if (output1 === output2) {
          var cases =
            JSON.parse(localStorage.getItem("cases")) === null
              ? []
              : JSON.parse(localStorage.getItem("cases"));
          cases = [
            ...cases,
            {
              index: index + 1,
              status: "success",
            },
          ];
          localStorage.setItem("cases", JSON.stringify(cases));
          setChecker(cases);
        } else {
          cases =
            JSON.parse(localStorage.getItem("cases")) === null
              ? []
              : JSON.parse(localStorage.getItem("cases"));
          cases = [
            ...cases,
            {
              index: index + 1,
              status: "error",
            },
          ];
          localStorage.setItem("cases", JSON.stringify(cases));
          setChecker(cases);
        }
        setTimeout(() => {
          setIsUpload(true)
        }, 1500);
      }

      setLoad(false);
    } catch (err) { }
  };


  const setSolution = async () => {
    try {

      const res = await fetch('/setProblemSolution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          problem: problem,
          solution: code,
          lang: selectLang
        })
      })

      const Data = await res.json();

      console.log(Data);

    } catch (error) {
      console.log(error);
    }
  }

  const removeTemp = async () => {
    try {
      const res = await fetch('/deleteTemp', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    localStorage.removeItem('cases')
    setError("");
    removeTemp();
    var cnt = 0;
    problem.testCases.forEach((element, index) => {
      if (element.input !== "" && element.output !== "") {
        setTimeout(() => {
          checkCases(index);
        }, 1000 * cnt);
        cnt = cnt + 1;
      }
    });

    setSolution();

  }, [upload]);

  const statusCol = (status) => {
    if (status === "error") {
      return "#ef5350";
    }

    return "#66bb6a";
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h6
          style={{
            display: "flex",
            margin: "0",
            alignItems: "center",
          }}
        >
          {" "}
          <span style={{ marginRight: "1rem" }}> RESULT </span>{" "}
          <span
            style={{
              visibility: load ? "visible" : "hidden",
            }}
          >
            {" "}
            <Loader />{" "}
          </span>{" "}
        </h6>
        <IconButton color="secondary" onClick={closeConsole} size="small">
          <ClearRoundedIcon />
        </IconButton>

      </div>

      <div >
        <div
          class="form-control code_input_textarea"
          id="check_container"
          rows="5"
          style={{
            backgroundColor: themeToggler
              ? Theme.Dark.boxColor
              : Theme.Light.boxColor,
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            boxShadow: themeToggler
              ? Theme.Dark.BoxShadow
              : Theme.Light.BoxShadow,
            border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
            resize: "none",
            height: "140px",
            overflowY: "scroll",
          }}
        >
          <div style={{ color: "#ef5350", display: checker.length === 0 ? 'block' : 'none' }}>
            {error}
          </div>
          {
            [...new Map(checker.map((item) => [item["index"], item])).values(),].map((e) => {
              return (
                <div
                  style={{
                    // padding:'.5rem 1rem',
                    paddingRight: '1rem',
                    borderRadius: "20px",
                    color: "white",
                    backgroundColor: statusCol(e.status),
                    display: "inline-block",
                    margin: ".2rem",
                  }}
                >
                  {e.status === "error" ? (
                    <IconButton style={{ backgroundColor: '#d32f2f', marginRight: '.5rem', color: 'white' }} aria-label="upload picture" component="span">
                      <CloseIcon />{" "}
                    </IconButton>
                  ) : (
                    <IconButton style={{ backgroundColor: '#388e3c', marginRight: '.5rem', color: 'white' }} aria-label="upload picture" component="span">
                      <DoneIcon />
                    </IconButton>
                  )}
                  {"Test Case : " + e.index}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Submit;
