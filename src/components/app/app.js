import { useState, useEffect } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel'; 
import WarehouseList from '../warehouse-list/warehouse-list'; 
import Logs from '../logs/logs';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from '../orders/orders';
import './app.css';
import Category from '../category/category';
import useWarehouseService from '../../services/warehouse-services';
import PrintTable from '../printTable/print-table';
import Button from 'react-bootstrap/Button'; 

const App = () => {
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const {getAllLogs, getAllProducts,  getAllOrders} = useWarehouseService()
    const [logs, setLogs] = useState([]) 
    const [data, setData] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [search, setSearch] = useState('')
    const [allOrders, setAllOrders] = useState([]) 
    const [articleSummaries, setArticleSummaries] = useState({});


    useEffect(()=>{
       
        getAllProducts().then(data => {
            setData(data)
            setOriginalData(data)
            getAllOrders().then(setAllOrders)
        })
      
        getAllLogs().then(setLogs)
    }, [])

    useEffect(()=> {
   
        const newArticleSummaries = allOrders.reduce((accumulator, order) => {
            if (order.status !== "Готов") {
              order.products.forEach(product => {
                const article = product.article;
                const quantity = product.quantity;
      
                if (accumulator.hasOwnProperty(article)) {
                  accumulator[article] += quantity;
                } else {
                  accumulator[article] = quantity;
                }
              });
            }
            return accumulator;
          }, {});
 
        setArticleSummaries(newArticleSummaries);
 
    }, [allOrders])

    useEffect(()=> {
        if (Object.keys(articleSummaries).length > 0 && data.length > 0) {
            const updatedData = data.map(item => {
              const article = item.article;
        
              if (articleSummaries.hasOwnProperty(article)) {
                return { ...item, orderQuantity: articleSummaries[article] };
              }
        
              return item;
            });
         
            setData(updatedData);
            setOriginalData(updatedData);
          }
    }, [articleSummaries])

    useEffect(() => {
          setData(originalData.filter(item => {
            if (category === "Все"){
                return item
            }else if (category === "В работе"){
                return item.orderQuantity
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
                 
                        <AppInfo />
                
                        <Logs show={show} setShow={setShow} logs={logs}/>
                        <div className="search-panel" >
                            <SearchPanel  setSearch={setSearch}/>
                            
                        </div>
             
                        <Category category={category} setCategory={setCategory} setSort={setSort} setShow={setShow}/>
                        <div className="d-grid gap-2">
                                  <Button size="lg"  variant="outline-primary" onClick={() => setShow(!show)} style={{height: '35px', padding: '1px',  color: 'black'}}>
                                    Общая история v
                                  </Button> 
                               </div>
                        <WarehouseList category={category} logs={logs} sort={sort} data={data} allOrders={allOrders}/>
                            
                    </div>
                }/>  
                 <Route path="/orders" element ={ <Orders allOrders={allOrders}/>}/>
                 <Route path="/print-table" element ={ <PrintTable data={data} setCategory={setCategory} setSort={setSort} setShow={setShow}/>}/>
              </Routes>
            </BrowserRouter>
        )
    }
 

export default App;