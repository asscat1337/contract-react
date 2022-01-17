import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {TextField,Button,Stack} from "@mui/material";
import React from "react";
import {actionsResetPassword} from "../../store/actions/actionsAuthUser";


function FormResetPassword({login}){
    const dispatch = useDispatch();
    const schema = yup.object().shape({
        resetPassword:yup.string().required(),
        confirmResetPassword:yup.string().required()
    })
    const {register,handleSubmit} = useForm({
        resolver:yupResolver(schema)
    })
    const onSubmitReset=(data)=>{
        dispatch(actionsResetPassword({login:login,...data}))
    };
    return(
            <form action="" onSubmit={handleSubmit(onSubmitReset)}>
                <Stack spacing={2} direction="column">
                <TextField
                    variant="standard"
                    placeholder="Введите новый пароль"
                    {...register('resetPassword')}
                />
                <TextField
                    variant="standard"
                    placeholder="Подвердите новый пароль"
                    {...register('confirmResetPassword')}
                />
                <Button variant="contained" type="submit">
                    Сменить пароль
                </Button>
                </Stack>
            </form>
    )
}



export default FormResetPassword