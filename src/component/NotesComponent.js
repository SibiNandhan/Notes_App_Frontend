import React, { useContext } from "react";
import { Container, Text, Box, Button, useToast } from "@chakra-ui/react";
import { Note } from "./../NotesContext";

export const NotesComponent = ({ note, setNoteToUpdate, noteToUpdate }) => {
  const { notesContent, notesHeading, _id } = note;
  const { user, notes, setNotes } = useContext(Note);
  const toast = useToast();

  const deleteHandler = async () => {
    await fetch("http://localhost:4000/api/v1/note/deletenote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        noteId: _id,
      }),
    })
      .then(() => {
        setNotes(notes.filter((note) => note._id !== _id));
        return toast({
          title: "Deleted Successfull",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((err) =>
        toast({
          title: `${err.message}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
      );
  };

  const updateHandler = async () => {
    setNoteToUpdate(note);
  };
  return (
    <div>
      <Container maxW="xl">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Text p="10px" fontFamily={"mono"} fontSize="2xl">
            {notesHeading}
          </Text>
          <Text p="10px">{notesContent}</Text>
          <Button p="10px" m="10px" onClick={updateHandler}>
            Update
          </Button>
          {noteToUpdate._id && _id === noteToUpdate._id ? (
            <Text style={{ fontSize: "25px" }}>You Can Update In Top</Text>
          ) : (
            <Button p="10px" onClick={deleteHandler}>
              Delete
            </Button>
          )}
        </Box>
      </Container>
    </div>
  );
};
