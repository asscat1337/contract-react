import {Autocomplete, TextField,createFilterOptions} from "@mui/material";
import React from "react";


export default function CustomAutoComplete({options,onChange,value,defaultValue = "",label}){
    const filter = createFilterOptions()
    return(
        <Autocomplete
            value={value || ""}
            options={options}
            onChange={(event,newValue)=>{
                if(newValue && newValue.inputValue){
                    onChange(newValue?.label)
                }
                onChange(newValue?.label)
            }}
            filterOptions={(options,params)=>{
                const filtered = filter(options,params)
                const {inputValue} = params
                const isExisting = options.some((option)=>inputValue === option.label)

                if(inputValue !== '' && !isExisting){
                    filtered.push({
                        label:inputValue
                    })
                }
                return filtered
            }}
            getOptionLabel={(option)=>{
                if(typeof option === 'string'){
                    return option
                }
                if(option.inputValue){
                    return option.inputValue
                }
                return option.label
            }}
            renderOption={(props,option)=><li {...props}>{option.label}</li>}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderInput={(params)=>(
                <TextField
                    {...params}
                    label={label}
                />
            )}
        />
    )
}