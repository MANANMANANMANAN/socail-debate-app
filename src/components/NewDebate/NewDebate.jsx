import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNewDebate } from "../../Actions/Debate"; // faeiscrm.grsvcga fgk cfja cafjkac kjs
import { loadUser } from "../../Actions/User";
import "./NewDebate.css";
const NewDebate = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category,setCategory] = useState("");
  const { loading, error, message } = useSelector((state) => state.like); // eraiwcnlcaeneafnclfaenlxk
  const dispatch = useDispatch();
//   const alert = useAlert();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewDebate(title,category, image));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
    //   alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newDebate">
      <form className="newDebateForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Debate</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Make Live
        </Button>
      </form>
    </div>
  );
};

export default NewDebate;