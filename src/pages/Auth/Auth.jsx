import React from 'react';
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver}  from "@hookform/resolvers/yup";
import {Grid, Paper,TextField,Button,Checkbox,FormControlLabel,FormGroup,Stack,CssBaseline} from "@mui/material";
import {useDispatch,useSelector} from "react-redux";
import {actionsLoginUser} from "../../store/actions/actionsAuthUser";
import FormResetPassword from "../../components/Form/FormResetPassword";
import CustomSnackBar from "../../components/Snackbar/SnackBar";
import styles from "./auth.module.scss"



function Auth(){
    const navigate = useNavigate();
    const [open,setOpen] = React.useState(false);
    const [showPassword,setShowPassword] = React.useState(false);
    const [showResetForm,setShowResetForm] = React.useState(false);
    const dispatch = useDispatch()
    const message = useSelector(state=>state.auth.message);
    const isAuth = useSelector(state=>state.auth.auth);
    const role = useSelector(state=>state.auth.user.role);

    const schema = yup.object().shape({
        login:yup.string().required(),
        password:yup.string().required(),
    })
    const {register,handleSubmit,getValues} = useForm({
        resolver:yupResolver(schema)
    });

    React.useEffect(()=>{
        /// костыль
         if(isAuth){
          navigate('/dashboard')
        }
         if(role === 4) {
             navigate('/admin')
         }
         ///
    },[isAuth,message]);

    const onSubmitAuth=data=>{
         dispatch(actionsLoginUser(data))
         setOpen(true)
    }
    const onShowPassword = ()=>{
        setShowPassword(!showPassword)
    }
    const onResetPassword=()=>{
        setShowResetForm(!showResetForm);
        setOpen(true)
    }
    const handleClose=(event,reason)=>{
        if(reason==='clickaway') return
        setOpen(false)
    }

    return(
        <>
            <CssBaseline/>
        <Grid>
            {message &&
            <CustomSnackBar
                open={open}
                handleClose={handleClose}
                message={message.message}
                error={message.error}
            />
            }
            <Paper elevation={10} className={styles.paper}>
                <Grid align="center">
                    <h2>Авторизация</h2>
                    <form action="" onSubmit={handleSubmit(onSubmitAuth)}>
                        <TextField
                            variant="standard"
                            label="Логин"
                            placeholder="Введите логин..."
                            fullWidth
                            required
                            {...register('login')}
                        />
                        <TextField
                            variant="standard"
                            placeholder="Введите пароль..."
                            label="Пароль"
                            type={showPassword ? "text":"password"}
                            fullWidth
                            required
                            {...register('password')}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                onChange={onShowPassword}
                            />
                        </FormGroup>
                        <Stack direction="row" spacing={4}>
                            <Button
                                type="submit"
                                color="primary"
                                >Авторизация</Button>
                            <Button color="primary" onClick={onResetPassword}>
                                {showResetForm ? 'Скрыть' : 'Забыли пароль?'}
                            </Button>
                        </Stack>
                    </form>
                    {showResetForm && (
                     <FormResetPassword
                        login={getValues("login")}
                     />
                    )}
                </Grid>
            </Paper>
        </Grid>
            </>
    )
}

export default  Auth