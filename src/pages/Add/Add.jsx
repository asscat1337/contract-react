import {useEffect} from 'react'
import styles from './Add.module.scss';
import {useSelector,useDispatch} from "react-redux";
import {getOrganization} from '../../store/actions/actionsOrganization'
import {getDepartment} from "../../store/actions/actionsDepartment";
import FormContract from '../../components/Form/FormContract'
import {CssBaseline} from "@mui/material";
import {actionGetType} from "../../store/actions/actionsTypes";

function Add(){
    const organization = useSelector(state=>state.organization.organization);
    const department = useSelector(state=>state.department.department);
    const type = useSelector(state=>state.type.types)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(!department.length || ! organization.length || !type.length){
            dispatch(getOrganization());
            dispatch(getDepartment())
            dispatch(actionGetType())
        }
    },[])
    return (
        <div className={styles.formContent}>
            <CssBaseline/>
            <h1>Форма добавления контракта/договора</h1>
                <FormContract/>
        </div>
    )
}


export default Add