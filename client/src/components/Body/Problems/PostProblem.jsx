import React, { useContext, useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AppContext } from "../../../App";
import { CppContext } from "./ProblemPage";
import Button from "@mui/material/Button";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import TestCases from "./TestCases";
import Tag from "./Tag";
import { tags } from "./Tags";
import { diff } from "./Tags";
import { toast } from "react-toastify";
import { Theme } from "../../Theme";
export default function TemporaryDrawer() {
  const { rootUser, themeToggler } = useContext(AppContext);
  const {
    problems,
    setProblems,
    setRows,
    toggle,
    setToggle,
    problem,
    setProblem,
    tag,
    setTag,
    difficulty,
    setDifficulty,
    case1,
    case2,
    case3,
    setCase1,
    setCase2,
    setCase3,
  } = useContext(CppContext);

  const [tit, setTit] = useState(false);
  const [dec, setDec] = useState(false);
  const [tg, setTg] = useState(false);
  const [df, setDf] = useState(false);

  const getDiff = (diff) => {
    if (diff === "Easy") {
      return 0;
    } else if (diff === "Medium") {
      return 1;
    }

    return 2;
  };

  const submitForm = async (event) => {
    console.log(case1, case2, case3);
    // return
    console.log(problem, tag, difficulty);
    var check = false;
    if (problem.title === "") {
      setTit(true);
      check = true;
    }
    if (problem.description === "") {
      setDec(true);
      check = true;
    }
    if (tag.length === 0) {
      setTg(true);
      check = true;
    }
    if (difficulty.length === 0) {
      setDf(true);
      check = true;
    }

    if (check) {
      return;
    }

    console.log("hello world");
    try {
      const res = await fetch("/addProblem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: problem.title,
          description: problem.description,
          mainTag: tag[0],
          subTags: tag.slice(1),
          difficulty: getDiff(difficulty[0]),
          testCases: [case1, case2, case3],
          owner: rootUser,
        }),
      });

      const Data = await res.json();
      setProblems([...problems, Data]);
      setRows((pre) => {
        return [Data, ...pre];
      });

      const resUser = await fetch('/increaseProblem',{
        method : 'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })

      const userGraphRes = await fetch(`/increaseUserProblem/${rootUser._id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // toggleDrawer3('right', false)

      setProblem({
        id: "",
        title: "",
        description: "",
      });
      setTag([]);
      setDifficulty([]);

      setCase1({
        input: "",
        output: "",
      });
      setCase2({
        input: "",
        output: "",
      });
      setCase3({
        input: "",
        output: "",
      });
      // setTestCases([{},{},{}])

      toast.success("Problem Added", {
        style: {
          backgroundClip: "green",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    var name = e.target.name;
    var value = e.target.value;

    if (name === "title") {
      setTit(false);
    }
    if (name === "description") {
      setDec(false);
    }

    setProblem({ ...problem, [name]: value });
  };

  const updateProblem = async () => {
    console.log(case1, case2, case3);
    // return
    console.log(problem, tag, difficulty);
    var check = false;
    if (problem.title === "") {
      setTit(true);
      check = true;
    }
    if (problem.description === "") {
      setDec(true);
      check = true;
    }
    if (tag.length === 0) {
      setTg(true);
      check = true;
    }
    if (difficulty.length === 0) {
      setDf(true);
      check = true;
    }

    if (check) {
      return;
    }

    try {
      const res = await fetch("/updateProblem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: problem.id,
          title: problem.title,
          description: problem.description,
          mainTag: tag[0],
          subTags: tag.slice(1),
          difficulty: getDiff(difficulty[0]),
          testCases: [case1, case2, case3],
        }),
      });

      const Data = await res.json();

      console.log(Data);

      if (res.status === 200) {
        toast.success("Updated Successfully");

        setProblems((pre) => {
          var filterProblems = pre.filter((e) => {
            return e._id !== problem.id;
          });
          return [...filterProblems, Data];
        });
        setRows((pre) => {
          var filterProblems = pre.filter((e) => {
            return e._id !== problem.id;
          });
          return [Data, ...filterProblems];
        });

        setToggle(false);
      } else {
        toast.error("Update Failed");
      }
    } catch (error) {
      toast.error("Update Failed");
      console.log(error);
    }
  };

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
          <section className="create_blog">
            <div
              className="create_blog_body"
              style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.BodyBackgroundColor
                  : Theme.Light.BodyBackgroundColor,
                color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
              }}
            >
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
                POST PROBLEM{" "}
              </h2>
              <form className="blog_form">
                <div class="mb-3">
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
                    Title{" "}
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
                    name="title"
                    value={problem.title}
                    onChange={handleChange}
                    style={{
                          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                        }}
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="description"
                    class="form-label"
                    style={{
                      color: dec
                        ? "#f50057"
                        : themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                    }}
                  >
                    Description{" "}
                    <span
                      className="Red"
                      style={{
                        display: dec ? "inline" : "none",
                      }}
                    >
                      Required
                    </span>
                  </label>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    placeholder="Add description ...."
                    name="description"
                    value={problem.description}
                    onChange={handleChange}
                    class="form-control"
                    style={{
                          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border

                        }}
                  />
                </div>
                <div className="selector">
                  <div class="mb-2 selector_field">
                    <label
                      for="description"
                      class="form-label"
                      style={{
                        color: tg
                          ? "#f50057"
                          : themeToggler
                          ? Theme.Dark.Color
                          : Theme.Light.Color,
                      }}
                    >
                      Tags{" "}
                      <span
                        className="Red"
                        style={{
                          display: tg ? "inline" : "none",
                        }}
                      >
                        Required
                      </span>
                    </label>
                    <Tag
                      tags={tags}
                      value={tag}
                      setValue={setTag}
                      multi={true}
                      setErr={setTg}
                    />
                    <div id="emailHelp" class="form-text" style={{
                      color : themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                    }}>
                      First select main Tag, and then related Tags
                    </div>
                  </div>
                  <div class="mb-3 selector_field">
                    <label
                      for="description"
                      class="form-label"
                      style={{
                        color: df
                          ? "#f50057"
                          : themeToggler
                          ? Theme.Dark.Color
                          : Theme.Light.Color,
                      }}
                    >
                      Difficulty{" "}
                      <span
                        className="Red"
                        style={{
                          display: df ? "inline" : "none",
                        }}
                      >
                        {" "}
                        Required
                      </span>
                    </label>
                    <Tag
                      tags={diff}
                      value={difficulty}
                      setValue={setDifficulty}
                      multi={false}
                      setErr={setDf}
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Test Cases</label>
                  <TestCases
                    case1={case1}
                    case2={case2}
                    case3={case3}
                    setCase1={setCase1}
                    setCase2={setCase2}
                    setCase3={setCase3}
                  />
                </div>
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
                <Button
                  variant="contained"
                  onClick={problem.id === "" ? submitForm : updateProblem}
                >
                  submit
                </Button>
              </div>
            </footer>
          </section>
        </Drawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}
