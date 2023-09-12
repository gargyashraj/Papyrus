import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import { TextField, Container, Button, Box, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const AddNote = () => {
  const { key } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      const bd = editorRef.current.getContent();
      console.log(bd.replace(/<[^>]+>/g, ""));
      // setBody();
    }
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    axios
      .get(`/api/getNote/${key}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setTitle(res.data[0].title);
        setBody(res.data[0].body);
        setDate(res.data[0].date);
      })
      .then(() => console.log("note info fetched!"))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function submit(e) {
    e.preventDefault();

    const newBody = editorRef.current.getContent();

    title
      ? axios
          .post(
            `https://api.meaningcloud.com/sentiment-2.1?key=${SENTIMENT_KEY}` +
              JSON.stringify(newBody)
          )
          .then(({ data: { score_tag } }) => {
            console.log("->>>>", score_tag);
            const data = {
              title: title.toUpperCase(),
              body: newBody,
              user: user,
              sentiment: score_tag,
              //type: type,
            };
            return data;
          })
          .then((data) => {
            fetch("/api/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify(data),
            });
          })
          .then(() => {
            console.log("new note request sent");
            window.location = "/";
          })

          .catch((err) => console.log(err))
      : window.alert("Empty Fields :(");
  }
  function edit(e) {
    e.preventDefault();
    const newBody = editorRef.current.getContent();

    axios
      .post(
        `https://api.meaningcloud.com/sentiment-2.1?key=${SENTIMENT_KEY}` +
          JSON.stringify(newBody)
      )
      .then(({ data: { score_tag } }) => {
        const data = {
          title: title.toUpperCase(),
          body: newBody,
          date: date,
          sentiment: score_tag,
        };
        return data;
      })
      .then((data) => {
        fetch(`/api/getNote/${key}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        });
      })
      .then(() => {
        console.log("update note request sent");
        window.location = "/";
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", justifyContent: "space-between" },
        }}
      >
        <Box my={2}>
          {key ? (
            <Chip
              icon={<EditIcon />}
              sx={{ fontFamily: "Sans-serif" }}
              label="Edit Note"
            />
          ) : (
            <Chip
              sx={{ fontFamily: "Sans-serif" }}
              icon={<AddIcon />}
              label="Create Note"
            />
          )}
        </Box>
        <Button
          sx={{ marginY: 2 }}
          variant="contained"
          color="primary"
          type="button"
          onClick={(e) => {
            log();
            key ? edit(e) : submit(e);
          }}
        >
          Save
        </Button>
      </Box>
      <main>
        <Box>
          <TextField
            //required
            fullWidth
            label="Title"
            value={title}
            defaultValue={title}
            onChange={onChangeTitle}
            placeholder="..."
            sx={{ marginY: 2 }}
          />
          <Editor
            apiKey=EDITOR_KEY
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={body}
            init={{
              height: 450,
              menubar: false,
              plugins: [
                "a11ychecker",
                "advlist",
                "advcode",
                "advtable",
                "autolink",
                "checklist",
                "export",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "powerpaste",
                "fullscreen",
                "formatpainter",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | casechange blocks | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Box>
      </main>
    </Container>
  );
};
export default AddNote;
