import React, { useState } from "react";
import "./Header_live.css";
import {Dialog,Typography} from "@mui/material";
const Header_live = () => {
  const [interestToggle,setInterestToggle] = useState(false);
  return (
    <header className="headers">
      <div className="header-content">
        <h1 className="main-heading">LIVE DEBATES</h1>
        <p className="tagline">
          Join the Conversation That Shapes Tomorrow: Where Bold Ideas and Critical Thinking Collide
        </p>
      </div>
      <button className="rules-button" onClick={() => setInterestToggle(!interestToggle)}>Rules</button>
      {/* <Dialog
        open={interestToggle}
        onClose={() => setInterestToggle(!interestToggle)}
        className="DialogBox"
      >
        <div className="rules-container">
          <Typography variant="h6" gutterBottom>
            Debate Rules
          </Typography>
          <ol>
            <li>All participants must pay the entry fee before joining the debate.</li>
            <li>Respectful communication is mandatory—no foul language or personal attacks.</li>
            <li>Wait for the opposing team’s reply before sending your next message.</li>
            <li>Stick to the time limit for each response to keep the debate on track.</li>
            <li>The moderator’s decisions are final, and breaking any rule may result in removal.</li>
          </ol>
          <button 
            className="close-button" 
            onClick={() => setInterestToggle(false)}
          >
            Close
          </button>
        </div>
      </Dialog> */}
      <Dialog
        open={interestToggle}
        onClose={() => setInterestToggle(!interestToggle)}
        classes={{ paper: 'custom-dialog' }}  // Adding a custom class for styling
      >
        <div className="rules-container">
          <Typography variant="h4" className="rules-heading">
            Debate Rules
          </Typography>
          <ol className="rules-list">
            <li>All participants must pay the entry fee before joining the debate.</li>
            <li>Respectful communication is mandatory—no foul language or personal attacks.</li>
            <li>Wait for the opposing team’s reply before sending your next message.</li>
            <li>Stick to the time limit for each response to keep the debate on track.</li>
            <li>The prizes will be distributed when the debate ends based on unbiased view of the Audience</li>
          </ol>
          <button 
            className="close-button" 
            onClick={() => setInterestToggle(false)}
          >
            Close
          </button>
        </div>
      </Dialog>
    </header>
  );
};
export default Header_live;