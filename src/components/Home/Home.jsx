
import React, { useEffect } from "react";
import Debate from "../Debate/Debate";
import User from "../User/User";
import Dbate from "../Dbate/Dbate"
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import { getAllDebates } from "../../Actions/Debate";
import Past_Debate from "../Past_Debate/Past_Debate";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header_live from "../Header_live/Header_live";
import Header_past from "../Header_past/Header_past";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { debates } = useSelector(
    (state) => state.allDebates
  );

  const { users } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(getAllDebates());
    dispatch(getAllUsers());
    // Navigate to the "/" tab when the component is rendered
    navigate("/");
  }, [dispatch, navigate]);

  const loading = false;
  const usersLoading = false;

  return loading === true || usersLoading === true ? (
    <div></div>
  ) : (
    <div className="home">
      <div className="homeleft">
        <Header_live />
        <div className="live_debates">
          {debates && debates.length > 0 ? (
            debates
              .filter((post) => post.isFinish === false || post.isFinish === undefined) // Show live debates where isFinish is false or undefined
              .map((post) => (
                <Debate
                  key={post._id}
                  debateId={post._id}
                  title={post.Title}
                  category={post.Category}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage=""
                  ownerId={post.owner}
                  image = {post.image.url}
                />
              ))
          ) : (
            <Typography variant="h6">No Live Debates yet</Typography>
          )}
        </div>
        <Header_past />
        <div className="live_debates">
          {debates && debates.length > 0 ? (
            debates
              .filter((post) => post.isFinish) // Show only past debates where is_finish is true
              .map((post) => (
                <Past_Debate
                  key={post._id}
                  debateId={post._id}
                  title={post.Title}
                  category={post.Category}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage=""
                  ownerId={post.owner}
                  image = {post.image.url}
                />
              ))
          ) : (
            <Typography variant="h6">No Past Debates yet</Typography>
          )}
        </div>
      </div>
      {/* <Dbate /> */}
    </div>
  );
};
export default Home;