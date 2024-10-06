import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "./Dbate_header.css";

const Dbate_header = () => {
  const [open, setOpen] = useState(false);

  // Function to open the dialog box
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog box
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="debate-arena-strip">
      {/* <h1
        className="debate-arena-text"
        onClick={handleOpen} // Click event to open dialog
      >
        Debate Arena
      </h1> */}
    <button className="debate-arena-text" onClick={handleOpen}>Debate Arena </button>
      {/* Dialog Box with features */}
      <Dialog open={open} onClose={handleClose} className="dialong">
        <div className="t">Features of Debate Arena</div>
        <div className="features">
          <ul>
            <li>Live debates with real-time interaction</li>
            <li>Audience can Support or contradict teams with a single click</li>
            <li>Audience vote the comments and decide the rewards of the participants </li>
            <li>The Identity of the commentor is hidden to ensure transparency</li>
            <li>Debate history and statistics tracking</li>
            <li>Each team can send message only when the other team replies to prevent the spamming</li>
          </ul>
          </div>
      </Dialog>
    </div>
  );
};

export default Dbate_header;
