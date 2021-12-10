import {TextField,Button} from '@material-ui/core'
import {useEffect} from 'react'
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";


function FormService({editable = false,editData = {},onSubmitForm,children}){

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
        const isEditableData = editable ? ({id:editData.services_id,...data}) : (data);
        onSubmitForm(isEditableData);
        if(!editable){
            reset({})
        }
    }

return(
    <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
            type="text"
            label="Название услуги"
            {...register('serviceName')}
        />
        <TextField
            type="text"
            label="Стоимость"
            {...register('serviceCost')}
        />
        <TextField
            type="text"
            label="Количество"
            {...register('serviceCount')}
        />
        {children}
    </form>
)
}


export default FormService