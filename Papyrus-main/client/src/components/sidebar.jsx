import React, { useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
  Box,
  SwipeableDrawer,
  Toolbar,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";

import FunctionsIcon from "@mui/icons-material/Functions";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DatePicker from "./datePicker";

const hdate = require("human-date");

export default function Sidebar({
  p,
  n,
  vn,
  vp,
  neu,
  window,
  date,
  setDate,
  setIsFiltered,
}) {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const currDate = new Date(Date.now()).toLocaleString().split(",")[0];

  const DatePickerArea = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const bar = (
    <Box
      sx={{ width: 259, marginLeft: 4, position: "fixed" }}
      role="presentation"
      onClick={() => setToggleDrawer(true)}
      onKeyDown={() => setToggleDrawer(false)}
    >
      <Grid item xs={12} md={4}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "grey.200",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Divider>Filter by Date</Divider>
          <br />
          <Button
            onClick={() => {
              setIsFiltered(false);
            }}
            color="error"
            size="small"
            variant="outlined"
            sx={{ margin: "auto" }}
            startIcon={<ClearAllIcon />}
          >
            Clear Filter
          </Button>
          <br />
          <DatePickerArea>
            <DatePicker
              value={date}
              setValue={setDate}
              setIsFiltered={setIsFiltered}
            />
          </DatePickerArea>
          <Typography align="center">{hdate.prettyPrint(currDate)}</Typography>

          <br />
          <Divider>Sentiment Data</Divider>
          <br />
          <div>
            <div>
              <Chip
                size="small"
                sx={{ mx: "2px" }}
                icon={<SentimentVeryDissatisfiedRoundedIcon />}
                label={` || ${vn}  Very Negative Record`}
              />
            </div>
            <div>
              <Chip
                size="small"
                sx={{ mx: "2px" }}
                icon={<SentimentDissatisfiedRoundedIcon />}
                label={` || ${n}  Negative Record`}
              />
            </div>
            <div>
              <Chip
                size="small"
                sx={{ mx: "2px" }}
                icon={<SentimentNeutralIcon />}
                label={` || ${neu}  Average Record`}
              />
            </div>
            <div>
              <Chip
                size="small"
                sx={{ mx: "2px" }}
                icon={<SentimentSatisfiedRoundedIcon />}
                label={` || ${p}  Positive Record`}
              />
            </div>
            <div>
              <Chip
                size="small"
                sx={{ mx: "2px" }}
                icon={<SentimentVerySatisfiedRoundedIcon />}
                label={` || ${vp}  Very Positive Record`}
              />
            </div>
          </div>
          <br />
          <Chip
            icon={<FunctionsIcon />}
            label={`notes = ${vn + n + neu + p + vp}`}
            variant="outlined"
          />
        </Paper>
      </Grid>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: 240 }, flexShrink: { sm: 0 }, height: "100vh" }}
      aria-label="mailbox folders"
    >
      <SwipeableDrawer
        container={container}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ display: { xs: "block", sm: "none" } }}
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
        onOpen={() => setToggleDrawer(true)}
      >
        <Toolbar />

        {bar}
      </SwipeableDrawer>
      <Grid item xs={12} md={4} sx={{ display: { xs: "none", sm: "block" } }}>
        {bar}
      </Grid>
    </Box>
  );
}
