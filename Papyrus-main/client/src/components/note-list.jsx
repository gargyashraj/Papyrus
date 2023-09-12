import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, CssBaseline, Container, Box, Fab } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import Note from "./note";
import NoNote from "./no-note";
import Sidebar from "./sidebar";

import moment from "moment";

const axios = require("axios");

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [date, setDate] = useState(new Date());
  const [vn, setVn] = useState(0);
  const [n, setN] = useState(0);
  const [neu, setNeu] = useState(0);
  const [p, setP] = useState(0);
  const [vp, setVp] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/getNote/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNotes(res.data);
        setFilteredNotes(res.data);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isFiltered) {
      const _notes = notes.filter((note) => {
        console.log(note.date, moment(date).format("D/M/yyyy"));
        return note.date === moment(date).format("D/M/yyyy");
      });
      setFilteredNotes(_notes);
    } else {
      setFilteredNotes(notes);
    }
    // eslint-disable-next-line
  }, [date, isFiltered]);

  useEffect(() => {
    setN(0);
    setVn(0);
    setNeu(0);
    setP(0);
    setVp(0);

    for (let x in filteredNotes) {
      if (filteredNotes[x].sentiment === "N+") setVn((vn) => vn + 1);
      else if (filteredNotes[x].sentiment === "N") setN((n) => n + 1);
      else if (filteredNotes[x].sentiment === "P") setP((p) => p + 1);
      else if (filteredNotes[x].sentiment === "P+") setVp((vp) => vp + 1);
      else setNeu((neu) => neu + 1);
    }
    // eslint-disable-next-line
  }, [filteredNotes, isFiltered]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ display: "flex" }}>
          <Grid
            container
            spacing={4}
            sx={{ mt: 1, mx: "auto", display: "flex" }}
          >
            {filteredNotes.length === 0 ? (
              <NoNote />
            ) : (
              filteredNotes.map(({ _key, _id, title, ...rest }) => (
                <Note
                  key={_key}
                  id={_id}
                  title={title <= 20 ? title : title}
                  {...rest}
                />
              ))
            )}
          </Grid>

          <Sidebar
            p={p}
            n={n}
            vn={vn}
            vp={vp}
            neu={neu}
            date={date}
            setDate={setDate}
            setIsFiltered={setIsFiltered}
          />

          <Fab
            sx={{
              position: "sticky",
              top: "90%",
              right: "2%",
              width: "70px",
            }}
            aria-label="Add"
            color="primary"
            onClick={() => navigate("/create")}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </>
  );
}
