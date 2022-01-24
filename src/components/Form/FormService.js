import React, {useState} from 'react'
import {TextField,Grid} from '@material-ui/core'
import {useEffect} from 'react'
import {useForm,Controller} from "react-hook-form";
import {useSelector} from "react-redux";
import * as yup from 'yup'
import CustomSnackBar from "../Snackbar/SnackBar";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomDatePicker from "../DatePicker/DatePicker";


function FormService({editable = false,editData = {},onSubmitForm,children}){
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [open,setOpen] = React.useState(false);
    const editContract = useSelector(state=>state.dashboard.editContract.sum_left)

    const schema = yup.object().shape({
        service_name:yup.string().required(),
        service_cost: yup.number().required(),
        service_count: yup.number().required(),
        date_rendering:yup.date().required()
    })

    const {handleSubmit,register,setValue,reset,control} = useForm({
        resolver:yupResolver(schema)
    })

    useEffect(()=>{
        if(editable){
            setValue('service_name',editData.service_name);
            setValue('service_cost',editData.service_cost);
            setValue('service_count',editData.service_count)
        }
    },[editData]);

    const onSubmit=data=>{
        if(data.service_cost > editContract){
            setError('Сумма превышает стоимость контракта/договора')
            setOpen(true)
        }else{
            const isEditableData = editable ? ({id:editData.service_id,...data}) : (data);
            onSubmitForm(isEditableData);
            setMessage(editable ? 'Услуга отредактирована!' : 'Услуга добавлена!' );
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
        <Grid item sx={{m:1}}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    type="text"
                    label="Название услуги"
                    margin="normal"
                    {...register('service_name')}
                />
                <TextField
                    fullWidth
                    type="text"
                    label="Стоимость"
                    {...register('service_cost')}
                />
                <TextField
                    fullWidth
                    type="text"
                    label="Количество"
                    margin="normal"
                    {...register('service_count')}
                />
                <Controller
                    control={control}
                    name="date_rendering"
                    render={({field:{onChange,value}})=>(
                        <CustomDatePicker
                            value={value}
                            label="Срок оказания"
                            onChange={(newValue)=>onChange(newValue)}
                        />
                    )}
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