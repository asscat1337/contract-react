import React from "react";
import MuiAlert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import {IconButton} from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';


function CustomSnackBar({open,handleClose,message='',error=''}){
    const Alert = React.forwardRef((props,ref)=>{
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} action={<IconButton
            aria-label="close"
            color="inherit"
            sx={{p:0.5}}
            onClick={handleClose}
        >
            <CloseIcon/>
        </IconButton>}/>
    })
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{vertical:'top',horizontal:'right'}}
        >
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