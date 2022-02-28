import { Button, Input, Box, Center, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Note } from "./../NotesContext";

export const AddNote = ({ noteToUpdate, setNoteToUpdate }) => {
  const { notes, setNotes, user } = useContext(Note);

  const [createNote, setCreateNote] = useState({
    notesContent: "",
    notesHeading: "",
    _id: "",
  });

  useEffect(() => {
    setCreateNote({ ...noteToUpdate });
  }, [noteToUpdate]);

  const toast = useToast();
  const handleChange = (e) => {
    setCreateNote({ ...createNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!createNote.notesContent || !createNote.notesHeading) {
      return toast({
        title: `Enter Title and Content`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    await fetch(
      "https://notes--app--backend.herokuapp.com/api/v1/note/createnote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...createNote,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        createNote.notesContent = "";
        createNote.notesHeading = "";
        setNotes([...notes, res.notes]);
      })
      .catch((err) => {
        return toast({
          title: `${err.message}`,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
    return toast({
      title: "Notes Added",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const updateHandler = async () => {
    window.scrollTo(0, 0);
    if (
      !createNote._id ||
      !createNote.notesContent ||
      !createNote.notesHeading
    ) {
      return toast({
        title: `Enter Title and Content`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    await fetch(
      "https://notes--app--backend.herokuapp.com/api/v1/note/updatenote",
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...createNote,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast({
            title: `Update Successfull`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setCreateNote({});
          const note = notes.filter((note) => note._id !== noteToUpdate._id);

          setNotes([...note, noteToUpdate]);

          setNoteToUpdate({});
        }
      });
  };
  return (
    <div>
      <Center>
        <Box
          w="90%"
          align="center"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Input
            focusBorderColor="crimson"
            placeholder="Title"
            m="15px"
            padding="20px"
            width="50%"
            name="notesHeading"
            value={createNote.notesHeading ?? ""}
            onChange={handleChange}
          ></Input>
          <Input
            focusBorderColor="crimson"
            placeholder="Content"
            m="15px"
            width="50%"
            padding="35px"
            name="notesContent"
            value={createNote.notesContent ?? ""}
            onChange={handleChange}
          ></Input>
          {noteToUpdate._id ? (
            <Button align="center" p="25px" onClick={updateHandler}>
              Update Note
            </Button>
          ) : (
            <Button align="center" p="25px" onClick={handleSubmit}>
              Add Note
            </Button>
          )}
        </Box>
      </Center>
    </div>
  );
};
