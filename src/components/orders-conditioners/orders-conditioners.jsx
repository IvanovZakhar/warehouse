
import AppInfo from "../app-info/app-info";
import useWarehouseService from "../../services/warehouse-services";
import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import './orders-conditioners.scss'
import InfoTableOrders from "../InfoTableOrders/InfoTableOrders";
import OtherProducts from "../other-products/other-products";

const OrdersConditioners = ( {logs, productsOrdersBarcode, allOrdersWB}) => {
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
                    warehouse: 'Яндекс' ,
                    company: order.company ? order.company : null
                })); 
         
                return [...result, ...orderItems]; 
            }, []); 
        
            setOrdersYandex(ordersYandex)
            setOrdersOzn(ordersOzon)
            setOrders([...ordersYandex,   ...ordersOzon]);     
        }); 
        }) 
      
        let elems = JSON.parse(localStorage.getItem('readyPosting')) || []; 
        setCheckedPostings(elems.map(item => item.postingNumber)) 
  
    }, []) 
 
    useEffect(() => {
        let elems = JSON.parse(localStorage.getItem('readyPosting')) || [];
        console.log(elems)
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
    
    
   
    function updateChecked(e, postingNumber, date) {
        let elems = JSON.parse(localStorage.getItem('readyPosting')) || [];
    
        // // Преобразовываем текущую дату в начало дня для корректного сравнения
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        // // Фильтруем массив, удаляем элементы с датами ранее сегодняшней
        elems = elems.filter(item => {
            const itemDate = convertStringToDate(item.date); 
            return itemDate >= today;
        });
    
        // Поиск существующего элемента
        const existingItem = elems.find(item => item.postingNumber === postingNumber);
    
        if (e.target.checked) {
            if (!existingItem) {
                elems.push({ postingNumber, checked: true, date });
            }
        } else {
            if (existingItem) {
                elems = elems.filter(item => item.postingNumber !== postingNumber);
            }
        }
    
        localStorage.setItem('readyPosting', JSON.stringify(elems));
        setCheckedPostings(elems.map(item => item.postingNumber)); // Обновляем массив checkedPostings
    }
    
    // Вспомогательная функция для конвертации строки даты в объект Date
    function convertStringToDate(dateString) {
        if (!dateString || typeof dateString !== 'string') {
            console.error('Некорректная дата:', dateString);
            return null; // Возвращает null для некорректных дат
        }
    
        const parts = dateString.split('.');
        if (parts.length !== 3) {
            console.error('Неверный формат даты:', dateString);
            return null; // Возвращает null для дат не в формате "DD.MM.YY" или "DD.MM.YYYY"
        }
    
        let [day, month, year] = parts;
        year = parseInt(year, 10);
        // Если год указан в формате "YY", предполагаем что это "20YY"
        if (year < 100) {
            year += 2000;
        }
    
        return new Date(year, month - 1, day); // Month - 1, потому что месяцы начинаются с 0
    } 
    
    return(
        <div className="app"> 
        

            <AppInfo/>
            <InfoTableOrders ordersOzn={ordersOzn} allOrdersYandex={ordersYandex} logs={logs} productsOrdersBarcode={productsOrdersBarcode} allOrdersWB={allOrdersWB}/>
            <OtherProducts />
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
                            <tr key={i}> 
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
                                              onClick={(e) => updateChecked(e, postingNumber, date)} 
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