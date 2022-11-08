import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TopNavBar from '../components/navBar/TopNavBar.js';
import ChangePassword from "../components/navBar/ChangePassword.js"
import DeleteAccount from '../components/navBar/DeleteAccount.js';
import QuestionHistory from '../components/QuestionHistory.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function AccountSettings() {
  const [value, setValue] = React.useState(0);
  const [isValidUser, setIsValidUser] = React.useState(false);

  React.useEffect(() => {
    if (document.cookie.split('; ').find((row) => row.startsWith('authToken=')) != null) {
      console.log("document cookie is not null");
      console.log(JSON.stringify(document.cookie));
      setIsValidUser(true);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isValidUser) {
    return (
      <h1>Page not found</h1>
    );
  } else {
    return (
      <>
        <TopNavBar />
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Update/Change Password" {...a11yProps(0)} />
            <Tab label="Delete Account" {...a11yProps(1)} />
            <Tab label="Question History" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0} >
            <ChangePassword />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DeleteAccount />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <QuestionHistory />
          </TabPanel>
        </Box>
      </>
    );
  }
}