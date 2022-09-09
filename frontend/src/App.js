import './App.css';
import { Button } from '@chakra-ui/button'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div>
      <Button colorScheme={"blue"} >Button</Button>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
