import React, {useCallback, useRef, useState, useMemo} from 'react'
import Table from "../../components/Table/Table";
import {SelectColumnFilter} from "../../components/Table/Filter";
import dayjs from "dayjs";
import Info from "../../components/Info/Info";
import AppContext from "../../hooks/context";
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import {actionDeleteContract, actionGetDashboard,actionEditDataContract,downloadFile} from "../../store/actions/actionsDashboard";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import {CssBaseline} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NumberFormat from "react-number-format";
import AlertDialog from "../../components/Modal/AlertDialog";

function Dashboard() {
    const dispatch = useDispatch();
    const roles = useSelector((state)=>state.auth.user.role);
    const branch = useSelector((state)=>state.auth.user.branch);
    const data = useSelector((state)=>state.dashboard.data);
    const [open,setOpen] = useState(false);
    const [confirmOpen,setConfirmOpen] = useState(false)
    const [currentId,setCurrentId] = useState(null);
    const fetchIdRef = useRef(0);


    const fetchAPIData = ({page,size})=>{
        dispatch(actionGetDashboard({page,size,branch,roles}));
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
    const onEditContract=(row)=>{
        dispatch(actionEditDataContract(row.original))
    }
    const onDownloadFile=(data)=>{
        downloadFile(data)
    }

    const columns = useMemo(()=>{
           const tableArray =  [
                {
                    Header:()=>null,
                    id:'expander',
                    Cell:({row})=>(
                        <Button onClick={()=>onShowInfo(row)} variant="outlined">
                            <ExpandMoreIcon/>
                        </Button>
                    ),
                    SubCell:()=>null
                },
                {
                    Header:'Номер ',
                    accessor:d=>d.contract_id
                },
                {
                    Header: 'Дата',
                    accessor: (d)=>dayjs(d.date).format('YYYY-MM-DD')
                },
                {
                    Header:"Сумма",
                    accessor: (d)=>d.sum,
                    Cell:({row})=>(
                        <NumberFormat value={row.original.sum} displayType="text" prefix="₽" thousandSeparator/>
                    )
                },
               {
                   Header:'Номер контракт',
                   accessor:(d)=>d.number_contract
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
                    accessor: d=>d.branch,
                    Filter:SelectColumnFilter,
                    filter:'equals'
                },
                {
                    Header:"Организация",
                    accessor: d=>d.organization
                },
                {
                    Header:"Тип",
                    accessor: d=>d.type,
                    Filter:SelectColumnFilter,
                    filter:'equals'
                },
               {
                   Header:"Файл",
                   accessor:()=>null,
                   Cell:({row})=>(
                      row.original.filename ? (
                          <Button onClick={()=>onDownloadFile(row.original)}>
                              Скачать файл
                          </Button>
                      ):""
                   )
               }
            ];
        if(roles === 2){
            return [...tableArray,
                {
                    Header:'Действия',
                    accessor:"action",
                    Filter:()=>null,
                    Cell:({row})=>(
                        <>
                                <>
                                    <Button variant="outlined" size="small" startIcon={<DeleteIcon/>} color="error" onClick={()=>onOpenConfirm(row.original)}>
                                        Удалить
                                    </Button>
                                    <Button variant="outlined" size="small" startIcon={<EditIcon/>} onClick={()=>onEditContract(row)}>
                                        <Link to={`/edit/${row.original.contract_id}`}>Редактировать</Link>
                                    </Button>
                                </>
                        </>
                    )
                }]
        }
        return tableArray
    }
        ,[open]);
    const onShowInfo=(row)=>{
        setOpen(true);
        setCurrentId(row.original.contract_id)
    }

    const onOpenConfirm=(current)=>{
        setConfirmOpen(true);
        setCurrentId(current.contract_id)
    }

    const onCloseConfirm=()=>{
        setConfirmOpen(false)
    };

    const onConfirmDelete=()=>{
        dispatch(actionDeleteContract(currentId));
        setCurrentId(null)
    }

    return(
        <AppContext.Provider value={{setOpen,open}}>
            <CssBaseline/>
            <h1>Журнал регистрации контрактов и договоров</h1>
            <div>
                {open &&
                <Info
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                />
                }
                {
                    confirmOpen &&
                    <AlertDialog
                        open={confirmOpen}
                        onClose={onCloseConfirm}
                        onConfirmDelete={onConfirmDelete}
                    />
                }
                <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    getRowProps={row=>({
                        style:{
                            background:dayjs(row.original.ended).isBefore(dayjs(new Date())) ? red[300] : '',
                        }
                    })}
                    getCellProps={cell=>({
                        style: {
                            color: dayjs(cell.row.original.ended).isBefore(dayjs(new Date())) ? red[50] : '',
                        }
                    })}
                />
            </div>
        </AppContext.Provider>
    )
}


export default Dashboard