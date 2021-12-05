import {useDispatch} from 'react-redux'
import {actionsLogoutUser} from "../../store/actions/actionsAuthUser";
import {useNavigate} from 'react-router-dom'
import style from './Header.module.scss'
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function Header() {
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
        <div className={style.header}>
            <div className={style.bar}>
                <div>
                    <Button variant="contained">
                        <Link to="/add" className={style.defaultLink}>Зарегистрировать</Link>
                    </Button>
                    <h5>Hello user</h5>
                </div>
                <Button variant="contained" className={style.logout} onClick={onLogoutUser}>
                    Выход
                </Button>
            </div>
        </div>
            <h1>Журнал регистрации контрактов и договоров</h1>
        </>
    )
}

export default Header