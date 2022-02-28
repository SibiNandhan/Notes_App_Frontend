import { Box, Stack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AddNote } from "../component/AddNote";
import { NotesComponent } from "../component/NotesComponent";
import { Note } from "./../NotesContext";
export const Notes = () => {
  const { notes, setNotes, setUser } = useContext(Note);
  const user = JSON.parse(localStorage.getItem("Notes_User"));

  const [noteToUpdate, setNoteToUpdate] = useState({});

  useEffect(() => {
    function getAndSetNotesFromDB() {
      setUser(user);
      fetch("https://notes--app--backend.herokuapp.com/api/v1/note/getnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((notes) => setNotes(notes.notes))
        .catch((err) => console.log(err));
    }
    getAndSetNotesFromDB();
  }, [notes]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AddNote
        noteToUpdate={noteToUpdate}
        setNoteToUpdate={setNoteToUpdate}
      ></AddNote>
      <Stack spacing="24px">
        <Box>
          {notes.map((note) => {
            return (
              <NotesComponent
                key={note._id}
                note={note}
                setNoteToUpdate={setNoteToUpdate}
                noteToUpdate={noteToUpdate}
              ></NotesComponent>
            );
          })}
        </Box>
      </Stack>
    </>
  );
};
