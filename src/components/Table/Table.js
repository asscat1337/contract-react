import React,{useEffect,useMemo} from 'react'
import {useTable,useFilters,useExpanded} from 'react-table'
import {useDispatch,useSelector} from 'react-redux'
import action1 from "../../store/actions/action1";
import {Filter,DefaultColumnFilter,SelectColumnFilter} from "./Filter";
import style from './Table.module.scss'

function Table({columns,renderRowSubComponent}){
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.dashboard.data)
    useEffect(()=>{
        dispatch(action1())
    },[])

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    visibleColumns,
    prepareRow,
} = useTable(
    {
        columns,
        data,
        defaultColumn:{Filter:DefaultColumnFilter},
        expandSubRows:true
    },
    useFilters,useExpanded)

 return(
     <table {...getTableProps()} className={style.contract}>
         <thead>
         {headerGroups.map(headerGroup=>(
             <tr {...headerGroup.getHeaderGroupProps()}>
                 {headerGroup.headers.map(column=>(
                     <th {...column.getHeaderProps()}>
                         {column.render('Header')}
                         <Filter column={column}/>
                     </th>
                 )
                 )}
             </tr>
         )
         )}
         </thead>
         <tbody {...getTableBodyProps()}>
         {
             rows.map((row,i)=>{
                 prepareRow(row)
                 const rowProps = row.getRowProps();
                 return(
                     <React.Fragment key={rowProps.key}>
                         <tr {...rowProps}>
                             {row.cells.map(cell=>(
                                 <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                             ))}
                         </tr>
                         {row.isExpanded ? (
                                 <tr>
                                     <td colSpan={visibleColumns.length}>
                                         {renderRowSubComponent({row,rowProps,visibleColumns})}
                                     </td>
                                 </tr>
                         ):null}
                     </React.Fragment>
                 )
             })
         }
         </tbody>
     </table>
 )
}


export default Table