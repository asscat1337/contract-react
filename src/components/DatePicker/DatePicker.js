import ruLocale from 'date-fns/locale/ru'
import {LocalizationProvider,DatePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {TextField} from "@mui/material";




function CustomDatePicker({label,value,onChange}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <DatePicker
                mask='__.__.____'
                onChange={onChange}
                label={label}
                value={value}
                renderInput={(params)=><TextField {...params}/>}
            />
        </LocalizationProvider>
    )

}



export default CustomDatePicker