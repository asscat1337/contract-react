import React from "react";
import dayjs from "dayjs";
import FormRegister from "../../components/Form/FormRegister";
import {useSelector,useDispatch} from "react-redux";
import {actionGetUser,actionDeleteUser} from "../../store/actions/actionsAdmin";
import {Paper,Button} from "@material-ui/core";

function Admin() {
    const dispatch = useDispatch()
    const users = useSelector(state=>state.admin.list);


    React.useEffect(()=>{
        dispatch(actionGetUser())
    },[])

    const onDeleteUser=(user)=>{
        dispatch(actionDeleteUser(user))
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
        </div>
    )
}
export default Admin