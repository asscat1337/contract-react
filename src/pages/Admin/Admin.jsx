import React from "react";
import dayjs from "dayjs";
import FormRegister from "../../components/Form/FormRegister";
import {useSelector,useDispatch} from "react-redux";
import {actionGetUser,actionDeleteUser} from "../../store/actions/actionsAdmin";
import {actionsUploadDepartment} from "../../store/actions/actionsDepartment";
import {Paper,Button,Input,InputLabel} from "@material-ui/core";
import FormAddDepartment from "../../components/Form/FormDepartment";

function Admin() {
    const dispatch = useDispatch()
    const users = useSelector(state=>state.admin.list);


    React.useEffect(()=>{
        dispatch(actionGetUser())
    },[])

    const onDeleteUser=(user)=>{
        dispatch(actionDeleteUser(user))
    }

    const onChange=({target})=>{
        dispatch(actionsUploadDepartment(target.files[0]))
    }

    return(
        <div>
            <h1>Admin</h1>
            <h1>Форма регистрация пользователя</h1>
            <FormRegister/>
            <h1>Список пользователей</h1>
            <div>
                {users.map(user=>(
                    <Paper elevation={4} key={user.user_id}>
                        <div>{user.fio}</div>
                        <div>{user.login}</div>
                        <div>{dayjs(user.birthday).format('YYYY-MM-DD')}</div>
                        <Button variant="contained" color="error" onClick={()=>onDeleteUser(user.user_id)}>
                            Удалить
                        </Button>
                    </Paper>
                ))}
            </div>
            <div>
                <h1>Загрузить список </h1>
                <>
                    <InputLabel htmlFor="import-button">
                       <Input
                            id="import-button"
                            inputProps={{
                                accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            }}
                            style={{display:"none"}}
                            onChange={onChange}
                            type="file"
                       />
                       <Button
                        color="secondary"
                        variant="contained"
                        component="span"
                       >
                           Загрузить файл...
                       </Button>

                    </InputLabel>
                </>
            </div>
            <h5>Добавить отделение</h5>
            <FormAddDepartment/>
        </div>
    )
}
export default Admin