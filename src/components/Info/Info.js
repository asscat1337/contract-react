import {useState,useEffect,useContext} from 'react'
import styles from './Info.module.scss'
import SubRows from "../SubRows/SubRows";
import Modal from "../Modal/Modal";
import {useDispatch,useSelector} from "react-redux";
import action3 from "../../store/actions/action3";
import AppContext from "../../hooks/context";

function Info({currentId}){
    const dispatch = useDispatch()
    const state = useSelector((state)=>state.patient.patient)
    const {open,setOpen} = useContext(AppContext)
    const [modal,setModal] = useState(false)
    const [patientId,testCurrentId] = useState(null)
    useEffect(()=>{
        if(patientId){
            dispatch(action3(patientId))
        }
    },[patientId])

    const closeInfo=()=>{
        setOpen(false)
    }
    return (
        <>
        <div className={`${styles.overlay} ${open ? styles.overlayVisible : ''} `} onClick={closeInfo}>
            <div className={styles.sidebar} onClick={e=>e.stopPropagation()}>
                <div className={styles.header}></div>
                <div className={styles.wrapper}>
                    <h1>Hello</h1>
                    <SubRows
                        current={currentId}
                        setModal={setModal}
                        testCurrentId={testCurrentId}
                    />
                </div>
            </div>
        </div>
       {modal && <Modal
           onClose={setModal}
           title={"Список пациентов"}
           data={state}/> }
        </>
    )
}


export default Info