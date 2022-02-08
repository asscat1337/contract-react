import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux";
import {actionsAddService,
    actionGetCurrentService,
    actionDeleteService,
    actionEditService
} from "../../store/actions/actionsService";
import Modal from "../../components/Modal/Modal";
import FormService from "../../components/Form/FormService";
import {CssBaseline,Grid,Paper,Box,Button,CircularProgress} from "@mui/material";
import FormContract from "../../components/Form/FormContract";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import {red} from "@material-ui/core/colors";


function Edit(){

    /// TODO : исправить редактирование услуги,применив Redux вместо useStates

    const [open,setOpen] = useState(false);
    const [currentEdit,setCurrentEdit] = useState([]);
    const serviceData = useSelector(state=>state.dashboard.editableService);
    const editContract = useSelector(state=>state.dashboard.editContract)
    const isLoading = useSelector(state=>state.dashboard.loading)
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionGetCurrentService(params.id));
    },[]);


    const onSubmitForm=data=>{
        console.log(data)
       if(open) {

           const editObject = {
               ...data,
               service_id:currentEdit.service_id,id:params.id,
               prevSumService:currentEdit.service_cost
           }
           dispatch(actionEditService(editObject))
           setCurrentEdit(editObject)
       }else{
           return dispatch(actionsAddService({id:params.id,data}))
       }
    };
    const onEditService=(data)=>{
        setOpen(true);
        setCurrentEdit(data);
    }
    const onDeleteService=(data)=>{
        dispatch(actionDeleteService(data))
    }

    if(isLoading){
        return <CircularProgress/>
    }

    return (
        <Box sx={{flexGrow:1}}>
            <h5>Форма редактирования контрактов и услуг</h5>
            <h5>Остаток составляет {editContract.sum_left}. Полная сумма - {editContract.sum}</h5>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
            <CssBaseline/>
            <Grid item xs={6}>
                {
                    open && <Modal
                        onClose={setOpen}
                        title="Редактирование"
                    >
                        <div>
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
                <Box sx={{height:450,width:565}}>
                    <Paper elevation={5} sx={{p:1,m:1}}>
                        <h4>Форма добавления услуги</h4>
                        <FormService onSubmitForm={onSubmitForm}>
                            <Button type="submit" variant="outlined">
                                Добавить услугу
                            </Button>
                        </FormService>
                    </Paper>
                </Box>
            }
            <Box sx={{height:650,width:565}} >
                <Paper elevation={5} sx={{p:3.5}}>
                    <h4>Форма редактирования контракт/договора </h4>
                    <FormContract
                        editContract={editContract}
                        editable={true}
                    />
                </Paper>
            </Box>
            </Grid>
            <Grid sx={{height:'130vh'}} item xs={3.5}>
                <h5>Список услуг</h5>
                {serviceData?.length ? (
                    serviceData?.map(item=>(
                        <Paper key={item.service_id} sx={{background:dayjs(item.date_rendering).isBefore(dayjs(new Date())) ? red[300]:''}}>
                            <div>Название услуги:{item.service_name}</div>
                            <div>Количество:{item.service_count}</div>
                            <div>Стоимость услуги:
                                <NumberFormat value={item.service_cost} displayType="text" prefix="₽" thousandSeparator/>
                            </div>
                            <div>Срок оказания:{item.date_rendering}</div>
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