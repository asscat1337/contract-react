import React from "react";
import {Checkbox} from "@material-ui/core";



 export const TableCheckboxes = React.forwardRef(({indeterminate,...rest},ref)=>{
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(()=>{
            resolvedRef.current.indeterminate = indeterminate
        },[])
        return <Checkbox ref={resolvedRef} {...rest}/>
    })




