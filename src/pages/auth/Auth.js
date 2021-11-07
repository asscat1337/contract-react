import React,{useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router";
import useInput from "../../hooks/useInput";
import styles from "./auth.module.scss"

function Auth(){
    const history = useHistory()
    const login = useInput('');
    const password = useInput('')
    const onClickAuth = async(event)=>{
        event.preventDefault()
        try{
            const {data} = await axios.post('http://localhost:3005/auth/loginUser',{login:login.value,password:password.value})
            if(data){
                history.push('/dashboard')
            }
        }catch (e) {
            console.log(e)
        }
    };
    return(
        <div className={styles.auth}>
            <div className={styles.wrapper}>
                <form action="" method="post" className={styles.authForm}>
                    <div className="input-field col s6">
                        <input {...login} type="text" name="login" id="login"/>
                        <label htmlFor="login">Логин</label>
                    </div>
                    <div className="input-field col s6">
                        <input {...password} type="password" name="password" id="password"/>
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={onClickAuth}>Авторизация
                        {/*<i className="material-icons right">send</i>*/}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default  Auth