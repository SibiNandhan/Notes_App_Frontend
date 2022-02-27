import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();
  const [historyState] = useState(history.location.pathname);

  const logOutHandler = () => {
    localStorage.removeItem("Notes_User");
    history.push("/");
  };

  return (
    <div>
      <Stack>
        <Box
          maxW="100%"
          backgroundColor="#FFD32D"
          padding="1%"
          marginBottom="5px"
        >
          <Text fontSize="25px">Notes App</Text>

          {historyState === "/notes" && history.location.pathname !== "/" ? (
            <Button marginLeft="80%" onClick={logOutHandler}>
              Log Out
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Stack>
    </div>
  );
};
