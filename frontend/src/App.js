import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Main from './Pages/Main';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {

  return (
 
      <div className="App container d-flex justify-content-center">
        <Main />
      </div>
   
  );
}

export default App;
