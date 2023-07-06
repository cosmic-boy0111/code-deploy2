import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { AppContext } from "../../../App";
import Button from "@mui/material/Button";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { Theme } from "../../Theme";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FileSelector from "./FileSelector";
import { BlogContext } from "./Blog";
import { toast } from "react-toastify";
import LinearProgress from '../../Shared/LinearProgress'
import axios from "axios";
import RichTectEditor from "./RichTextEditor";
import Editor from "./Editor";

export default function TemporaryDrawer() {
  const { themeToggler, rootUser, setRootUser, toggle, setToggle, blogData, setBlogData, isEdit, blogs, setBlogs } = useContext(AppContext);

  const [tit, setTit] = useState(false)

  const [underSubmit, setUnderSubmit] = useState(false)

  const onChangeHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'headerTitle') {
      setTit(false);
    }

    setBlogData({ ...blogData, [name]: value })
  }

  const createBlog = async () => {
    if (blogData.headerTitle === '') {
      setTit(true)
      return;
    }

    try {
      setUnderSubmit(true);
      const res = await fetch('/createBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          headerTitle: blogData.headerTitle,
          // file : blogData.file,
          description: blogData.description,
          userId: rootUser._id,
          likeCount: 0
        })
      })

      //   const res3 = await fetch('/getAllFieldGraph',{
      //     method : 'GET',
      //     headers : {
      //         'Content-Type' : 'application/json'
      //     }
      // })

      // const data3 = await res3.json();

      //   const res2 = await fetch(`/incAllFieldGraph/${0}/${data3.data}`,{
      //     method : 'GET',
      //     headers : {
      //       'Content-Type' : 'application/json'
      //     }
      //   })
      //   const data2 = await res2.json();
      //   console.log(data2);

      const data = await res.json();

      // const formData = new FormData()
      // formData.append('file', blogData.file)
      // console.log('before axios');
      // axios.post(`/addBlogFile/${data._id}`, formData, {
      // }).then(res => {

      // })

      // console.log(blogData.file.type.split('/'));

      if(blogData.file !== ''){
        const formData = new FormData()
        formData.append('file', blogData.file)
        formData.append('type', blogData.file.type.split('/')[0]);
        formData.append('id', data._id);
        const response = await fetch('/addBlogFile', {
          method: 'POST',
          body: formData
        });
      }

      setBlogs([data,...blogs])
      console.log([...blogs, data]);
      setToggle(false)
      // console.log(data);

      toast.success('post created')
      const resUser = await fetch('/increaseBlog',{
        method : 'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })

      const userGraphRes = await fetch(`/increaseUserBlog/${rootUser._id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setUnderSubmit(false);

    } catch (error) {
      toast.error('post not created')
      console.log(error);
    }

  }


  const editBlog = async () => {
    if (blogData.headerTitle === '') {
      setTit(true)
      return;
    }

    console.log(blogData);
    // return;


    try {
      setUnderSubmit(true);

      const res = await fetch('/updateBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: blogData.id,
          headerTitle: blogData.headerTitle,
          // file : blogData.file,
          description: blogData.description,
          userId: rootUser._id,
          likeCount: blogData.likeCount
        })
      })


      if(blogData.file){
        console.log('under blog update', blogData.file);
        const formData = new FormData()
        formData.append('file', blogData.file)
        formData.append('type', blogData.file.type.split('/')[0]);
        formData.append('id', blogData.id);
        const response = await fetch('/updateBlogFile', {
          method: 'POST',
          body: formData
        });
      }

      // const formData = new FormData()
      // formData.append('file', blogData.file)
      // console.log('before axios');
      // axios.post(`/updateBlogFile/${blogData.id}`, formData, {
      // }).then(res => {

      // })





      if (res.status === 200) {
        setBlogs((pre) => {
          const newData = pre.filter((e) => {
            return e._id !== blogData.id;
          })
          return [{
            _id: blogData.id,
            headerTitle: blogData.headerTitle,
            description: blogData.description,
            userId: rootUser._id,
          }, ...newData]
        })
        toast.success('post updated')
      } else {
        toast.error('post not updated')
      }
      setUnderSubmit(false);
      setToggle(false);

    } catch (error) {
      console.log(error);
    }

  }


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
                {" "}
                {isEdit ? "UPDATE" : "CREATE"} POST{" "}
              </h2>
              <div className="blog_form">

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
                    name="headerTitle"
                    value={blogData.headerTitle}
                    onChange={onChangeHandler}
                    style={{
                      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                      boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                    }}
                  />
                </div>

                {/* <div class="mb-3">
                  <label
                    for="description"
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
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={1}
                    maxRows={1}
                    name="headerTitle"
                    value={blogData.headerTitle}
                    onChange={onChangeHandler}
                    class="form-control"
                    style={{
                      backgroundColor: themeToggler
                        ? Theme.Dark.boxColor
                        : Theme.Light.boxColor,
                      color: themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                      boxShadow: themeToggler
                        ? Theme.Dark.BoxShadow
                        : Theme.Light.BoxShadow,
                      border: themeToggler
                        ? Theme.Dark.Border
                        : Theme.Light.Border,
                    }}
                  />
                </div> */}
                <div class="mb-3">
                  <label for="title" class="form-label">
                    Select File
                  </label>
                  <FileSelector />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    Description
                  </label>
                  {/* <Editor /> */}
                  <RichTectEditor blogData={blogData} setBlogData={setBlogData} />
                  {/* <TextareaAutosize
                    aria-label="minimum height"
                    minRows={6}
                    placeholder="Add description ...."
                    name="description"
                    value={blogData.description}
                    onChange={onChangeHandler}
                    class="form-control"
                    style={{
                      backgroundColor: themeToggler
                        ? Theme.Dark.boxColor
                        : Theme.Light.boxColor,
                      color: themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                      boxShadow: themeToggler
                        ? Theme.Dark.BoxShadow
                        : Theme.Light.BoxShadow,
                      border: themeToggler
                        ? Theme.Dark.Border
                        : Theme.Light.Border,
                    }}
                  /> */}
                </div>
              </div>
            </div>
            {
              underSubmit ? <LinearProgress /> : null
            }
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
                <Button variant="contained" onClick={isEdit ? editBlog : createBlog} >  submit</Button>
              </div>

            </footer>

          </section>
        </Drawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}
