
import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import About from './About';
import Home from './Home';

const ProtectedRoute=(props)=>{
  const token=localStorage.getItem('SHOPPING_TOKEN')
  if(token){
    return props.children;
  }
  
  return <Navigate to="/login" />
}
const PublicRoute=(props)=>{
  const token=localStorage.getItem("SHOPPING_TOKEN")
  if(token){
    return <Navigate to="/home" />;
  }

  return props.children;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PublicRoute><Login/></PublicRoute> } />
        <Route path='/login' element={<PublicRoute><Login/> </PublicRoute>} />
        <Route path='/signup' element={<PublicRoute><Signup/> </PublicRoute>} />
        <Route path='/about' element={<ProtectedRoute><About/></ProtectedRoute> } />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
