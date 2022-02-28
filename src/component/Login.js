import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const toast = useToast();
  const history = useHistory();

  const changeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const submitHandler = async () => {
    const UserLogin = await fetch(
      "https://notes--app--backend.herokuapp.com/api/v1/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...details,
        }),
      }
    ).then((res) => res.json());
    if (UserLogin.status !== "success") {
      return toast({
        title: `${UserLogin.error}`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    toast({
      title: "Login Successfull",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    localStorage.setItem("Notes_User", JSON.stringify(UserLogin));
    history.push("/notes");
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Enter Email Address</FormLabel>
        <Input
          type="text"
          name="email"
          onChange={changeHandler}
          value={details.email}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          name="password"
          onChange={changeHandler}
          value={details.password}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Submit
      </Button>
    </VStack>
  );
};
