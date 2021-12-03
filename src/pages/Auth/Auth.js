import React from 'react';
import {Grid, Paper,TextField,Button} from "@mui/material";
import styles from "./auth.module.scss"



function Auth(){
    return(
        <Grid>
            <Paper elevation={10} className={styles.paper}>
                <Grid align="center">
                    <h2>Авторизация</h2>
                    <TextField
                        variant="standard"
                        label="Логин"
                        placeholder="Введите логин..."
                        fullWidth
                        required
                    />
                    <TextField
                        variant="standard"
                        placeholder="Введите пароль..."
                        label="Пароль"
                        type="password"
                        fullWidth
                        required
                    />
                    <Button type="submit" color="primary" fullWidth>Авторизация</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default  Auth