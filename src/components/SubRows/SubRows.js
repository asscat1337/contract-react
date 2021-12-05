import {Link} from "react-router-dom";
import {useTable} from 'react-table'
import action2 from "../../store/actions/action2";
import {useMemo,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
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
                    {roles == 1 && (
                        <Link to={`/patient/${row.original.services_id}`}>
                            Добавить пациента
                        </Link>
                    )}
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
                <table {...getTableProps()} className={styles.service}>
                    <thead>
                    {headerGroups.map(headerGroup=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column=>{
                                return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            })}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row,i)=>{
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell=>{
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
        </>
    )
}

export default SubRows