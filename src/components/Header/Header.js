import style from './Header.module.scss'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";

function Header() {

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
                <Button variant="contained" className={style.logout}>
                    <Link to="/add" className={style.defaultLink}>Выход</Link>
                </Button>
            </div>
        </div>
            <h1>Журнал регистрации контрактов и договоров</h1>
        </>
    )
}

export default Header