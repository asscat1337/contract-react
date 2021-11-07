import Table from "../../components/Table/Table";
import Header from "../../components/Header/Header";
import style from "./Dashboard.module.scss"
import {useMemo, useState} from "react";
import {SelectColumnFilter} from "../../components/Table/Filter";
import dayjs from "dayjs";
import Info from "../../components/Info/Info";
import AppContext from "../../hooks/context";

function Dashboard() {
    const [open,setOpen] = useState(false)
    const [currentId,setCurrentId] = useState(null)
    const columns = useMemo(()=>
        [
            {
                Header:()=>null,
                id:'expander',
                Cell:({row})=>(
                    <button onClick={()=>onShowInfo(row)}>
                        { open ? 'Скрыть':'Показать'}
                    </button>
                ),
                SubCell:()=>null
            },
            {
                Header:'Номер контракта',
                accessor:'agreement_id'
            },
            {
                Header: 'Дата',
                accessor: (d)=>dayjs(d.date).format('YYYY-MM-DD')
            },
            {
                Header:"Сумма",
                accessor: (d)=>new Intl.NumberFormat("ru",{
                    style: "currency",
                    currency: "RUB",
                    minimumFractionDigits:2
                }).format(d.sum2)
            },
            {
                Header:"Дата заключения",
                accessor: (d)=>dayjs(d.validity).format('YYYY-MM-DD')
            },
            {
                Header:"Дата окончания",
                accessor: (d)=>dayjs(d.rendering).format('YYYY-MM-DD')
            },
            {
                Header:"Описание",
                accessor: "description"
            },
            {
                Header:"Отделение",
                accessor: "branch",
                Filter:SelectColumnFilter,
                filter:'equals'
            },
            {
                Header:"Организация",
                accessor: "organization"
            },
            {
                Header:"Тип",
                accessor: "type",
                Filter:SelectColumnFilter,
                filter:'equals'
            }

        ],[open])
    const onShowInfo=(row)=>{
        setOpen(true)
        setCurrentId(row.id)
    }
    // const SubRowsAsync=({row,rowProps,visibleColumns})=>{
    //     const {id} = row;
    //     return(
    //         <SubRows
    //             current={id}
    //         />
    //     )
    // }
    // const renderRowSubComponent = useCallback(({row,rowProps,visibleColumns})=>(
    //     <SubRowsAsync
    //         row={row}
    //         rowProps={rowProps}
    //         visibleColumns={visibleColumns}
    //     />
    // ),[])
    return(
        <AppContext.Provider value={{setOpen,open}}>
            <div className={style.content}>
                <div>Hello User</div>
                <Header/>
                {open &&
                <Info
                    currentId={currentId}
                />
                }
                <Table
                    columns={columns}
                />
            </div>
        </AppContext.Provider>

    )
}


export default Dashboard