import { useState, useEffect } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import WarehouseList from '../warehouse-list/warehouse-list'; 
import Logs from '../logs/logs';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from '../orders/orders';
import './app.css';
import Category from '../category/category';
import useWarehouseService from '../../services/warehouse-services';
import PrintTable from '../printTable/print-table';


const App = () => {
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const {getAllLogs, getAllProducts} = useWarehouseService()
    const [logs, setLogs] = useState([]) 
    const [data, setData] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [search, setSearch] = useState('')
 
    useEffect(()=> {
      getAllLogs().then(setLogs)
    }, [])
  

    useEffect(()=>{
        getAllProducts().then(data => {
            setData(data)
            setOriginalData(data)})
    }, [])

    useEffect(() => {
          setData(originalData.filter(item => {
            if (category === "Все"){
                return item
            }
            return item.category === category
          }))
    }, [category])

    useEffect(() => {
    
        const sortedByQuantityAsc = data.slice().sort((a, b) => a.quantity - b.quantity); 
        const sortedByQuantityDesc = data.slice().sort((a, b) => b.quantity - a.quantity);
        if(sort === 'По возрастанию'){
            setData(sortedByQuantityAsc)
        }else if(sort === 'По убыванию'){
            setData(sortedByQuantityDesc)
        }
    }, [sort])

    useEffect(() => {
        setData(originalData.filter(product =>
            product.article.toLowerCase().includes(search.toLowerCase())
          ))
    }, [search])
    
        return( 
            <BrowserRouter basename="/">
              <Routes>
                <Route path="/" element ={
                    <div className="app">
                        <AppInfo setShow={setShow}/>
                        <Logs show={show} setShow={setShow} logs={logs}/>
                        <div className="search-panel">
                            <SearchPanel  setSearch={setSearch}/>
                            
                        </div>
                        <Category category={category} setCategory={setCategory} setSort={setSort}/>
                        <WarehouseList category={category} logs={logs} sort={sort} data={data}/>
                            
                    </div>
                }/>  
                 <Route path="/orders" element ={ <Orders/>}/>
                 <Route path="/print-table" element ={ <PrintTable data={data} setCategory={setCategory} setSort={setSort} setShow={setShow}/>}/>
              </Routes>
            </BrowserRouter>
        )
    }
 

export default App;