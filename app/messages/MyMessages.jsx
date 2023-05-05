'use client'

import Container from "@/components/Container";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const MyMessages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [value, setValue] = useState('1');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }

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

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="Item Three" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Item One</TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
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