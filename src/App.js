
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import {BrowserRouter,Route,Redirect} from "react-router-dom"
import './App.css';
function App() {
  return (
    <BrowserRouter>
        <Route component={Auth} path='/auth'/>
         <Route component={Dashboard} path={'/dashboard'}/>
        {/*<Redirect from="/" to="/auth"/>*/}
    </BrowserRouter>
  );
}

export default App;
