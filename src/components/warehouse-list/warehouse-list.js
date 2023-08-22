 
import WarehouseListItem  from "../warehouse-list-item/warehouse-list-item" 
import { useEffect, useState } from 'react';
import useWarehouseService from '../../services/warehouse-services';
import './warehouse-list.css'
const WarehouseList = () => {
  
    const {getAllProducts} = useWarehouseService()
    const [data, setData] = useState([])

    useEffect(()=>{
        getAllProducts().then(setData)
    }, [])
    
    
        const elements = data.map(item => {
       
               
            return (
                    <WarehouseListItem key={item._id} data={item}/>
                    )
            })
            
            return(
                <ul className="app-list list-group">
        
                   {elements}
                </ul>
            )
    }
 

export default WarehouseList;