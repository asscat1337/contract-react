import {useState,useEffect} from 'react'
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {useLocation} from 'react-router-dom'
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import {Routes,Route} from "react-router-dom"
import './App.css';
import Add from "./pages/Add/Add";
import Patient from "./pages/Patient/Patient";
import Edit from "./pages/Edit/Edit";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";

function App() {
    const [darkState,setDarkState] = useState(true);
    const darkTheme = createTheme({
        palette:{
            mode:darkState ? "dark" : "light",
            type:darkState ? "dark" : "light"
        }
    });

    useEffect(()=>{
        const themeType = localStorage.getItem('theme')
        if(themeType !== "dark"){
            setDarkState(false)
        }
    },[])

    const handleThemeChange=()=>{
        localStorage.setItem('theme',darkState ? "light" : "dark");
        setDarkState(!darkState);
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
                 <Route element={<NotFound/>} path="*"/>
                 <Route element={<ProtectedRoute roles={[4]} component={Admin}/>} path="/admin"/>
            </Routes>
          </ThemeProvider>
  );
}

export default App;
