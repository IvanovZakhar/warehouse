
import AppInfo from "../app-info/app-info";
import useWarehouseService from "../../services/warehouse-services";
import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import InfoTableOrders from "../InfoTableOrders/InfoTableOrders";
import OtherProducts from "../other-products/other-products";
import FilterCategory from "./filter-category/filter-category"; 
import Spinner from 'react-bootstrap/Spinner';
import { ClipLoader } from 'react-spinners';
import './orders-conditioners.scss'

const OrdersConditioners = ( {logs, productsOrdersBarcode, allOrdersWB}) => {
    const [orders, setOrders] = useState([])
    const {getAllOrdersOZN, getAllOrdersYandex, loading } = useWarehouseService()
    const [checkedPostings, setCheckedPostings] = useState([]);
    const [ordersYandex, setOrdersYandex] = useState([])
    const [ordersOzn, setOrdersOzn] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [allOriginalProducts, setAllOriginalProducts] = useState([])
    const [date, setDate] = useState('')


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
    }, [])
  
    function parseDate(str) { 
        const [day, month, year] = str.split('.').map(Number); 
        // Добавляем 2000 к двузначному году 
        return new Date(year + 2000, month - 1, day); 
      } 
   
      useEffect(() => {
        updateProducts ()
      }, [orders])

      function updateProducts (){
         // Переносим логику вычисления elems и newElem внутрь useEffect
         const elems = orders.filter(item => 
            item.productName.slice(0, 8) === 'Защитный' || 
            item.productName.slice(0, 6) === 'Ограда' ||
            item.productName.slice(0, 7) === 'Корзина' || 
            item.productArt.slice(0, 4) === 'AR46' || 
            item.productArt.slice(0, 4) === 'AR18' || 
            item.productArt === 'AR75254Ц007-06' || 
            item.productArt === 'AR75354Ц007-06' || 
            item.productArt === 'AR75554Ц007-06' || 
            item.productArt === 'AR75654Ц007-06');
        
          const newElem = elems.filter(item => item.productArt !== 'кб850' && item.productArt !== 'кб850У');
        
          // Удостоверимся, что sortedElems получается путём сортировки newElem
          const sortedElems = newElem.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        
          setAllProducts(sortedElems); 
          setAllOriginalProducts(sortedElems)
          // В зависимости мы ставим orders, так как изменение orders может повлиять на конечный результат sortedElems
          // Убедитесь, что parseDate не создаётся заново при каждом рендеринге. Это предполагает,
          // что parseDate является стабильной функцией, например, объявлена за пределами компонента
          // или с использованием useCallback, если объявлена внутри компонента.
      }

    function onSetDate(date) {
        
        updateProducts () 
        const correctDate = `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(2,4)}`
        setDate(correctDate)
        const res = allOriginalProducts.filter(product => product.date == correctDate) 
        setAllProducts(res)
    }

    function onSetConditioners () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(product => product.productName.slice(0, 7) == 'Корзина') 
        setAllProducts(res)
    }


    function onSetPVLUniversal () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item =>  
            item.productArt === 'AR18W7178H9-06' || 
            item.productArt === 'AR18W7198H9-06' || 
            item.productArt === 'AR18W7128H9-06' || 
            item.productArt === 'AR18W7168H9-06' || 
            item.productArt === 'AR18W7118H9-06' || 
            item.productArt === 'AR18W7138H9-06' || 
            item.productArt === 'AR18W7158H9-06' || 
            item.productArt === 'AR18W7148H9-06' || 
            item.productArt === 'AR18W7188H9-06');
        setAllProducts(res)
    }  

    function onSetPVL () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item =>  
            item.productArt === 'AR18V3428H9-06' || 
            item.productArt === 'AR18V3448H9-06' || 
            item.productArt === 'AR18V3438H9-06' || 
            item.productArt === 'AR18V3458H9-06' || 
            item.productArt === 'AR18V3468H9-06' || 
            item.productArt === 'AR18V34Y8H9-06'   );
        setAllProducts(res)
    } 

    function onSetUniversal () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item =>  
            item.productArt === 'AR18V7138H9-06' || 
            item.productArt === 'AR18V7118H9-06' || 
            item.productArt === 'AR18V7128H9-06' || 
            item.productArt === 'AR18V7148H9-06' || 
            item.productArt === 'AR18V7158H9-06'   );
        setAllProducts(res)
    } 

    function onSetSinglePitched () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item =>  
            item.productArt === 'AR18K1B18H9-06' || 
            item.productArt === 'AR18K1B1I39-06' || 
            item.productArt === 'AR18K112959-06' || 
            item.productArt === 'AR18K112I39-06' || 
            item.productArt === 'AR18K1B28H9-06' || 
            item.productArt === 'AR18K111I39-06' || 
            item.productArt === 'AR18K1B2I39-06' || 
            item.productArt === 'AR18K1B1959-06' || 
            item.productArt === 'AR18K111959-06' || 
            item.productArt === 'AR18K1128H9-06' || 
            item.productArt === 'AR18K1B2959-06'      );
        setAllProducts(res)
    } 

    function onSetDoublePitched () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item =>  
            item.productArt === 'AR18K1B4959-06' || 
            item.productArt === 'AR18K1B38H9-06' || 
            item.productArt === 'AR18K1B4I39-06' || 
            item.productArt === 'AR18K1B3959-06' || 
            item.productArt === 'AR18K1B48H9-06' || 
            item.productArt === 'AR18K1B3I39-06'       );
        setAllProducts(res)
    } 

    function onSetArched () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item =>  
            item.productArt === 'AR18K134I39-06' || 
            item.productArt === 'AR18K135959-06' || 
            item.productArt === 'AR18K133I39-06' || 
            item.productArt === 'AR18K1338H9-06' || 
            item.productArt === 'AR18K136959-06' || 
            item.productArt === 'AR18K1348H9-06' || 
            item.productArt === 'AR18K1368H9-06' || 
            item.productArt === 'AR18K136I39-06' || 
            item.productArt === 'AR18K135I39-06' || 
            item.productArt === 'AR18K133959-06' || 
            item.productArt === 'AR18K1358H9-06' || 
            item.productArt === 'AR18K134959-06'      );
        setAllProducts(res)
    } 

    function onSetRailings () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item =>  
            item.productArt === 'AR18G7128H9-06' || 
            item.productArt === 'AR18G7148H9-06' || 
            item.productArt === 'AR18G7158H9-06' || 
            item.productArt === 'AR18G7138H9-06' || 
            item.productArt === 'AR18G7168H9-06' || 
            item.productArt === 'AR18V34C8H9-06'        );
        setAllProducts(res)
    } 

    function onSetVisors () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item => item.productName.slice(0, 8) === "Защитный" );
        setAllProducts(res)
    } 

    function onSetFances () {
        const products = date === '' ? allOriginalProducts : allOriginalProducts.filter(product => product.date == date) 
        const res = products.filter(item => item.productArt.slice(0, 4) === "AR16" );
        setAllProducts(res)
    } 

    function onSetAllProducts () { 
        setAllProducts(allOriginalProducts)
       
    } 


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
            <FilterCategory onSetDate={onSetDate} 
                            onSetConditioners={onSetConditioners}  
                            onSetPVLUniversal={onSetPVLUniversal}
                            onSetPVL={onSetPVL}
                            onSetUniversal={onSetUniversal}
                            onSetSinglePitched={onSetSinglePitched}
                            onSetDoublePitched={onSetDoublePitched}
                            onSetArched={onSetArched}
                            onSetRailings={onSetRailings}
                            onSetVisors={onSetVisors}
                            onSetFances={onSetFances}
                            onSetAllProducts={onSetAllProducts}
                            date={date}
                            allProducts={allProducts}/>
           {loading ?            
                     <ClipLoader color="#0d6efd"   cssOverride={{
                                            width: '100px',
                                            height: '100px',
                                            marginLeft: '450px',
                                            marginTop: '100px' 
                                        }} /> :
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
        
                    {  allProducts.map((items, i) => {
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
            </Table>}
        </div>
    )
}

export default OrdersConditioners;