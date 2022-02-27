import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Container,
  Text,
} from "@chakra-ui/react";
import { Login } from "../component/Login";
import { Signup } from "../component/Signup";

export const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="sans-serif" color="black">
          Notes-App
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={5}
        borderRadius="lg"
        textColor="black"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <Signup></Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
