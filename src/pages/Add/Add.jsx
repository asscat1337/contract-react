import {useEffect} from 'react'
import styles from './Add.module.scss'
import * as yup from 'yup'
import {useForm,Controller} from "react-hook-form";
import {useSelector,useDispatch} from "react-redux";
import {yupResolver} from '@hookform/resolvers/yup'
import {getOrganization} from '../../store/actions/actionsOrganization'
import {getDepartment} from "../../store/actions/actionsDepartment";
import {actionAddDashboard} from "../../store/actions/actionsDashboard";
import FormContract from '../../components/Form/FormContract'
import {CssBaseline} from "@mui/material";

function Add(){
    const dispatch = useDispatch()
    const options = useSelector((state)=>state.organization.organization);
    const branch = useSelector((state)=>state.department.department)

    useEffect(()=>{
        dispatch(getOrganization());
        dispatch(getDepartment())
    },[])
    const schema = yup.object().shape({
        date:yup.date().required('Выберите дату'),
        sum:yup.number().positive().required('Введите сумму'),

    })
    const {register,handleSubmit,formState:{errors},control} = useForm({
        resolver:yupResolver(schema)
    })
    const onSubmit = data=>{
       dispatch(actionAddDashboard(data))
    }
    return (
        <div className={styles.formContent}>
            <CssBaseline/>
            <h1>Форма добавления контракта/договора</h1>
                <FormContract/>
            {/*<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>*/}
            {/*    <label htmlFor="">Выберите дату </label>*/}
            {/*    <input*/}
            {/*        type="date"*/}
            {/*        {...register("date")}*/}
            {/*    />*/}
            {/*    <label htmlFor="">Введите сумму</label>*/}
            {/*    <input*/}
            {/*           type="text"*/}
            {/*           {...register("sum",{required:true})}*/}
            {/*    />*/}
            {/*    <p>{errors.sum?.message}</p>*/}
            {/*    <label htmlFor="">Выберите дату завершения</label>*/}
            {/*    <input type="date"*/}
            {/*           {...register("ended",{required:true})}*/}
            {/*    />*/}
            {/*    <label htmlFor="">Выберите срок оказания</label>*/}
            {/*    <input type="date"*/}
            {/*           {...register("rendering",{required:true})}*/}
            {/*    />*/}
            {/*    <label htmlFor="">Введите предмет договора</label>*/}
            {/*    <input type="text"*/}
            {/*           {...register("description",{required:true})}*/}
            {/*    />*/}
            {/*    <label htmlFor="">Выберите МО</label>*/}
            {/*    <Controller*/}
            {/*        control={control}*/}
            {/*        name="organization"*/}
            {/*        defaultValue=""*/}
            {/*        render={({field:{onChange,ref,value}})=>{*/}
            {/*           return <Select*/}
            {/*                placeholder="Выберите..."*/}
            {/*                isSearchable*/}
            {/*                isClearable*/}
            {/*                className={styles.select}*/}
            {/*                options={options}*/}
            {/*                ref={ref}*/}
            {/*                onChange={val=>onChange(val.label)}*/}
            {/*            />*/}
            {/*        }}*/}

            {/*    />*/}
            {/*    <label htmlFor="">Выберите Отделение</label>*/}
            {/*    <Controller*/}
            {/*        control={control}*/}
            {/*        name="branch"*/}
            {/*        defaultValue=""*/}
            {/*        render={({field:{onChange,render,value}})=>(*/}
            {/*            <Select*/}
            {/*                placeholder="Выберите..."*/}
            {/*                isSearchable*/}
            {/*                isClearable*/}
            {/*                className={styles.select}*/}
            {/*                options={branch}*/}
            {/*                onChange={val=>onChange(val.label)}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*    <input type="submit"/>*/}
            {/*</form>*/}
        </div>
    )
}


export default Add