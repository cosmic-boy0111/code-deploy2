import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import { Theme } from "../../../Theme";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ProfileContext } from "../Profile";
import empty from "../../../../images/assets/alien.svg";
import FollowList from "./FollowList";

import { useParams } from "react-router-dom";

import FollowerSkeleton from "./InfoSkeleton/FollowerSkeleton";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Followers = () => {

  const { themeToggler } = useContext(AppContext);

  const [followList, setFollowList] = useState([]);

  const [loader, setLoader] = useState(false)

  const {id} = useParams();

  const getFollowers = async() =>{
    try {
      setLoader(true)
      const res = await fetch(`/getFollowers/${id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const list = await res.json();

      setFollowList(list);
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowers();
  }, [])
  

  return (
    <Item
      className="card_container"
      style={{
        boxShadow: "none",
        backgroundColor: "transparent",
        color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        textAlign: "initial",
        border: "none",
      }}
    >
      {
        loader ? <FollowerSkeleton /> : followList.length === 0 ? <div
        className="empty_container"
        style={{
          display: "flex",
          padding: "1rem",
        }}
      >
        <h4> No Followers Yet </h4>
        <img src={empty} alt="" srcset="" className="empty_img" />
      </div> :  <FollowList data={followList} />
      }
      
     
     
    </Item>
  );
};

export default Followers;
