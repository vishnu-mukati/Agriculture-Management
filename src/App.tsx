import './App.css'
import { LoginPage } from './pages/login-page';
import { BrowserRouter,Routes, } from 'react-router-dom';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
     <LoginPage/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
