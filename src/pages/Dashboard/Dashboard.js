import {useCallback, useRef, useState, useMemo, useEffect} from 'react'
import Table from "../../components/Table/Table";
import Header from "../../components/Header/Header";
import style from "./Dashboard.module.scss"
import {SelectColumnFilter} from "../../components/Table/Filter";
import dayjs from "dayjs";
import Info from "../../components/Info/Info";
import AppContext from "../../hooks/context";
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import {actionDeleteContract, actionGetDashboard} from "../../store/actions/actionsDashboard";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

function Dashboard() {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.dashboard.data);
    const [open,setOpen] = useState(false);
    const [currentId,setCurrentId] = useState(null);
    const fetchIdRef = useRef(0);
    const fetchAPIData = ({page,size})=>{
        dispatch(actionGetDashboard({page,size}));
    };
    const fetchData = useCallback(({pageIndex,pageSize})=>{
        const fetchId = ++fetchIdRef.current;
        if(fetchIdRef.current === fetchId){
            fetchAPIData({
                size:pageSize,
                page:pageIndex*pageSize
            })
        }
    },[]);

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
                accessor:'contract_id'
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
                }).format(d.sum)
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
                accessor: (d)=>d.description
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
            },
            {
                Header:'Действия',
                accessor:"action",
                Filter:()=>null,
                Cell:({row})=>(
                         <>
                         <Button variant="outlined" size="small" startIcon={<DeleteIcon/>} color="error" onClick={()=>onDeleteContract(row.original)}>
                             Удалить
                         </Button>
                             <Button variant="outlined" size="small" startIcon={<EditIcon/>}>
                                 <Link to={`/edit/${row.original.contract_id}`}>Редактировать</Link>
                             </Button>
                         </>
                )
            }

        ],[open])
    const onShowInfo=(row)=>{
        setOpen(true)
        setCurrentId(row.original.contract_id)
    }
    const onDeleteContract=(current)=>{
        dispatch(actionDeleteContract(current.contract_id))
    };
    return(
        <AppContext.Provider value={{setOpen,open}}>
            <div className={style.content}>
                <Header/>
                {open &&
                <Info
                    currentId={currentId}
                />
                }
                <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                />
            </div>
        </AppContext.Provider>

    )
}


export default Dashboard