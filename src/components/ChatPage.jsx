import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/chatlogo.png';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Msgbox from './Msgbox';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../Redux/chatSlice";

function ChatPage() {
  
  const location = useLocation();
  const user = location.state;
  const [typeMessage, setTypeMessage] = useState("");
  const [newSocket, setNewSocket] = useState();
  const [id, setUserId] = useState();
  const boxref = useRef(null);
  const dispatch = useDispatch();
  const datared = useSelector(state => state.chatReducer);

  useEffect(() => {
    const socket = io("https://chat-server-oe6e.onrender.com");
    setNewSocket(socket);

    socket.on("connect", () => {
      setUserId(socket.id);
      socket.emit('joined', { user });
    });

    socket.on('welcome', (data) => {
      dispatch(setChat(data));
    });

    socket.on('userJoined', (data) => {
      dispatch(setChat(data));
    });

    socket.on('sendMessage', (data) => {
      dispatch(setChat(data));
    });

    socket.on('leave', (data) => {
      dispatch(setChat(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const send = () => {
    if (typeMessage !== "") {
      newSocket.emit('message', { message: typeMessage, id });
      setTypeMessage("");
    }
  };

  useEffect(() => {
    boxref.current?.lastElementChild?.scrollIntoView();
  }, [datared]);
  

  return (
    <>
      <div className="body2 bg-dark">
        <div className="row chatpage  shadow d-flex justify-content-center align-items-center w-100 mt-4">

          
            <div className="row chatborder text-light bg-success p-3 w-75">
              <span><Link to={'/'}><i className="fa-solid fa-chevron-left" style={{ color: "#ffffff" }}></i></Link>&ensp; Logout</span>
            </div>
            <div className='whtapp' style={{width:'75%',height:'70vh',marginTop:'0px'}}>
  
            <div ref={boxref} className="chatpart w-100">
              {datared && datared.map((item, index) => (
                <Msgbox key={index} user={user} name={item.user} message={item.message} />
              ))}
  
              
            </div>
            <div className="textmsg">
                <input type="text" className="rounded inpbx mt-1 mb-3" placeholder='Type Message...' onChange={(e) => setTypeMessage(e.target.value)} value={typeMessage} style={{ height: '40px' }} />
                <button onClick={send} className='btn btn-success snt mt-1 mb-3' style={{ width: '10%', height: '44px' }}><i className="fa-regular fa-paper-plane" style={{ color: "#fcfcfc" }}></i></button>
              </div>
          </div>

        </div>
        <div className="row watermark" style={{marginTop:'-140px'}}>
          <div className="col-9"></div>
          <div className="col" style={{marginTop:'-50px'}}>
            <img src={logo} width={'250px'} height={'150px'} style={{zIndex:'99999',position:'absolute'}} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
