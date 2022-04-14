import {useMemo} from 'react'
import TextField from "@mui/material/TextField";
function GlobalFilter({value,onChangeFilter}){

    return(
        <TextField
            fullWidth
            value={value || ""}
            onChange={e=>onChangeFilter(e.target.value)}
            id="standard-basic"
            label="Поиск..."
            placeholder={`Поиск...`}
            variant="standard"
        />
    )
}
function Filter({column}){
    return(
        <div style={{marginTop:5}}>
            {column.canFilter && column.render("Filter")}
        </div>
    )
}

function DefaultColumnFilter(
    {column:{filterValue,setFilter,preFilteredRows:{length}}
    }) {
return (
    <input
        type="text"
        value={filterValue || ''}
        onChange={e=>{
        setFilter(e.target.value.toString() || undefined)}
        }
        placeholder={` Поиск ${length}...`}
    />
)
}

function SelectColumnFilter(
    {column:{filterValue,setFilter,preFilteredRows,id}
    }) {
    const options = useMemo(()=>{
        const options = new Set()
        preFilteredRows.forEach(row=>{
            options.add(row.values[id])
        })
        return [...options.values()]
    },[id,preFilteredRows])
    return(
        <select
            value={filterValue}
            onChange={e=>{
                setFilter(e.target.value || undefined)
        }}
        >
            <option value="">Все</option>
            {options.map((option,i)=>{
                return <option key={i} value={option}>
                    {option}
                </option>
            })}
        </select>
    )
}
export {Filter,SelectColumnFilter,DefaultColumnFilter,GlobalFilter}