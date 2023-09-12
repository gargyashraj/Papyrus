import NoteList from "./components/note-list";

import AddNote from "./components/add-note";
import Navbar from "./components/navbar";
import Error404 from "./components/error404";
import Login from "./components/login";
import Signup from "./components/signup";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import theme from "./theme";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/create" element={<AddNote />} />
          <Route path="/edit/:key" element={<AddNote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
