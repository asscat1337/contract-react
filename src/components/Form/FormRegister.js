import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm,Controller} from "react-hook-form";
import {TextField,Button,Grid} from "@material-ui/core";
import {useSelector,useDispatch} from "react-redux";
import Select from "react-select";
import {getDepartment} from "../../store/actions/actionsDepartment";
import {actionsGetRole} from "../../store/actions/actionsAuthUser";
import {actionsRegisterUser} from "../../store/actions/actionsAuthUser";
import React from "react";


function FormRegister(){
    const dispatch = useDispatch()
    const branch = useSelector(state=>state.department.department);
    const role = useSelector(state=>state.auth.roles);
    const schema = yup.object().shape({
        email:yup.string().required(),
        password:yup.string().required(),
        fio:yup.string().required(),
        role:yup.string(),
        branch:yup.string(),
        birthday:yup.date()
    });

    const {register,handleSubmit,formState:{errors},control} = useForm({
        resolver:yupResolver(schema)
    });

    React.useEffect(()=>{
        dispatch(getDepartment());
        dispatch(actionsGetRole())
    },[])

    const onSubmit=(data)=>{
       dispatch(actionsRegisterUser(data))
    };

    return(
        <Grid container>
            <Grid item>
                <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="E-mail"
                                required
                                {...register('email')}
                            />
                            <TextField
                                label="ФИО"
                                required
                                {...register('fio')}
                            />
                            <TextField
                                type="password"
                                label="Пароль"
                                required
                                {...register('password')}
                            />
                            <Controller
                                control={control}
                                name="birthday"
                                render={({field:{onChange}})=>(
                                    <TextField
                                        error={!!errors.birthday}
                                        id="birthday"
                                        type="date"
                                        label="Дата рождения"
                                        onChange={date=>onChange(date)}
                                        InputLabelProps={{
                                            shrink:true
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name="branch"
                                control={control}
                                render={({field:{onChange}})=>(
                                    <Select
                                        options={branch}
                                        placeholder="Выберите отделение..."
                                        onChange={val=>onChange(val.value)}

                                    />
                                )}
                            />
                            <Controller
                                name="role"
                                control={control}
                                render={({field:{onChange}})=>(
                                    <Select
                                        options={role}
                                        placeholder="Выберите роль..."
                                        onChange={val=>onChange(val.value)}
                                    />
                                )}
                            />
                    <Button type="submit" variant="outlined">
                        Зарегистировать
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}


export default FormRegister



