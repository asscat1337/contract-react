import React from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";


function CustomSnackBar({open,handleClose,message='',error=''}){
    console.log(message)
    const Alert = React.forwardRef((props,ref)=>{
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
    })
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {message ? (
                <Alert severity="success">
                    {message}
                </Alert>
            ):(
                <Alert severity="error">
                    {error}
                </Alert>
            )}
        </Snackbar>
    )
}


export default CustomSnackBar