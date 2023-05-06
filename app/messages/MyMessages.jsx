'use client'

import Container from "@/components/Container";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
          <div>{children}</div>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyMessages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [value, setValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container bground>
      <div className="w-full flex bg-white">
        <div className="w-1/3 flex flex-col">
          <form className="relative w-full p-5">
            <input 
              type="text"
              value={searchTerm}
              onChange={() => {}}
              placeholder="Search messages"
              className="w-full flex justify-start items-center pl-10 bg-gray-100 p-2 rounded-md" 
            />
            <MagnifyingGlassIcon className="absolute top-7 left-7 w-6 h-6" />           
          </form>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} variant="fullWidth" centered onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Inbox" {...a11yProps(0)} className="focus:bg-black focus:text-white" />
                <Tab label="Saved" {...a11yProps(1)} className="focus:bg-black focus:text-white" />
                <Tab label="Questions" {...a11yProps(2)} className="focus:bg-black focus:text-white" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              First message
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </div>
        <div>
          Messages
        </div>
      </div>
    </Container>
  );
}

export default MyMessages;