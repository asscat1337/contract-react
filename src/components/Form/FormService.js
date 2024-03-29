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
    const editContract = useSelector(state=>state.dashboard.editContract)

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
            setValue('date_rendering',editData.date_rendering)
        }
    },[editData]);

    const onSubmit=data=>{
        if(data.service_cost > editContract.sum){
            setError(`Сумма превышает стоимость контракта/договора`)
            setMessage('')
            setOpen(true)
            return
        }
        if(data.service_cost > editContract.sum_left){
            console.log(data.service_cost,editContract.sum_left)
            setMessage('')
            setError('Сумма превышает остаток контракта/договора')
            setOpen(true)
            return
        }
            const isEditableData = editable ? ({id:editData.service_id,...data}) : (data);
            onSubmitForm(isEditableData);
            setMessage(editable ? 'Услуга отредактирована!' : 'Услуга добавлена!' );
            setOpen(true)
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
                <Controller
                    control={control}
                    name="service_cost"
                    render={({field:{onChange,value}})=>(
                        <TextField
                            fullWidth
                            type="text"
                            label="Стоимость"
                            value={value || ""}
                            onChange={newValue=>onChange(newValue)}
                        />
                    )}
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
                        <>
                            {editable ? (
                                <TextField
                                    label="Дата заключения"
                                    InputLabelProps={{ shrink: true, required: true }}
                                    type="date"
                                    value={value || ""}
                                    onChange={(newValue)=>onChange(newValue)}
                                />
                            ):(
                                <CustomDatePicker
                                    value={value}
                                    label="Срок оказания"
                                    onChange={(newValue)=>onChange(newValue)}
                                />
                            )
                            }
                        </>
                    )
                    }
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