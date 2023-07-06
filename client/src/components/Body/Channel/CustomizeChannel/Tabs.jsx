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
import EditAbout from './EditAbout';
import EditChannels from './EditChannels';




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


export default function CustomTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const {themeToggler} = React.useContext(AppContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
    <Tabs   value={value} onChange={handleChange} aria-label="disabled tabs example">
      <Tab label="About" sx={{ color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor }}  />
      <Tab label="Channels" sx={{ color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor }}  />
    </Tabs>
    <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <EditAbout />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <EditChannels />
        </TabPanel>
      </SwipeableViews>
    </>
  );
}