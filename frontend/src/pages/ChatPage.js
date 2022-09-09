import React, { useEffect } from 'react';
import axios from 'axios'

const ChatPage = () => {

    const fetchChats = async () => {
        const data = await axios.get('http://localhost:5000/api/chat')
        console.log(data)
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div>
            This is ChatPage    
        </div>
    );
};

export default ChatPage;