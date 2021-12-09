import {useLocation} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import Paper from '@mui/material/Paper'
import {actionsLogoutUser} from "../../store/actions/actionsAuthUser";
import {useNavigate} from 'react-router-dom'
import style from './Header.module.scss'
import Button from '@mui/material/Button';
import {Switch} from "@material-ui/core";
import {Link} from "react-router-dom";

function Header({onChangeTheme,darkState}) {
    const user = useSelector(state=>state.auth.user.user);
    const roles = useSelector(state=>state.auth.user.role);
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const onLogoutUser=()=>{
        dispatch(actionsLogoutUser())
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('auth');
        navigate('/')
    }
    return(
        <>
        <Paper>
            <div className={style.bar}>
                <div>
                    {roles === 2 ? (
                    <Button variant="contained">
                        <Link to="/add" className={style.defaultLink}>Зарегистрировать</Link>
                    </Button>) : null
                    }
                    <Switch checked={darkState} onChange={onChangeTheme}/>
                    <h5>{user}</h5>
                </div>
                <Button variant="contained" className={style.logout} onClick={onLogoutUser}>
                    Выход
                </Button>
            </div>
        </Paper>
        </>
    )
}

export default Header