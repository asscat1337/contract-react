import React, {useState} from 'react'
import {TextField,Grid} from '@material-ui/core'
import {useEffect} from 'react'
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import * as yup from 'yup'
import CustomSnackBar from "../Snackbar/SnackBar";
import {yupResolver} from "@hookform/resolvers/yup";


function FormService({editable = false,editData = {},onSubmitForm,children}){
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [open,setOpen] = React.useState(false);
    const editContract = useSelector(state=>state.dashboard.editContract.sum)
    const schema = yup.object().shape({
        serviceName:yup.string().required(),
        serviceCost: yup.number().required(),
        serviceCount: yup.number().required()
    })

    const {handleSubmit,register,setValue,reset} = useForm({
        resolver:yupResolver(schema)
    })

    useEffect(()=>{
        if(editable){
            setValue('serviceName',editData.service_name);
            setValue('serviceCost',editData.service_cost);
            setValue('serviceCount',editData.service_count)
        }
    },[editData]);

    const onSubmit=data=>{
        if(data.serviceCost*data.serviceCount > editContract){
            setError('Сумма превышает')
            setOpen(true)
        }else{
            const isEditableData = editable ? ({id:editData.services_id,...data}) : (data);
            onSubmitForm(isEditableData);
            setMessage('Услуга добавлена!');
            setOpen(true)
        }
        if(!editable){
            reset({})
        }
    }

return(
    <Grid container direction="column" justifyContent="center" alignItems="center" columnSpacing={{xs:1,sm:2,md:3}}>
        {open &&
            <CustomSnackBar
                open
                handleClose={()=>setOpen(false)}
                error={error}
                message={message}
            />
        }
        <Grid item>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    type="text"
                    label="Название услуги"
                    {...register('serviceName')}
                />
                <TextField
                    fullWidth
                    type="text"
                    label="Стоимость"
                    {...register('serviceCost')}
                />
                <TextField
                    fullWidth
                    type="text"
                    label="Количество"
                    {...register('serviceCount')}
                />
                <Grid item>
                    {children}
                </Grid>
            </form>
        </Grid>
        </Grid>
)
}


export default FormService