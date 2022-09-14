import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import { createContext, useEffect, useState } from 'react';

export const ChatProvider = createContext('')

function App() {

  const [user, setUser] = useState('')

  const navigate = useNavigate()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if(!userInfo) {
            navigate('/')
        }

    }, [navigate])

  return (
    <ChatProvider.Provider value={[user, setUser]}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/chats' element={<ChatPage />} />
        </Routes>
      </div>
    </ChatProvider.Provider>
  );
}

export default App;
