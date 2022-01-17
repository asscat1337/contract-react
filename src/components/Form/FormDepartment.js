import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {TextField, Button, Paper} from "@material-ui/core";
import {actionsAddDepartment} from "../../store/actions/actionsDepartment";

function FormAddDepartment() {
    const dispatch = useDispatch();
    const schema = yup.object().shape({
        department:yup.string().required()
    })

    const {register,handleSubmit} = useForm({
        resolver:yupResolver(schema)
    })

    const onSubmit=(data)=>{
       dispatch(actionsAddDepartment(data))
    };

    return (
        <Paper elevation={4}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    required
                    label="Введите отделение..."
                    {...register('department')}
                />
                <Button variant="contained" type="submit">
                    Добавить отделение
                </Button>
            </form>
        </Paper>
    )
}


export default FormAddDepartment