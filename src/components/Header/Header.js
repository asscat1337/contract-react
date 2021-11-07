import style from './Header.module.scss'
import {Link} from "react-router-dom";

function Header() {

    return(
        <div>
            <h1>Журнал регистрации контрактов и договоров</h1>
            <div className={style.bar}>
                <input type="text" className={style.filter} placeholder="Поиск..."/>
                <button className={style.add}>
                    <Link to="/login" className={style.defaultLink}> Зарегистрировать</Link>
                </button>
            </div>
        </div>
    )
}

export default Header