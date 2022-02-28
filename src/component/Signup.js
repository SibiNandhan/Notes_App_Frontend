import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const [details, setDetails] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const history = useHistory();

  const changeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const submitHandler = async () => {
    if (
      !details.email ||
      !details.password ||
      !details.confirmPassword ||
      !details.name
    ) {
      return toast({
        title: `Enter all the Fields`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    if (details.confirmPassword !== details.password) {
      return toast({
        title: `Password and Confirm Password Should be Same`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    const UserSignUp = await fetch(
      "https://notes--app--backend.herokuapp.com/api/v1/user/signup",
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

    if (UserSignUp.status !== "success") {
      return toast({
        title: `${UserSignUp.error}`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    localStorage.setItem("Notes_User", JSON.stringify(UserSignUp));
    history.push("/notes");
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel spacing="10px">Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={changeHandler}
          name="name"
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          placeholder="Enter your Email Address"
          name="email"
          onChange={changeHandler}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Enter password"
          name="password"
          onChange={changeHandler}
        ></Input>
      </FormControl>
      <FormControl id="passwordConfirm" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={changeHandler}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
