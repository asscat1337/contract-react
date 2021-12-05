import {TextField,Button} from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from '@mui/lab/AdapterDayjs';




function FormContract(){
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form action="">
                <DesktopDatePicker
                    label="Дата начала"
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params)=><TextField {...params}/>}
                />
                <DesktopDatePicker
                    label="Дата окончания"
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params)=><TextField {...params}/>}
                />
                <TextField
                    required
                    id="description"
                    label="Описание"
                    defaultValue="Hello World"
                />
                <TextField
                    required
                    id="sum"
                    label="Сумма"
                    defaultValue="Hello World"
                />
            </form>
        </LocalizationProvider>
    )
}

export default FormContract