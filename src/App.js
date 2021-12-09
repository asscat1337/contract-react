import {useState} from 'react'
import {createTheme, ThemeProvider,useTheme} from "@material-ui/core/styles";
import {useLocation} from 'react-router-dom'
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import {Routes,Route} from "react-router-dom"
import {useSelector} from "react-redux";
import './App.css';
import Add from "./pages/Add/Add";
import Patient from "./pages/Patient/Patient";
import Edit from "./pages/Edit/Edit";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import Header from "./components/Header/Header";
import AppContext from "./hooks/context";

function App() {
    const [darkState,setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const darkTheme = createTheme({
        palette:{
            mode:palletType,
            type:palletType
        }
    });

    const handleThemeChange=()=>{
        setDarkState(!darkState);
        console.log(darkTheme)
    }
  const location = useLocation();
  return (
      <ThemeProvider theme={darkTheme}>
          {
              !location.pathname.includes("login") &&
              <Header
                  darkState={darkState}
                  onChangeTheme={handleThemeChange}
              />
          }
            <Routes>
                <Route element={<Auth/>} path='/login' exact/>
                 <Route element={<ProtectedRoute roles={[1,2]} component={Dashboard}/>} path={'/'} exact/>
                     <Route
                         element={
                             <ProtectedRoute component={Dashboard} roles={[1,2]}/>
                         }
                         path="dashboard"/>
                 <Route element={<ProtectedRoute roles={[2]} component={Add}/>} path="/add" exact/>
                <Route element={<ProtectedRoute roles={[2]} component={Edit}/>} path="/edit/:id"/>
                 <Route element={<Patient/>} path="/patient/:id"/>
            </Routes>
          </ThemeProvider>
  );
}

export default App;
