import {useState,useEffect,useContext} from 'react'
import styles from './Info.module.scss'
import SubRows from "../SubRows/SubRows";
import Modal from "../Modal/Modal";
import {useDispatch,useSelector} from "react-redux";
import {action3} from "../../store/actions/action3";
import AppContext from "../../hooks/context";
import dayjs from "dayjs";

function Info({currentId,setCurrentId}){
    const dispatch = useDispatch()
    const [patientId,setPatientId] = useState(null)
    const state = useSelector((state)=>state.patient.patient);
    const {open,setOpen} = useContext(AppContext)
    const [modal,setModal] = useState(false)

    const currentPatientData = state.find(item=>item.id === patientId);
    useEffect(()=>{
         console.log(patientId)
        if(patientId && !currentPatientData){
            dispatch(action3(patientId))
        }
    },[patientId])

    const closeInfo=()=>{
        setOpen(false)
        setCurrentId(null)
    }
    return (
        <>
        <div className={`${styles.overlay} ${open ? styles.overlayVisible : ''} `} onClick={closeInfo}>
            <div className={styles.sidebar} onClick={e=>e.stopPropagation()}>
                <div className={styles.header}></div>
                <div className={styles.wrapper}>
                    <h1>Список услуг</h1>
                    <SubRows
                        current={currentId}
                        setModal={setModal}
                        setPatientId={setPatientId}
                    />
                </div>
            </div>
        </div>
       {modal &&
       <Modal
           onClose={setModal}
           title={"Список пациентов"}
       >
           {currentPatientData?.data?.length ?
               currentPatientData?.data?.map(item=>(
                   <div key={item.patient_id}>
                       <div>{item.fio}</div>
                       <div>{dayjs(item.birthday).format("DD.MM.YYYY")}</div>
                   </div>
               )) : (<div>Нет данных</div>)
           }
       </Modal>
       }
        </>
    )
}


export default Info