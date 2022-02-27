import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import NotesContext from "./NotesContext";

ReactDOM.render(
  <ChakraProvider>
    <NotesContext>
      <App />
    </NotesContext>
  </ChakraProvider>,
  document.getElementById("root")
);
