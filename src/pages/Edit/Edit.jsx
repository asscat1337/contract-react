import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux";
import {actionsAddService,actionGetCurrentService,actionDeleteService,actionEditService} from "../../store/actions/actionsService";
import Modal from "../../components/Modal/Modal";
import FormService from "../../components/Form/FormService";
import styles from './Edit.module.scss';


function Edit(){
    const [open,setOpen] = useState(false);
    const [currentEdit,setCurrentEdit] = useState([]);
    const serviceData = useSelector(state=>state.dashboard.editableService);
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionGetCurrentService(params.id));
    },[]);

    const onSubmitForm=data=>{
       if(open) {
           dispatch(actionEditService(data))
       }else{
           return dispatch(actionsAddService({id:params.id,data}))
       }
    };
    const onEditService=(data)=>{
        setOpen(true);
        setCurrentEdit(data);
    }
    const onDeleteService=(data)=>{
        dispatch(actionDeleteService(data.services_id))
    }
    return (
        <div>
            {
                open && <Modal
                    onClose={setOpen}
                    title="Редактирование"
                >
                <div>
                    <h1>Hello</h1>
                    <FormService
                        onSubmitForm={onSubmitForm}
                        editData={currentEdit}
                        editable>
                        <input type="submit"/>
                    </FormService>
                </div>
                </Modal>
            }
            <h1>Форма редактирования контрактов и услуг</h1>
            {!open &&
                <FormService onSubmitForm={onSubmitForm}>
                    <input type="submit"/>
                </FormService>
            }
            <div className={styles.services}>
                {serviceData.length ? (
                    serviceData?.map(item=>(
                        <div key={item.services_id} className={styles.service}>
                            <div>{item.service_name}</div>
                            <div>{item.service_count}</div>
                            <div>{item.service_cost}</div>
                            <div className={styles.buttons}>
                                <button onClick={()=>onDeleteService(item)}>Удалить</button>
                                <button onClick={()=>onEditService(item)}>Редактировать</button>
                            </div>
                        </div>
                    ))
                ):(
                    <div>Нет данных</div>
                )}
            </div>
        </div>
    )
}


export default Edit