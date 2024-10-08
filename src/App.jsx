import Home from './components/Home';
import Error from './components/Error';
import Books from './components/Books';
import Register from './components/Register';
import Login from './components/Login';
import Leyout from './components/LayoutPage/Leyout';
import {Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div>
      <Leyout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<Books />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
      </Routes>
      </Leyout>
    </div>
  )
}

export default App