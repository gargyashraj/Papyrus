import * as React from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  // CardMedia,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const face = new Map();

face.set("N+", <SentimentVeryDissatisfiedRoundedIcon fontSize="small" />);
face.set("N", <SentimentDissatisfiedRoundedIcon fontSize="small" />);
face.set("NONE", <SentimentNeutralIcon fontSize="small" />);
face.set("P", <SentimentSatisfiedRoundedIcon fontSize="small" />);
face.set("P+", <SentimentVerySatisfiedRoundedIcon fontSize="small" />);

function Note(props) {
  const { id, title, body, date, sentiment } = props;
  const navigate = useNavigate();

  function htmlToText(html) {
    var temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
  }

  const handleEdit = (id) => {
    console.log("hello", id);
    const key = id.slice(6);

    navigate(`/edit/${key}`);
  };
  const handleDelete = (id) => {
    console.log("delete", id);
    const key = id.slice(6);
    axios
      .delete(`http://localhost:8080/api/getNote/${key}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        console.log("delete success!");
      })
      .then(() => (window.location = "/"))
      .catch((err) => console.log(err));
  };

  return (
    <Grid item xs={8} md={4}>
      <Card variant="outlined" sx={{ maxWidth: 410 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={() => handleDelete(id)}>
              <DeleteForeverIcon sx={{ color: "red" }} />
            </IconButton>
          }
          subheaderTypographyProps={{ variant: "overline" }}
          title={title}
          subheader={
            <div>
              {date} ..............................................
              {face.get(sentiment)}
            </div>
          }
          titleTypographyProps={{ variant: "h6" }}
        />

        <CardActionArea onClick={() => handleEdit(id)}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="subtitle1" paragraph className="note-body">
              {htmlToText(body)}
            </Typography>
          </CardContent>
          {/* <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={image}
            alt={imageLabel}
          /> */}
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default Note;
