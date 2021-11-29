import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";

function Patient(){
    const params = useParams();
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        fio:yup.string().required(),
        birthday:yup.string().required(),
    });
    const {register,handleSubmit} = useForm({
        resolver:yupResolver(schema)
    });
    const onSubmit=data=>{
        console.log(data);
        console.log(params)
    };
    return(
        <div>
            <h1>Форма добавления пациента</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Введите ФИО..."
                    {...register('fio')}
                />
                <input
                    type="date"
                    {...register('birthday')}
                />
                <input type="submit"/>
            </form>
        </div>
    )
}


export default Patient