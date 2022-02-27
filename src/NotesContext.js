import React, { createContext, useState } from "react";

export const Note = createContext();

const NotesContext = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const val = JSON.parse(localStorage.getItem("Notes_User"));
  const [user, setUser] = useState(val);

  return (
    <Note.Provider
      value={{
        notes,
        setNotes,
        user,
        setUser,
      }}
    >
      {children}
    </Note.Provider>
  );
};

export default NotesContext;
