import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux";
import {actionsAddService,actionGetCurrentService,actionDeleteService,actionEditService} from "../../store/actions/actionsService";
import Modal from "../../components/Modal/Modal";
import FormService from "../../components/Form/FormService";
import {CssBaseline,Grid,Paper,Box,Button} from "@mui/material";
import FormContract from "../../components/Form/FormContract";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


function Edit(){
    const [open,setOpen] = useState(false);
    const [currentEdit,setCurrentEdit] = useState([]);
    const serviceData = useSelector(state=>state.dashboard.editableService);
    const editContract = useSelector(state=>state.dashboard.editContract)
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
        <Box sx={{flexGrow:1}}>
            <h5>Форма редактирования контрактов и услуг</h5>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
            <CssBaseline/>
            <Grid item xs={5}>
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
                                <Button type="submit">
                                    Редактировать
                                </Button>
                            </FormService>
                        </div>
                    </Modal>
                }
            {!open &&
                <Box sx={{height:350}}>
                    <Paper elevation={5} sx={{p:1}}>
                        <h4>Форма добавления услуги</h4>
                        <FormService onSubmitForm={onSubmitForm}>
                            <Button type="submit" variant="outlined">
                                Добавить услугу
                            </Button>
                        </FormService>
                    </Paper>
                </Box>
            }
            <Box sx={{height:550}}>
                <Paper elevation={5} sx={{p:4}}>
                    <h4>Форма редактирования контракт/договора </h4>
                    <FormContract
                        editContract={editContract}
                        editable={true}
                    />
                </Paper>
            </Box>
            </Grid>
            <Grid sx={{height:'130vh'}}>
                <h5>Список услуг</h5>
                {serviceData?.length ? (
                    serviceData?.map(item=>(
                        <Paper key={item.services_id}>
                            <div>Название услуги:{item.service_name}</div>
                            <div>Количество:{item.service_count}</div>
                            <div>Стоимость услуги:{item.service_cost}</div>
                            <div>
                                <Button
                                    onClick={()=>onDeleteService(item)}
                                    color="error"
                                    startIcon={<DeleteForeverIcon/>}
                                >
                                    Удалить
                                </Button>
                                <Button
                                    onClick={()=>onEditService(item)}
                                    startIcon={<EditIcon/>}
                                >
                                    Редактировать
                                </Button>
                            </div>
                        </Paper>
                    ))
                ):(
                    <div>Нет данных  😞</div>
                )}
            </Grid>
        </Grid>
        </Box>
    )
}


export default Edit