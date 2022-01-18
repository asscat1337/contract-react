
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {IconButton,Button,Stack,OutlinedInput,InputAdornment} from "@mui/material";
import {Visibility,VisibilityOff} from "@mui/icons-material";
import React from "react";
import {actionsResetPassword} from "../../store/actions/actionsAuthUser";
import CustomSnackBar from "../Snackbar/SnackBar";


function FormResetPassword({login,handleClose,open,message,showMessage,setShowMessage}){

    const [values,setValues] = React.useState(false)
    const dispatch = useDispatch();



    const schema = yup.object().shape({
        resetPassword:yup.string().required(),
        confirmResetPassword:yup.string().required()
    })
    const {register,handleSubmit} = useForm({
        resolver:yupResolver(schema)
    })


    const onSubmitReset=(data)=>{
        setShowMessage(true)
        dispatch(actionsResetPassword({login:login,...data}))

    };

    const handleChangeVisibility=()=>{
        setValues(!values)
    }

    return(
        <>
        {showMessage ?
                (<CustomSnackBar
                    open={open}
                    handleClose={handleClose}
                    message={message.message}
                    error={message.error}
                />) : null
        }
            <form action="" onSubmit={handleSubmit(onSubmitReset)}>
                <Stack spacing={2} direction="column">
                <OutlinedInput
                    type={values ? "text" : "password"}
                    placeholder="Введите новый пароль"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleChangeVisibility}
                                edge="end"
                            >
                                {values ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    {...register('resetPassword')}
                />
                <OutlinedInput
                    type="password"
                    placeholder="Подвердите новый пароль"
                    endAdornment={
                        <InputAdornment position="end">
                                <IconButton
                                    onClick={handleChangeVisibility}
                                    edge="end"
                                >
                                    {values ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                        </InputAdornment>
                    }
                    {...register('confirmResetPassword')}
                />
                <Button variant="contained" type="submit">
                    Сменить пароль
                </Button>
                </Stack>
            </form>
            </>
    )
}



export default FormResetPassword