import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import {Routes,Route} from "react-router-dom"
import './App.css';
import Add from "./pages/Add/Add";
import Patient from "./pages/Patient/Patient";
import Edit from "./pages/Edit/Edit";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <Routes>
        <Route element={<Auth/>} path='/auth' exact/>
         <Route element={<Dashboard/>} path={'/dashboard'} exact/>
         <Route element={<Add/>} path="/add" exact/>
         <Route element={<Edit/>} path="/edit/:id"/>
         <Route element={<Patient/>} path="/patient/:id"/>
    </Routes>
  );
}

export default App;
