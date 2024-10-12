import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/page/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ChatPage from './components/page/ChatPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </Router>
  )
}

export default App;
