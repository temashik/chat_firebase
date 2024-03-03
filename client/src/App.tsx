import {Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap"
import { useSelector } from 'react-redux'
import NavigationBar from './components/NavigationBar';
import { RootState } from './redux/store';

function App() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path = '/' element = {user ? <Chat /> : <Navigate to="/login" />}></Route>
          <Route path = '/register' element = {user ? <Navigate to="/" /> : <Register />}></Route>
          <Route path = '/login' element = {user ? <Navigate to="/" /> : <Login />}></Route>
          <Route path = '*' element = {<Navigate to="/" />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
