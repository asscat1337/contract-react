
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {actionAddPatient} from "../../store/actions/action3";
import {TextField,Button,Paper,Grid} from "@material-ui/core";

function Patient(){
    const params = useParams();
    const dispatch = useDispatch();
    const {contract_id,service_id} = params


    const schema = yup.object().shape({
        fio:yup.string().required(),
        birthday:yup.string().required(),
    });
    const {register,handleSubmit} = useForm({
        resolver:yupResolver(schema)
    });
    const onSubmit=data=>{
         dispatch(actionAddPatient({...data,id:contract_id,service_id}))
    };
    return(
                <Paper elevation={3} sx={{height:400,width:500,margin:'10px  auto'}}>
                <h1>Форма добавления пациента</h1>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <Grid container direction="column" alignContent="center" justifyContent="center">
                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="Введите ФИО..."
                                {...register('fio')}
                            />
                            <TextField
                                required
                                fullWidth
                                type="date"
                                {...register('birthday')}
                            />
                            <Grid item>
                                <Button type="submit" variant="contained" sx={{margin:1}}>
                                    Добавить пациента
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
    )
}


export default Patient