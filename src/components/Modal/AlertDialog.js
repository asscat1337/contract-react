import React from "react";
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Slide} from '@mui/material'


const Transition = React.forwardRef((props,ref)=>(
    <Slide direction="up" ref={ref} {...props}/>
))

function AlertDialog({open,onClose,onConfirmDelete}){
    return(
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={onClose}>
            <DialogTitle>
                Подтверждение
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы уверены что хотите это сделать?...
                </DialogContentText>
                <DialogActions>
                    <Button variant={"outlined"} color={"error"} onClick={onConfirmDelete}>Удалить</Button>
                    <Button variant={"outlined"} color={"secondary"} onClick={onClose}>Закрыть</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}


export default AlertDialog