import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import EnhancedTable from './VideoList';
import VideoTable from './VideoList';
import { ChannelContext } from '../Channel';
import EditAccordian from './EditAccordian';
import { createContext } from 'react';
import PlaylistList from './PlaylistList';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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



function createData(id, file, title, date, views, comments, likes) {
  return {
    id,
    file,
    title,
    date,
    views,
    comments,
    likes
  };
}

function createPlayData(id, file, title, date, videos) {
  return {
    id,
    file,
    title,
    date,
    videos
  };
}


export const TabsContext = createContext();

export default function CustomTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const { themeToggler } = React.useContext(AppContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [rows, setRows] = React.useState([])
  const [playRows, setPlayRows] = React.useState([])
  const { channelVideos, playLists } = React.useContext(ChannelContext)

  const [expanded, setExpanded] = React.useState(false);
  const [expandVideoId, setExpandVideoId] = React.useState('')
  const [onEdit, setOnEdit] = React.useState(false)

  const handleChangePnnel = (panel) => {
    setExpanded(panel);
  };



  const getRows = () => {
    var TableRows = [];
    channelVideos.forEach(async (element) => {
      TableRows.push(createData(
        element._id,
        '',
        element.headerTitle,
        element.createAt.split('T')[0],
        0,
        0,
        0
      ))
    });
    setRows(TableRows)

    var arr = [];
    console.log(playLists);
    playLists.forEach( async (element) => {
      arr.push({
        id : element._id,
        file : element.playListImg,
        title : element.name,
        date : element.createdAt.toString().split('T')[0],
        videos : element.videoCount
      })
     
    });

    setPlayRows(arr);


  }

  React.useEffect(() => {
    getRows();

  }, [])


  return (
    <TabsContext.Provider value={{
      expanded,
      handleChangePnnel,
      expandVideoId,
      setExpandVideoId,
      onEdit,
      setOnEdit,
      setRows
    }}>
      <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
        <Tab label="Videos" sx={{ color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor }} />
        <Tab label="Courses" sx={{ color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor }} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <EditAccordian />
          <VideoTable rows={rows} setRows={setRows} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PlaylistList rows={playRows} setRows={setPlayRows}/>
        </TabPanel>
      </SwipeableViews>
    </TabsContext.Provider>
  );
}