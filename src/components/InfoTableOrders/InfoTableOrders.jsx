import { useEffect, useState } from 'react'
import useWarehouseService from '../../services/warehouse-services';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './InfoTableOrders.scss'


const InfoTableOrders = ({ordersOzn, allOrdersYandex, logs, productsOrdersBarcode, allOrdersWB}) => {
 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ordersCMA, setOrdersCMA] = useState([])
    const [ordersArsenal, setOrdersArsenal] = useState([])
    const [ordersPargolovo, setOrdersPargolovo] = useState([]) 
    const [ordersCMAPacked, setOrdersCMAPacked] = useState([])
    const [ordersArsenalPacked, setOrdersArsenalPacked] = useState([])
    const [ordersPargolovoPacked, setOrdersPargolovoPacked] = useState([]) 
    const [ordersToday, setOrdersToday] = useState([]) 
    const [ordersCMATomorrow , setOrdersCMATomorrow ] = useState([])
    const [ordersArsenalTomorrow , setOrdersArsenalTomorrow ] = useState([])
    const [ordersPargolovoTomorrow , setOrdersPargolovoTomorrow ] = useState([]) 
    const [ordersCMATomorrowPacked , setOrdersCMATomorrowPacked ] = useState([])
    const [ordersArsenalTomorrowPacked , setOrdersArsenalTomorrowPacked ] = useState([])
    const [ordersPargolovoTomorrowPacked , setOrdersPargolovoTomorrowPacked ] = useState([]) 
    const [ordersTomorrow , setOrdersTomorrow ] = useState([]) 
    const [ordersLargeYandex, setOrdersLargeYandex] = useState([])
    const [ordersYandex, setOrdersYandex] = useState([])
    const [ordersLargeYandexPacked, setOrdersLargeYandexPacked] = useState([])
    const [ordersYandexPacked, setOrdersYandexPacked] = useState([])
    const [ordersLargeYandexTomorrow, setOrdersLargeYandexTomorrow] = useState([])
    const [ordersYandexTomorrow, setOrdersYandexTomorrow] = useState([]) 
    const [ordersLargeYandexTomorrowPacked, setOrdersLargeYandexTomorrowPacked] = useState([])
    const [ordersYandexTomorrowPacked, setOrdersYandexTomorrowPacked] = useState([])
    const [ordersNotPackedWb, setOrdersNotPackedWb] = useState([])
    const {getStickersWB} = useWarehouseService()

    useEffect(() => {   
        const packedOrdersOzn = ordersOzn.map(item =>{  
            const filtRes = logs.find(log => log.comment == item.postingNumber) 
            
            if(filtRes){
              return{
                ...item, packed: true
              }
            }else{
              return item
            }
          }) 
          
        

        const dateToday = getCurrentDate()
        const dateTomorrow = getTomorrowDate() 
        
        if(ordersOzn.length){
            const ordersToday = packedOrdersOzn.filter(order => order.date == `${dateToday.slice(8,10)}.${dateToday.slice(5,7)}.${dateToday.slice(2,4)}`) 
            const ordersPargolovo = ordersToday.filter(order => order.warehouse.slice(0, 9).toLowerCase() == "парголово")
            const orders = ordersToday.filter(order => order.warehouse.slice(0, 9).toLowerCase() !== "парголово")
            const ordersCMA = orders.filter(order => order.company == "ЦМА")
            const ordersArsenal = orders.filter(order => order.company == "Арсенал")
            setOrdersCMA(ordersCMA)
            setOrdersArsenal(ordersArsenal)
            setOrdersPargolovo(ordersPargolovo)
            setOrdersToday(ordersToday)
            setOrdersCMAPacked(ordersCMA.filter(order => {
                const res = productsOrdersBarcode.filter(item => item.article == order.productArt)
                if(res.length){
                    return order
                }
            }).filter(item => !item.packed))
            setOrdersArsenalPacked(ordersArsenal.filter(order => {
                const res = productsOrdersBarcode.filter(item => item.article == order.productArt)
                if(res.length){
                    return order
                }
            }).filter(item => !item.packed))
            setOrdersPargolovoPacked(ordersPargolovo.filter(order => {
                const res = productsOrdersBarcode.filter(item => item.article == order.productArt)
                if(res.length){
                    return order
                }
            }).filter(item => !item.packed))

            const ordersTomorrow = packedOrdersOzn.filter(order => order.date ==  `${dateTomorrow.slice(8,10)}.${dateTomorrow.slice(5,7)}.${dateTomorrow.slice(2,4)}`) 
            const ordersPargolovoTomorrow  = ordersTomorrow.filter(order => order.warehouse.slice(0, 9).toLowerCase() == "парголово") 
            const ordersLarge  = ordersTomorrow.filter(order => order.warehouse.slice(0, 9).toLowerCase() !== "парголово")
            const ordersCMATomorrow  = ordersLarge.filter(order => order.company == "ЦМА")
            const ordersArsenalTomorrow  = ordersLarge.filter(order => order.company == "Арсенал")
            setOrdersCMATomorrow (ordersCMATomorrow )
            setOrdersArsenalTomorrow ( ordersArsenalTomorrow)
            setOrdersPargolovoTomorrow (ordersPargolovoTomorrow)
            setOrdersCMATomorrowPacked (ordersCMATomorrow.filter(order => {
                const res = productsOrdersBarcode.filter(item => item.article == order.productArt)
                if(res.length){
                    return order
                }
            }).filter(item => !item.packed))
            setOrdersArsenalTomorrowPacked ( ordersArsenalTomorrow.filter(order => {
                const res = productsOrdersBarcode.filter(item => item.article == order.productArt)
                if(res.length){
                    return order
                }
            }).filter(item => !item.packed))
            setOrdersPargolovoTomorrowPacked (ordersPargolovoTomorrow.filter(order => {
                const res = productsOrdersBarcode.filter(item => item.article == order.productArt)
                if(res.length){
                    return order
                }
            }).filter(item => !item.packed))
            setOrdersTomorrow (ordersToday)
        }

        
      }, [ordersOzn, logs, productsOrdersBarcode, allOrdersWB])


    useEffect(() => { 
        if(allOrdersWB){ 
            const packedOrdersWB = allOrdersWB.filter(orderWb => {
                const res = logs.filter(log => log.comment == orderWb.id)
                if(!res.length){
                    return orderWb.id
                }
            }) 
            const orders = packedOrdersWB.map(order => order.id)
          
            getStickersWB([], JSON.stringify({'orders': orders})).then(setOrdersNotPackedWb)
        }

    }, [allOrdersWB])
    
 

      useEffect(() => {  

        const packedOrdersYandex = allOrdersYandex.map(item =>{  
            const filtRes = logs.find(log => log.comment == item.postingNumber)  
            if(filtRes){
                return{
                ...item, packed: true
                }
            }else{
                return item
            }
        })   
 

        function formatToDate(dateString) { 
            const dateParts = dateString.split('-');
            // Следим за порядком - [гггг, мм, дд]
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];
          
            return `${day}-${month}-${year}`;
          } 

        if(allOrdersYandex.length){
            // Устанавливаем упакованные товары
            const ordersToday = packedOrdersYandex.filter(order => { 
           
                    const todayDate = getCurrentDate() 
                    const currentDate = order.date 
           
                    return currentDate ==  `${todayDate.slice(8,10)}.${todayDate.slice(5,7)}.${todayDate.slice(2,4)}` 
             
            }) 
              
           // Раскидываем нужные компании
            const ordersLarge = ordersToday.filter(orders => orders.company == 'КГТ')
            const ordersYandex = ordersToday.filter(orders => !orders.company )
            
            // Выдаем полный список товаров. Вытаскивая из каждого заказа содержимое
            const allOrdersLarge = ordersLarge.flatMap(order => order.items)
            const allOrdersYandex = ordersYandex.flatMap(order => order.items)
 
            setOrdersLargeYandex(allOrdersLarge) 
            setOrdersYandex(allOrdersYandex)
 
     
            setOrdersYandexPacked(ordersYandex.filter(item => !item.packed))
            setOrdersLargeYandexPacked(ordersLarge.filter(item => !item.packed))


            const ordersTomorrow  = packedOrdersYandex.filter(order => {  
                    const currentDate =  order.date
                    const tomorrowDate = getTomorrowDate()
                    return currentDate == `${tomorrowDate.slice(8,10)}.${tomorrowDate.slice(5,7)}.${tomorrowDate.slice(2,4)}`
            })

           
        
            const ordersLargeTomorrow = ordersTomorrow.filter(orders => orders.company == 'КГТ') 
            const ordersYandexTomorrow = ordersTomorrow.filter(order => order.company === undefined) 
 
              
            setOrdersYandexTomorrowPacked(ordersYandexTomorrow.filter(item => !item.packed))
            setOrdersLargeYandexTomorrowPacked(ordersLargeTomorrow.filter(item => !item.packed))
    
            setOrdersLargeYandexTomorrow(ordersLargeTomorrow) 
            setOrdersYandexTomorrow(ordersYandexTomorrow)


          
        }
        
      }, [allOrdersYandex])
 

    function getCurrentDate() {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0 в JavaScript
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
      
        return `${year}-${month}-${day}`;
      }

      const date = new Date();

      function getTomorrowDate() {
    
        let dayPlus = getDayPlus(getDayOfWeek(date))
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + dayPlus);
      
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const year = tomorrow.getFullYear();
      
        return `${year}-${month}-${day}`;
      }

      function getDayOfWeek(date, num) {
        const dayNames = [
          'Воскресенье',
          'Понедельник',
          'Вторник',
          'Среда',
          'Четверг',
          'Пятница',
          'Суббота'
        ]; 
        return dayNames[num ? num : date.getDay()];
      }

      function getDayPlus (getDayOfWeek) {
        switch(getDayOfWeek) {
            case 'Пятница':   
                return 3 
            case 'Суббота':  
                return 2 
            default:
             return 1
          }
      } 
 
    
      
    return( 
        <>
        <Button variant="primary" onClick={handleShow}>
            Показать общее кол-во заказов
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement={'top'} style={{backgroundColor: 'rgba(255, 255, 128, .1);'}}>
        <Offcanvas.Header closeButton  > 
        <Offcanvas.Title>Заказы с Маркетплейсов:</Offcanvas.Title>
        </Offcanvas.Header >
        <Offcanvas.Body   >
            <div className="info-table-order">
                <ListGroup style={{position: 'absolute', left: '350px', top: '20px'}}>   
                        <ListGroup.Item  style={{padding: '0px'}}>              
                            <Badge style={{fontSize: '32px', display: 'flex', height: '35px',  color: 'black', padding: '13px 3px  0px 3px',}} bg="light">
                                
                                <span style={{padding: '0px', borderBottom: '1px solid black', display: 'flex', width: '330px', justifyContent: 'space-between', }}>
                                    {`${getCurrentDate().slice(8,10)}.${getCurrentDate().slice(5,7)}.${getCurrentDate().slice(0,4)}`} 
                                    <Clock/>
                                </span>
                            </Badge>
                        </ListGroup.Item>
            
                    <ListGroup.Item>
                    
                        <h3>
                            ЦМА 
               
                        </h3>
                        <div>   
                                <Badge style={{fontSize: '14px'}} bg="success">{`${ordersCMAPacked.length} / ${ordersCMA.length}`}</Badge> 
                            
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Арсенал  
                        </h3>
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="success">{`${ordersArsenalPacked.length} / ${ordersArsenal.length}`}</Badge> 
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Парголово  
                        </h3>
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="primary">{`${ordersPargolovoPacked.length} / ${ordersPargolovo.length}`}</Badge> 
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Яндекс 
                        </h3>
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="success">{`${ordersYandexPacked.length} / ${ordersYandex.length}`}</Badge>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Яндекс КГТ 
                        </h3>
                        
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="primary"> {`${ordersLargeYandexPacked.length} / ${ordersLargeYandex.length}`}</Badge>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Wildberries 
                        </h3> 
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="primary"> {`${ordersNotPackedWb.length} / ∞`}</Badge>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
         

                <ListGroup style={{marginLeft: '20px', position: 'absolute', right: '350px', top: '20px'}}>   
                    <ListGroup.Item  style={{padding: '0px'}}>              
                        <Badge style={{fontSize: '32px', width: '330px',display: 'flex',justifyContent: 'space-between',borderBottom: '1px solid black', height: '35px',  color: 'black', padding: '13px 3px  0px 3px',}} bg="light">
                            
                    
                            <span style={{padding: '0px',  display: 'flex',  justifyContent: 'space-between',}}>
                                {`${ getTomorrowDate().slice(8,10)}.${ getTomorrowDate().slice(5,7)}.${ getTomorrowDate().slice(0,4)}`}     
                            </span>
                        </Badge>
                    </ListGroup.Item>
                    
                    <ListGroup.Item > 
                    
                        <h3>
                            ЦМА 
                        </h3>
                        
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="success">{ `${ordersCMATomorrowPacked.length} / ${ordersCMATomorrow.length}`} </Badge>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Арсенал 
                        </h3> 
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="success">{ `${ordersArsenalTomorrowPacked.length} / ${ordersArsenalTomorrow .length}`}</Badge>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Парголово 
                        </h3> 
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="primary"> {`${ordersPargolovoTomorrowPacked.length} / ${ordersPargolovoTomorrow .length}`}</Badge>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Яндекс
                        </h3>
                        
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="success">  {`${ordersYandexTomorrowPacked.length} / ${ordersYandexTomorrow.length}`}</Badge>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>
                            Яндекс КГТ 
                        </h3> 
                        <div> 
                            <Badge style={{fontSize: '14px'}} bg="primary"> {`${ordersLargeYandexTomorrowPacked.length} / ${ordersLargeYandexTomorrow.length}`}</Badge>
                        </div>
                    </ListGroup.Item>

                </ListGroup>
            </div>
        </Offcanvas.Body>
        </Offcanvas>
        </>
 )
}

function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
  
    useEffect(() => {
      // Создаем интервал, который вызывает setTime каждую секунду
      const intervalId = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
  
      // Этот возвращаемый callback очистит интервал, когда компонент будет размонтирован
      return () => clearInterval(intervalId);
    }, []); // Пустой массив зависимостей, чтобы настроить интервал только один раз при монтировании
  
    return <div>{time}</div>;
  }

export default InfoTableOrders;