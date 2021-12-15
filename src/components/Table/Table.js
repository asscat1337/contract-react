import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {useTable,useFilters,useExpanded,useGlobalFilter,usePagination} from 'react-table'
import {Filter,DefaultColumnFilter,GlobalFilter} from "./Filter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import {CircularProgress} from "@mui/material";
import {Checkbox,Grid} from "@material-ui/core";
import {TableCheckboxes} from "./TableCheckboxes";

const defaultPropGetter = ()=>({});

function TableDashboard({columns,renderRowSubComponent,data,fetchData,getRowProps = defaultPropGetter,getCellProps = defaultPropGetter}){
    const controlledPageCount = useSelector(state=>state.dashboard.count);
    const loading = useSelector((state)=>state.dashboard.loading);
const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    state:{globalFilter,pageIndex,pageSize},
    visibleColumns,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    getToggleHideAllColumnsProps,
    allColumns
} = useTable(
    {
        columns,
        data,
        initialState:{pageIndex:0,pageSize:5},
        defaultColumn:{Filter:DefaultColumnFilter},
        manualPagination:true,
        pageCount:controlledPageCount,
        autoResetPage:false,
        expandSubRows:true
    },
    useFilters,useGlobalFilter,useExpanded,usePagination);

    useEffect(()=>{
            fetchData({pageIndex,pageSize});
    },[pageIndex,pageSize,fetchData]);

    const onChangeSelect=(event)=>{
        setPageSize(Number(event.target.value))
    }
    const onChangeInput=(event)=>{
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
    }

    if(loading){
        return <CircularProgress color="success"/>
    }

    return(
     <>
     <Grid container direction="row" justifyContent="flex-start">
         <Grid item>
             <label>
                 <TableCheckboxes {...getToggleHideAllColumnsProps()}/>
                 Скрыть все
             </label>
         </Grid>
         <Grid item>
             {allColumns.slice(1,10).map(column=>(
                     <label key={column.id}>
                         <Checkbox  {...column.getToggleHiddenProps()}/>
                         {column.id}
                     </label>
             ))}
         </Grid>
     </Grid>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
    <TableContainer component={Paper}>
     <Table {...getTableProps()} size={"small"} sx={{minWidth:600}}>
         <TableHead>
         {headerGroups.map(headerGroup=>(
             <TableRow {...headerGroup.getHeaderGroupProps()}>
                 {headerGroup.headers.map(column=>(
                     <TableCell {...column.getHeaderProps()}>
                         {column.render('Header')}
                         <Filter column={column}/>
                     </TableCell>
                 )
                 )}
             </TableRow>
         )
         )}
         </TableHead>
         <TableBody {...getTableBodyProps()}>
         {
             page.map((row)=>{
                 prepareRow(row)
                 const rowProps = row.getRowProps(getRowProps(row));
                 return(
                     <React.Fragment key={rowProps.key}>
                         <TableRow {...rowProps}>
                             {row.cells.map(cell=>{
                                 return  <TableCell {...cell.getCellProps(getCellProps(cell))}>
                                     {cell.render('Cell')}
                                 </TableCell>
                             }
                             )}
                         </TableRow>
                         {row.isExpanded ? (
                                 <TableRow>
                                     <TableCell colSpan={visibleColumns.length}>
                                         {renderRowSubComponent({row,rowProps,visibleColumns})}
                                     </TableCell>
                                 </TableRow>
                         ):null}
                     </React.Fragment>
                 )
             })
         }
         </TableBody>
     </Table>
    </TableContainer>
            <Stack direction="row" spacing="2">
                <Button variant="contained" onClick={()=>gotoPage(0)}>
                    {'<<'}
                </Button>
                <Button variant="contained" onClick={()=>gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </Button>
                <Button variant="contained" onClick={previousPage} disabled={!canPreviousPage}>
                    {'<'}
                </Button>
                <Button variant="contained" onClick={nextPage} disabled={!canNextPage}>
                    {'>'}
                </Button>
                <span>
                        Страница {pageIndex+1} из {pageOptions.length}
                    </span>
                <Select
                    onChange={(e)=>onChangeSelect(e)}
                    label="Количество"
                    value={pageSize}
                >
                    {[5,10,20,30,40,50].map(number=>(
                        <MenuItem value={number} key={number}>Показать {number}</MenuItem>
                    ))}
                </Select>
                <TextField
                    type="number"
                    variant="outlined"
                    defaultValue={pageIndex+1}
                    onChange={(e)=>onChangeInput(e)}
                />
            </Stack>
         </>
 )
}


export default TableDashboard