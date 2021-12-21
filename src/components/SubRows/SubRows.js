import {Link} from "react-router-dom";
import {useTable} from 'react-table'
import action2 from "../../store/actions/action2";
import {useMemo,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {TableCell,TableBody,TableRow,TableHead,TableContainer,Table} from "@mui/material";
import styles from './SubRows.module.scss'


function SubRows({current,setModal,testCurrentId}) {
    const dispatch = useDispatch();
    const roles = useSelector(state=>state.auth.user.role);
    const data = useSelector(state=>state.dashboard.data.find(item=>item.contract_id === current));
    const loading = useSelector(state=>state.dashboard.loading);
    const {children} = data;
    useEffect(()=>{
        if(!children.length){
            dispatch(action2(current))
       }
    },[data])
    const onShowModal=(row)=>{
        const {services_id} = row.original
        setModal(true)
         testCurrentId(services_id)
    }
    const columns = useMemo(()=>[
        {
            Header:'Номер услуги',
            accessor:(d)=>d.services_id
        },
        {
            Header:'Название',
            accessor:(d)=>d.service_name
        },
        {
            Header:'Цена',
            accessor:(d)=>d.service_cost
        },
        {
            Header:'Количество',
            accessor:(d)=>d.service_count
        },
        {
            Header:'Остаток',
            accessor:(d)=>d.service_left
        },
        {
            Header:()=>null,
            accessor: 'modal',
            Cell:({row})=>(
                <>
                    <a href="#" onClick={()=>onShowModal(row)}>Показать пациентов</a>
                    {Number(roles) === 1 && row.original.service_left !== 0 ? (
                                <Link to={`/patient/${row.original.services_id}`}>
                                    Добавить пациента
                                </Link>
                    ) : null}
                </>
            )
        }

    ],[])
    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        rows,
        prepareRow
    } = useTable({
        data:children || {},
        columns
    })
    if(loading){
        return (
          <div>
              Загрузка...
          </div>
        )
    }
    return (
        <>
                <TableContainer {...getTableProps()} className={styles.service}>
                    <Table>
                    <TableHead>
                    {headerGroups.map(headerGroup=>(
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column=>{
                                return <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                            })}
                        </TableRow>
                    ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                    {
                        rows.map((row,i)=>{
                            prepareRow(row)
                            return(
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell=>{
                                        return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    })}
                                </TableRow>
                            )
                        })
                    }
                    </TableBody>
                    </Table>
                </TableContainer>
        </>
    )
}

export default SubRows