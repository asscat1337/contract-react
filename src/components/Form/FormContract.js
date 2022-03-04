import React from "react";
import {useForm,Controller} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector,useDispatch}  from "react-redux";
import {TextField,Button,Grid,Input,InputLabel,Paper,TextareaAutosize,FormGroup,Checkbox,FormControlLabel} from "@mui/material";
import {actionAddDashboard,actionEditContract} from "../../store/actions/actionsDashboard";
import CustomSnackBar from "../Snackbar/SnackBar";
import {UploadFile} from "@mui/icons-material";
import CustomAutoComplete from "../Autocomplete/Autocomplete";
import dayjs from "dayjs";


function FormContract({editContract = {},editable = false}){
    const [open,setOpen] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [error,setError] = React.useState("")
    const schema = yup.object().shape({
         // костыль
         number_contract:yup.string(),
         sum:editable ? yup.number() : yup.number().required('Введите сумма'),
         description: editable ? yup.string() : yup.string().required('Введите описание'),
         rendering: editable ? yup.date() : yup.date().required('Выберите дату начала'),
         department:editable ? yup.string(): yup.string().required('Выберите отделение') ,
         organization:editable ? yup.string() : yup.string().required('Выберите организацию'),
         ended:editable ? yup.date() : yup.date().required('Выберите дату окончания'),
         date_service: editable ? yup.date():yup.date().required(),
         type:editable ? yup.string() : yup.string().required(),
         notice:yup.string(),
         isProlongation:yup.boolean()
        //

    });
    const {register,handleSubmit,control,formState:{errors},reset} = useForm({
        resolver:yupResolver(schema)
    });
    const dispatch = useDispatch();
    const organization = useSelector(state=>state.organization.organization);
    const department = useSelector(state=>state.department.department);
    const type = useSelector(state=>state.type.types);
    const totalSumService = useSelector(state=>state.dashboard?.editableService?.map(item=>item.service_cost).reduce((a,b)=>a+b,0))

    const onSubmitForm=(data)=>{
       if(editable){
         if(data.sum < totalSumService){
             setOpen(true)
             setError("Сумма ниже!")
             return
         }
       const transformedEdit =  {
            ...data,
            contract_id:editContract.contract_id,
            organization:data.organization ?? editContract.organization,
            branch:data.department ?? editContract.branch,
            ended:data.ended === undefined ? editContract.ended : dayjs(data.ended).format('YYYY-MM-DD'),
            rendering:data.rendering === undefined ? editContract.rendering : dayjs(data.rendering).format('YYYY-MM-DD'),
            date_service:data.rendering === undefined ? editContract.date_service : dayjs(data.date_service).format('YYYY-MM-DD'),
            sum:data.sum ?? editContract.sum,
            type:data.type ?? editContract.type
        };
         console.log(transformedEdit)
         setMessage('Отредактировано!');
            dispatch(actionEditContract(transformedEdit))
           setOpen(true)
       }else{
           dispatch(actionAddDashboard({...data,
               rendering:dayjs(data.rendering).format('YYYY-MM-DD'),
               ended:dayjs(data.ended).format('YYYY-MM-DD'),
               date_service: dayjs(data.date_service).format('YYYY-MM-DD')
           }));
           setMessage(`${data.type} успешно добавлен!`);
           setOpen(true)
           reset({activitiesbefore: ""})
       }
    }

    return(
        <Grid container direction="column" justifyContent="center" alignItems="center" columnSpacing={{xs:1,sm:2,md:3}}>
            {
                open &&
                    <CustomSnackBar
                        open
                        handleClose={()=>setOpen(false)}
                        error={error}
                        message={message}
                    />
            }
            <form action="" onSubmit={handleSubmit(onSubmitForm)} encType="multipart/form-data">
                <Grid item>
                <Controller
                    control={control}
                    name="rendering"
                    render={({field:{onChange}})=>(
                        <TextField
                            error={!!errors.rendering}
                            id="rendered"
                            type="date"
                            label="Дата заключения"
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
                            label="Дата окончания"
                            onChange={date=>onChange(date)}
                            defaultValue={editContract.ended || "" }
                            InputLabelProps={{
                                shrink:true
                            }}
                        />
                    )}
                />
                </Grid>

                <Grid item>
                    <Controller
                        control={control}
                        name="date_service"
                        render={({field:{onChange}})=>(
                            <TextField
                                id="date_service"
                                type="date"
                                label="Срок оказания услуг"
                                onChange={date=>onChange(date)}
                                defaultValue={editContract.date_servce|| ""}
                                InputLabelProps={{
                                    shrink:true
                                }}
                            />
                        )}
                    />
                    <TextField
                        fullWidth
                        id="number_contract"
                        label="Номер контракта"
                        margin="normal"
                        defaultValue={editContract.number_contract || ""}
                        {...register('number_contract')}
                    />
                    <TextField
                        fullWidth
                        required
                        id="description"
                        label="Предмет договора"
                        defaultValue={editable ? editContract.description : ""}
                        error={!!errors.description}
                        margin="normal"
                        {...register('description')}
                    />
                </Grid>
                <Grid item>
                    <Controller
                        name="sum"
                        control={control}
                        render={({field:{onChange}})=>(
                            <TextField
                                required
                                fullWidth
                                id="sum"
                                label="Сумма"
                                onChange={val=>onChange(val)}
                                error={!!errors.sum}
                                defaultValue={editable ? editContract.sum : ""}
                                margin="normal"
                                sx={{width:'555px'}}
                            />
                        )}
                    />
                </Grid>

                <Grid item>
                <Controller
                    control={control}
                    name="organization"
                    rules={{required:true}}
                    render={({field:{onChange,value}})=>(
                        <CustomAutoComplete
                            label="Выберите организацию"
                            value={value || organization.find(org=>org.label === editContract.organization) || editContract.organization}
                            options={organization}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="department"
                    rules={{required:true}}
                    render={({field:{onChange,value,ref}})=>(
                        <CustomAutoComplete
                            label="Выберите отделение"
                            value={value || department.find(dep=>dep.label === editContract.branch) || editContract.branch}
                            onChange={onChange}
                            options={department}
                        />
                    )}
                />
                 <TextField
                     maxRows={10}
                     rows={3}
                     multiline
                     variant="outlined"
                     margin="normal"
                     label="Заметки"
                    {...register('notice')}
                 />
                </Grid>
                <Grid item>
                    <h5>Выберите тип</h5>
                  <Controller
                    control={control}
                    name="type"
                    render={({field:{onChange,value}})=>(
                        <CustomAutoComplete
                            label="Выберите тип"
                            value={value ?? type.find(type=>type.label === editContract.type)}
                            options={type}
                            onChange={onChange}
                        />
                    )}
                  />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox
                                checked={editContract?.isProlongation === 1 ? true : false}
                                {...register('isProlongation')}
                            />}
                            label="Пролонгация" />
                    </FormGroup>
                    <Controller
                        name="file"
                        control={control}
                        render={({field:{onChange,value}})=>(
                            <Paper elevation={4}>
                                <InputLabel sx={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                                    <Input
                                        color="primary"
                                        type="file"
                                        inputProps={{
                                            accept:"application/pdf,application/vnd.ms-excel"
                                        }}
                                        style={{display:"none"}}
                                        onChange={({target})=>onChange(target.files[0])}
                                    />
                                    <label>{value?.name}</label>
                                    <Button
                                        component="span"
                                        color="primary"
                                        variant="contained"
                                        endIcon={
                                            <UploadFile/>
                                        }
                                    >
                                        Загрузить файл...
                                    </Button>
                                </InputLabel>
                            </Paper>
                        )}
                    />
                <Button variant="outlined" type="submit" onSubmit={onSubmitForm}>
                    {editable ? " Редактировать" : "Добавить"}
                </Button>
            </Grid>
            </form>
        </Grid>
    )
}

export default FormContract;