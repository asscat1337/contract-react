import React, {useState} from "react";
import {useForm,Controller} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useSelector,useDispatch}  from "react-redux";
import {TextField,Button,FormGroup,FormControlLabel,Checkbox,FormHelperText,Grid} from "@mui/material";
import Select from 'react-select'
import NumberFormat from "react-number-format";
import {getDepartment} from "../../store/actions/actionsDepartment";
import {getOrganization} from "../../store/actions/actionsOrganization";
import {actionGetType} from "../../store/actions/actionsTypes";
import {actionAddDashboard,actionEditContract,actionAddContractFromFile} from "../../store/actions/actionsDashboard";


const NumberFormatCustom = React.forwardRef((props,ref)=>{
    const {onChange,...other} = props
    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values)=>{
                onChange({
                    target:{
                        name:props.name,
                        value:values.value
                    }
                })
            }}
            thousandSeparator
            isNumericString
            prefix="₽"
        />
    )
})


function FormContract({editContract = {},editable = false}){
    // const [onFile,onChangeFile] = useState(null)
    const schema = yup.object().shape({
         // костыль
         sum:editable ? yup.number() : yup.number().required('Введите сумма'),
         description: editable ? yup.string() : yup.string().required('Введите описание'),
         rendering: editable ? yup.date() : yup.date().required('Выберите дату начала'),
         department:editable ? yup.string(): yup.string().required('Выберите отделение') ,
         organization:editable ? yup.string() : yup.string().required('Выберите организацию'),
         ended:editable ? yup.date() : yup.date().required('Выберите дату окончания'),
         type:editable ? yup.string() : yup.string().required()
        //

    });
    const {register,handleSubmit,control,formState:{errors},reset} = useForm({
        resolver:yupResolver(schema)
    });
    const dispatch = useDispatch();
    const organization = useSelector(state=>state.organization.organization);
    const department = useSelector(state=>state.department.department);
    const type = useSelector(state=>state.type.types);


    // const onChange=({target})=>{
    //     onChangeFile(target.files[0])
    // };
    //
    // const onClickAddFiles=()=>{
    //     dispatch(actionAddContractFromFile(onFile))
    // }

    const onSubmitForm=(data)=>{
       if(editable){
       const transformedEdit =  {
            ...data,
            id:editContract.contract_id,
            organization:data.organization ?? editContract.organization,
            branch:data.department ?? editContract.branch,
            ended:data.ended ?? editContract.ended,
            rendering: data.rendering ?? editContract.rendering,
            sum:data.sum ?? editContract.sum,
            type:data.type ?? editContract.type
        };
          dispatch(actionEditContract(transformedEdit))
       }else{
           dispatch(actionAddDashboard(data));
           reset({})
       }
    }

    return(
        <Grid container direction="column" justifyContent="center" alignItems="center" columnSpacing={{xs:1,sm:2,md:3}}>
            <form action="" onSubmit={handleSubmit(onSubmitForm)}>
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
                                fullWidth
                                id="sum"
                                label="Сумма"
                                onChange={val=>onChange(val)}
                                error={!!errors.sum}
                                defaultValue={editable ? editContract.sum : ""}
                                margin="normal"
                                // InputProps={{
                                //     inputComponent:NumberFormatCustom
                                // }}
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
                        <Select
                            placeholder="Выберите организацию..."
                            defaultValue={organization.find(org=>org.label === editContract.organization)}
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
                            placeholder="Выберите отделение..."
                            defaultValue={department.find(dep=>dep.label === editContract.branch)}
                            onChange={val=>onChange(val.label)}
                            isClearable
                            isSearchable
                            options={department}
                        />
                    )}
                />
                </Grid>
                <Grid item>
                    <h5>Выберите тип</h5>
                  <Controller
                    control={control}
                    name="type"
                    render={({field:{onChange}})=>(
                        <Select
                            placeholder="Выберите тип..."
                            options={type}
                            onChange={v=>onChange(v.label)}
                        />
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