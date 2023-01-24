import Home from "./components/Home";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ContextProvider from "./context/ContextProvider";

import {Route, BrowserRouter, Routes} from 'react-router-dom'


function App() {
  return (
    <div>
      <Menu />
      <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
