import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { pointDebate, like_message, finish_debate } from "../../Actions/Debate";
import './Dbate.css';  // Importing CSS file
import Dbate_header from '../Dbate_header/Dbate_header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import MoneyTransfer from '../Money_Transfer';
const Dbate = () => {
    const socket = useMemo(() => io("http://localhost:5000"), []);  // Create socket connection
    const location = useLocation();  // Get query parameters from URL
    const [message, setMessage] = useState("");
    const [socketId, setSocketId] = useState("");
    const [room, setRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [state, setState] = useState("");
    const [isParticipant, setIsParticipant] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [likedMessages, setLikedMessages] = useState([]);
    const [currentMessageId, setCurrentMessageId] = useState(null);
    const dispatch = useDispatch();
    const setParameters = () => {
        const queryParams = new URLSearchParams(location.search);
        const debateId = queryParams.get('debate_id');
        const side = queryParams.get('side');
        setState(side);
        setRoom(debateId);

        setIsParticipant(side === 'left' || side === 'right');

        if (debateId) {
            socket.emit("join-room", debateId);
        }
    };

    const { debates } = useSelector((state) => state.allDebates);
    const { user } = useSelector((state) => state.user)
    const isUserOwner = () => {
        const queryParams = new URLSearchParams(location.search);
        const debateId = queryParams.get('debate_id');
        // Find the debate by its ID
        console.log(debates);
        const debate = debates.find(debate => debate._id === debateId);
        // Check if the debate exists and if the user is the owner
        if (debate && debate.owner === user._id) {
            console.log(true);
            return true;  // User is the owner of the debate
        }
        else {
            console.log(false);
            return false;
        }
        // return false;  // User is not the owner or debate not found
    };
    const handle_like = (index, messageId) => {
        setLikedMessages((prevLikedMessages) =>
            prevLikedMessages.includes(index)
                ? prevLikedMessages.filter((i) => i !== index)
                : [...prevLikedMessages, index]
        );
        console.log(messageId);
        const queryParams = new URLSearchParams(location.search);
        const debate_id = queryParams.get('debate_id');
        let message_id = messageId
        dispatch(like_message(debate_id, message_id));
    };
    let { messageId } = useSelector((state) => state.pointDebates);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(location.search);
        const debate_id = queryParams.get('debate_id');
        const side = queryParams.get('side');
        await dispatch(pointDebate(debate_id, side, message));
        // let messageIds = messageId.messageId;
        // console.log(currentMessageId);
    };

    
    const handleEnd = () => { 
        const queryParams = new URLSearchParams(location.search);
        const debateId = queryParams.get('debate_id');
    
        // Dispatch action to finish the debate
        dispatch(finish_debate(debateId));
        setIsFinish(true);
    
        const debate = debates.find(debate => debate._id === debateId);
        const messages = debate.messages;
        // const totalAmount = debate.totalAmount;  // Assuming the total amount is stored in the debate
        const userLikesMap = new Map();
        let totalLikes = 0;
        console.log(messages);
        messages.forEach(message => {
            // console.log(message.user)
            const senderId = message.user; // Assuming message has a sender object with an _id
            const likes = message.like; // Assuming message has a likes field representing the number of likes
            // Add to the user's like count
            if (userLikesMap.has(senderId)) {
                userLikesMap.set(senderId, userLikesMap.get(senderId) + likes);
            } else {
                userLikesMap.set(senderId, likes);
            }
            // Increment total likes count
            totalLikes += likes;
        });
        const totalAmount = 100;
        // Iterate over the users in the map and call withdraw for each user
        userLikesMap.forEach((userLikes, userId) => {
            const proportion = userLikes / totalLikes;
            const amount = proportion * totalAmount;
            // Call the withdraw function with the calculated amount and userId as receiverId
            // withdraw(amount, userId);
        });
        console.log(userLikesMap);
        dispatch(finish_debate(debateId));
        setIsFinish(true);
    };
    useEffect(() => {
        // Set the current messageId when it changes in the store
        if (messageId) {
            // setCurrentMessageId(messageId.messageId);
            console.log(messageId.messageId);
            if (message && room) {
                // console.log(currentMessageId)
                socket.emit("message", { message, room, state, socketId, messageId });
                setMessage("");
            }
        }
    }, [messageId]);
    useEffect(() => {
        setParameters();
        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("Connected with Socket ID:", socket.id);
        });

        socket.on("welcome", (message) => {
            console.log(message);
        });

        socket.on("receive-message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("connect");
            socket.off("welcome");
            socket.off("receive-message");
        };
    }, [location, socket]);

    return (
        <div className="debate-container">
            <Dbate_header />
            {isParticipant ? (
                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="message-input"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                        />

                        {!isFinish && ( // Only show the Send button if isFinish is false
                            <button className="send-button" type="submit">Send</button>
                        )}

                        {/* Optional: Uncomment if you want to allow ending the debate */}
                        {/* {isUserOwner() === true && (
        <button onClick={handleEnd} className='delete'>End Debate</button>
      )} */}

                    </form>
                    <button onClick={handleEnd} className="delete">End Debate</button>
                </div>
            ) : null}


            <div className="messages-container">
                {messages.map((item, index) => (
                    <div
                        key={index}
                        className={`message-box ${item.state === 'left' ? 'left' : 'right'}`}
                        onDoubleClick={() => handle_like(index, item.messageId.messageId)}
                        style={{
                            border: likedMessages.includes(index) ? '5px solid #e9aad7' : 'none',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        <p>{item.message}</p>
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default Dbate;