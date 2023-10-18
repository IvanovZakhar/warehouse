
import AppInfo from "../app-info/app-info";
import useWarehouseService from "../../services/warehouse-services";
import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import './orders-conditioners.scss'

const OrdersConditioners = () => {
    const [ordersOzn, setOrdersOzn] = useState([])
    const {getAllOrdersOZN} = useWarehouseService()
    const [checkedPostings, setCheckedPostings] = useState([]);

    useEffect(() => {  
        JSON.parse(localStorage.getItem('apiData')).forEach(item => {
            const headersOzn = {  
                'Client-Id': `${item.clientId}` ,
                'Api-Key': `${item.apiKey}`
             } 
             getAllOrdersOZN(headersOzn).then(data => setOrdersOzn(prevOzn => {
                return[...prevOzn, ...data]
                
             }))
        })
        let elems = JSON.parse(localStorage.getItem('readyPosting')) || [];
        setCheckedPostings(elems.map(item => item.postingNumber))
    }, [])

    
    
    console.log(ordersOzn)
    const elems = ordersOzn.filter(item => item.productName.slice(0, 8) === 'Защитный' || item.productName.slice(0, 7) === 'Корзина' || item.warehouse.slice(0, 9) === 'ПАРГОЛОВО') 
    const sortedElems = elems.sort((a, b) => new Date(a.date) - new Date(b.date))
    
    function updateChecked(e, postingNumber) {
        let elems = JSON.parse(localStorage.getItem('readyPosting')) || [];
        const existingItem = elems.find(item => item.postingNumber === postingNumber);
        if (e.target.checked) {
            if (!existingItem) {
                elems.push({ postingNumber, checked: true });
            }
        } else {
            if (existingItem) {
                elems = elems.filter(item => item.postingNumber !== postingNumber);
            }
        }
        localStorage.setItem('readyPosting', JSON.stringify(elems));
        setCheckedPostings(elems.map(item => item.postingNumber)); // Обновляем массив checkedPostings
    }
    
    
    
   console.log(  )
    
    return(
        <div className="app">
            <AppInfo/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Номер отправления</th>
                        <th>Артикул</th>
                        <th>Название</th>
                        <th>Кол-во</th>
                        <th>Склад</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedElems.map((items, i) => {
                        const {postingNumber, date, productArt, productName, quantity, warehouse} = items;
                        const isChecked = checkedPostings.includes(postingNumber); 
                        return(
                            <tr> 
                                <td>{i+1}</td>
                                <td>{`${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`}</td>
                                <td>{postingNumber}</td> 
                                <td>{productArt}</td>
                                <td>{productName}</td>
                                <td>{quantity}</td>
                                <td>{warehouse}</td>
                                <td>{
                                       <input type="checkbox" 
                                              className="checker-orders" 
                                              id="scales" name="scales"  
                                              onClick={(e) => updateChecked(e, postingNumber)} 
                                              checked={isChecked}/> 
                                    }</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
        </div>
    )
}

export default OrdersConditioners;