import React from 'react'


export function useDebounce(value,ms){
   const [debounceValue,setDebounceValue] = React.useState(value)

    React.useEffect(()=>{

        const searchTime=setTimeout(()=>{
            setDebounceValue(value)
        },ms)

        return ()=>{
           clearTimeout(searchTime)
        }

    },[value])

    return debounceValue
}

