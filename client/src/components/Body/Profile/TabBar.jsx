import React, { useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { AppContext } from "../../../App";
import { Theme } from "../../Theme";
import { ProfileContext } from "./Profile";

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  // return {
  //   id: `simple-tab-${index}`,
  //   'aria-controls': `simple-tabpanel-${index}`,
  // };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { themeToggler , rootUser } = useContext(AppContext);
  const {setSwitch} = useContext(ProfileContext)

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        
        <Tab
          label="Profile"
          icon={<AccountCircleRoundedIcon  color='primary'/>}
          className="min"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setSwitch('Profile')}
        />
        
        
        <Tab
          label="Posts"
          icon={<PostAddRoundedIcon color='primary'/>}
          className="min"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setSwitch('Posts')}
        />

        <Tab
          label="Courses"
          icon={<BookmarkAddedRoundedIcon color='primary'/>}
          className="min"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setSwitch('Courses')}
        />
        
        <Tab
          label="Problems"
          icon={<CodeRoundedIcon color='primary'/>}
          className="min"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setSwitch('Problems')}
        />
        <Tab
          label="Followers"
          icon={<PeopleAltRoundedIcon color='primary'/>}
          className="min"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setSwitch('Followers')}
        />
      </Tabs>
    </Box>
  );
}
