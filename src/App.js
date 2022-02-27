import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./component/header";
import { Home } from "./pages/Home";
import { Notes } from "./pages/Notes";
import { useContext } from "react";
import { Note } from "./NotesContext";

function App() {
  const { user } = useContext(Note);
  return (
    <Router>
      <Header></Header>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/notes" exact>
        {user !== "" ? <Notes></Notes> : <h1>Login to Continue</h1>}
      </Route>
    </Router>
  );
}

export default App;
