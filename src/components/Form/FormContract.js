import {useForm,Controller} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector,useDispatch}  from "react-redux";
import {TextField,Button} from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Select from 'react-select'
import {getDepartment} from "../../store/actions/actionsDepartment";
import {getOrganization} from "../../store/actions/actionsOrganization";
import {actionEditContract} from "../../store/actions/actionsDashboard";
import {actionAddDashboard} from "../../store/actions/actionsDashboard";
import AdapterDayjs from '@mui/lab/AdapterDayjs';




function FormContract({editContract = {},editable = false}){
    const schema = yup.object().shape({
         // костыль
         sum:editable ? yup.number() : yup.number().required('Введите сумма'),
         description: editable ? yup.string() : yup.string().required('Введите описание'),
         rendering: editable ? yup.date() : yup.date().required('Выберите дату начала'),
         department:editable ? yup.string(): yup.string().required('Выберите отделение') ,
         organization:editable ? yup.string() : yup.string().required('Выберите организацию'),
         ended:editable ? yup.date() : yup.date().required('Выберите дату окончания')
        //

    });
    const {register,handleSubmit,control,formState:{errors}} = useForm({
        resolver:yupResolver(schema)
    });
    const dispatch = useDispatch();
    const organization = useSelector(state=>state.organization.organization);
    const department = useSelector(state=>state.department.department);

    if(!organization.length && !department.length){
        dispatch(getDepartment());
        dispatch(getOrganization());
    }

    const onSubmitForm=(data)=>{
       if(editable){
       const transformedEdit =  {
            ...data,
            organization:data.organization ?? editContract.organization,
            branch:data.department ?? editContract.branch,
            ended:data.ended ?? editContract.ended,
            rendering: data.rendering ?? editContract.rendering
        };
        dispatch(actionEditContract(transformedEdit))
       }else{
           console.log(data)
            dispatch(actionAddDashboard(data))
       }
    }

    return(
            <form action="" onSubmit={handleSubmit(onSubmitForm)}>
                <Controller
                    control={control}
                    name="rendering"
                    render={({field:{onChange}})=>(
                        <TextField
                            error={!!errors.rendering}
                            id="rendered"
                            type="date"
                            onChange={date=>onChange(date)}
                             defaultValue={editContract.rendering || ""}
                            InputLabelProps={{
                                shrink:true
                            }}
                        />
                    )}

                />
                <Controller
                    control={control}
                    name="ended"
                    render={({field:{onChange}})=>(
                        <TextField
                            error={!!errors.ended}
                            id="ended"
                            type="date"
                            onChange={date=>onChange(date)}
                            defaultValue={editContract.ended || "" }
                            InputLabelProps={{
                                shrink:true
                            }}
                        />
                    )}
                />
                <TextField
                    required
                    id="description"
                    label="Предмет договора"
                    defaultValue={editable ? editContract.description : ""}
                    error={!!errors.description}
                    {...register('description')}
                />
                <TextField
                    required
                    id="sum"
                    label="Сумма"
                    error={!!errors.sum}
                    defaultValue={editable ? editContract.sum : ""}
                    {...register('sum')}
                />
                <Controller
                    control={control}
                    name="organization"
                    rules={{required:true}}
                    render={({field:{onChange,value}})=>(
                        <Select
                            defaultValue={{label:editContract.organization}}
                            isClearable
                            isSearchable
                            options={organization}
                            onChange={val=>onChange(val.label)}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="department"
                    rules={{required:true}}
                    render={({field:{onChange,value,ref}})=>(
                        <Select
                             defaultValue={{label:editContract.branch}}
                            onChange={val=>onChange(val.label)}
                            isClearable
                            isSearchable
                            options={department}
                        />
                    )}
                />
                <Button variant="outlined" type="submit" onSubmit={onSubmitForm}>
                    Редактировать
                </Button>
            </form>
    )
}

export default FormContract