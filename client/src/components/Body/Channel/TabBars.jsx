import React, { useContext , useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { AppContext } from "../../../App";
import { Theme } from "../../Theme";

import { ChannelContext } from './Channel'
import { useParams } from "react-router-dom";


import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import FeaturedPlayListRoundedIcon from '@mui/icons-material/FeaturedPlayListRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';

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

  const {user_id} = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { themeToggler , rootUser } = useContext(AppContext);
  const {page, setPage} = useContext(ChannelContext)

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        
        <Tab
          label="Videos"
          icon={<OndemandVideoRoundedIcon color="primary"/>}
          className="min"
          wrapped={true}
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            display:'flex'
          }}
          onClick={()=>setPage('Videos')}
        >
          
        </Tab>
        
        
        <Tab
          label="Courses"
          icon={<FeaturedPlayListRoundedIcon color='primary'/>}
          className="min"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setPage('PlayLists')}
        />
        
        <Tab
          label="Channels"
          icon={<AccountTreeRoundedIcon color='primary'/>}
          className="min"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setPage('Channels')}
        />
        <Tab
          label="About"
          className="min"
          icon={<ArticleRoundedIcon color='primary'/>}
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}
          onClick={()=>setPage('About')}
        />
        {
          user_id !== rootUser._id ? null :
          <Tab
            label="Library"
            className="min"
            icon={<VideoLibraryRoundedIcon color='primary'/>}
            style={{
              color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            }}
            onClick={()=>setPage('Library')}
          />
        }
      </Tabs>
    </Box>
  );
}
