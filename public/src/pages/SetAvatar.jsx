import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Buffer } from 'buffer';
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from '../utils/APIRoutes';
import avatar1 from "../assets/avatar/Multiavatar-Apex.png";
import avatar2 from "../assets/avatar/Multiavatar-Desmond.png";
import avatar3 from "../assets/avatar/Multiavatar-Doge Panda.png";
import avatar4 from "../assets/avatar/Multiavatar-Essaouira.png";
import avatar5 from "../assets/avatar/Multiavatar-Indoqueen.png";
import avatar6 from "../assets/avatar/Multiavatar-Lucius Tattaglia.png";
import avatar7 from "../assets/avatar/Multiavatar-Mozart.png";
import avatar8 from "../assets/avatar/Multiavatar-Orbit Escape.png";
import avatar9 from "../assets/avatar/Multiavatar-Quito.png";
import avatar10 from "../assets/avatar/Multiavatar-Sir Henchard.png";

const SetAvatar = () => {
    // const apiKey = '3a6j4ToRdWLPyA';
    // const api = `https://api.multiavatar.com/45678945`;

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [avatars] = useState([avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10]);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
        } else {
            // Set loading to false once the login check is complete
            setIsLoading(false);
        }
    }, [navigate]);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className='loader' />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div
                                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                key={index}
                                onClick={() => setSelectedAvatar(index)}
                            >
                                <img src={avatar} alt="avatar" />
                            </div>
                        ))}
                    </div>
                    <button onClick={setProfilePicture} className='submit-btn'>
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </Container>
            )}
        </>
    );
}

export default SetAvatar;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
      
    .title-container {
        h1 {
            color: white;
        }
    }
      
  .avatars {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #4e0eff;
        }
    }
`;
