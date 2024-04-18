
import AppInfo from "../app-info/app-info";
import useWarehouseService from "../../services/warehouse-services";
import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import './orders-conditioners.scss'
import InfoTableOrders from "../InfoTableOrders/InfoTableOrders";

const OrdersConditioners = () => {
    const [orders, setOrders] = useState([])
    const {getAllOrdersOZN, getAllOrdersYandex } = useWarehouseService()
    const [checkedPostings, setCheckedPostings] = useState([]);
    const [ordersYandex, setOrdersYandex] = useState([])
    const [ordersOzn, setOrdersOzn] = useState([])

    useEffect(() => {   
        
        getAllOrdersOZN().then(ordersOzon => {
            getAllOrdersYandex(49023774) 
            .then(dataYandex => { 
            const processOrders = dataYandex.filter(item => item.status === 'PROCESSING') 
            
            const ordersYandex = processOrders.reduce((result, order) => { 
                const orderItems = order.items.map(item => ({ 
                    postingNumber: order.id, 
                    date: `${order.delivery.shipments[0].shipmentDate.slice(0,2)}.${order.delivery.shipments[0].shipmentDate.slice(3,5)}.${order.delivery.shipments[0].shipmentDate.slice(8,11)}`, 
                    productArt: item.offerId, 
                    productName: item.offerName, 
                    quantity: item.count, 
                    warehouse: 'Яндекс' 
                })); 
         
                return [...result, ...orderItems]; 
            }, []); 
        
                getAllOrdersYandex(77640946) 
                    .then(dataYandexLarge => { 
                    const processOrders = dataYandexLarge.filter(item => item.status === 'PROCESSING') 
                    
                    const ordersYandexLarge = processOrders.reduce((result, order) => { 
                        const orderItems = order.items.map(item => ({ 
                            postingNumber: order.id, 
                            date: `${order.delivery.shipments[0].shipmentDate.slice(0,2)}.${order.delivery.shipments[0].shipmentDate.slice(3,5)}.${order.delivery.shipments[0].shipmentDate.slice(8,11)}`, 
                            productArt: item.offerId, 
                            productName: item.offerName, 
                            quantity: item.count, 
                            warehouse: 'Яндекс' ,
                            company: "КГТ"
                        })); 
                
                        return [...result, ...orderItems]; 
            }, []); 
            setOrdersYandex([...ordersYandex, ...ordersYandexLarge])
            setOrdersOzn(ordersOzon)
            setOrders([...ordersYandex, ...ordersYandexLarge, ...ordersOzon, ]);     
          
            }); 
        }); 
        }) 
      
        let elems = JSON.parse(localStorage.getItem('readyPosting')) || []; 
        setCheckedPostings(elems.map(item => item.postingNumber)) 
  
    }, []) 
 
   
  
    function parseDate(str) { 
        const [day, month, year] = str.split('.').map(Number); 
        // Добавляем 2000 к двузначному году 
        return new Date(year + 2000, month - 1, day); 
      } 
   
    const elems = orders.filter(item => item.productName.slice(0, 8) === 'Защитный'  
                                        || item.productName.slice(0, 7) === 'Корзина'     
                                        || item.productArt.slice(0, 4) === 'AR46'  
                                        || item.productArt.slice(0, 4) === 'AR18' 
                                        || item.productArt == 'AR75254Ц007-06' 
                                        || item.productArt == 'AR75354Ц007-06' 
                                        || item.productArt == 'AR75554Ц007-06' 
                                        || item.productArt == 'AR75654Ц007-06') 
    const newElem = elems.filter(item => item.productArt !== 'кб850' && item.productArt !== 'кб850У'); 
    const sortedElems = newElem.sort((a, b) => parseDate(a.date) - parseDate(b.date))
    
    
   
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
    
     
    
     
    
    return(
        <div className="app">
           <InfoTableOrders ordersOzn={ordersOzn} allOrdersYandex={ordersYandex}/>
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
                                <td>{date}</td>
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