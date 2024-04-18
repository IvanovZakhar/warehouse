import { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './InfoTableOrders.scss'


const InfoTableOrders = ({ordersOzn, allOrdersYandex}) => {
    const [ordersCMA, setOrdersCMA] = useState([])
    const [ordersArsenal, setOrdersArsenal] = useState([])
    const [ordersPargolovo, setOrdersPargolovo] = useState([]) 
    const [ordersToday, setOrdersToday] = useState([]) 
    const [ordersLargeYandex, setOrdersLargeYandex] = useState([])
    const [ordersYandex, setOrdersYandex] = useState([])
    const [ordersCMATomorrow , setOrdersCMATomorrow ] = useState([])
    const [ordersArsenalTomorrow , setOrdersArsenalTomorrow ] = useState([])
    const [ordersPargolovoTomorrow , setOrdersPargolovoTomorrow ] = useState([]) 
    const [ordersTomorrow , setOrdersTomorrow ] = useState([]) 
    const [ordersLargeYandexTomorrow, setOrdersLargeYandexTomorrow] = useState([])
    const [ordersYandexTomorrow, setOrdersYandexTomorrow] = useState([])

    console.log(ordersOzn)
    console.log(allOrdersYandex)
    useEffect(() => { 
        const dateToday = getCurrentDate()
        const dateTomorrow = getTomorrowDate()
        console.log(dateToday)
        if(ordersOzn.length){
            console.log(formatToDate(ordersOzn[0].date))
            const ordersToday = ordersOzn.filter(order => formatToDate(order.date) == dateToday) 
            const ordersPargolovo = ordersToday.filter(order => order.warehouse.slice(0, 9).toLowerCase() == "парголово")
            const orders = ordersToday.filter(order => order.warehouse.slice(0, 9).toLowerCase() !== "парголово")
            const ordersCMA = orders.filter(order => order.company == "ЦМА")
            const ordersArsenal = orders.filter(order => order.company == "Арсенал")
            setOrdersCMA(ordersCMA)
            setOrdersArsenal(ordersArsenal)
            setOrdersPargolovo(ordersPargolovo)
            setOrdersToday(ordersToday)

            const ordersTomorrow = ordersOzn.filter(order => formatToDate(order.date) == dateTomorrow) 
            const ordersPargolovoTomorrow  = ordersTomorrow.filter(order => order.warehouse.slice(0, 9).toLowerCase() == "парголово")
            const ordersLarge  = ordersTomorrow.filter(order => order.warehouse.slice(0, 9).toLowerCase() !== "парголово")
            const ordersCMATomorrow  = ordersLarge.filter(order => order.company == "ЦМА")
            const ordersArsenalTomorrow  = ordersLarge.filter(order => order.company == "Арсенал")
            setOrdersCMATomorrow (ordersCMATomorrow )
            setOrdersArsenalTomorrow ( ordersArsenalTomorrow)
            setOrdersPargolovoTomorrow (ordersPargolovoTomorrow)
            setOrdersTomorrow (ordersToday)
        }

        
      }, [ordersOzn])

      useEffect(() => {
     
             
        if(allOrdersYandex.length){
            
            const ordersToday = allOrdersYandex.filter(order => { 
                const currentDate =  formatToDate (order.date) 
                const todayDate = getCurrentDate() 
                return currentDate == todayDate  
            }) 
            const ordersLarge = ordersToday.filter(orders => orders.company == 'КГТ')
            const ordersYandex = ordersToday.filter(orders => !orders.company )
          
            setOrdersLargeYandex(ordersLarge) 
            setOrdersYandex(ordersYandex )
            
            const ordersTomorrow  = allOrdersYandex.filter(order => { 
                const currentDate =  formatToDate (order.date)
                const tomorrowDate = getTomorrowDate()
                return currentDate == tomorrowDate
            })
        
            const ordersLargeTomorrow = ordersTomorrow.filter(orders => orders.company == 'КГТ')
            const ordersYandexTomorrow = ordersTomorrow.filter(order => order.company === undefined); 
            const uniqueOrdersTomorrow = ordersYandexTomorrow.filter(yandexOrder => 
                !ordersLargeTomorrow.some(largeOrder => largeOrder.id === yandexOrder.id)
              );
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
      
      function getTomorrowDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
      
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const year = tomorrow.getFullYear();
      
        return `${year}-${month}-${day}`;
      }

      function formatToDate(dateString) {
        // Разделяем входную строку - теперь следим за порядком - [дд, мм, гг]
        const dateParts = dateString.split('.');
        
        let year = dateParts[2];
        const month = dateParts[1];
        const day = dateParts[0];
      
        // Проверяем, состоит ли год из двух цифр и преобразуем к формату гггг
        year = year.length === 2 ? `20${year}` : year;
        
        return `${year}-${month}-${day}`;
      }
      
    
      
    return(
        <div className="info-table-order">
            <ListGroup style={{position: 'absolute', left: '50px', top: '120px'}}>   
                    <ListGroup.Item  style={{padding: '0px'}}>              
                        <Badge style={{fontSize: '32px', display: 'flex', height: '35px',  color: 'black', padding: '13px 3px  0px 3px',}} bg="light">
                            
                            <span style={{padding: '0px', borderBottom: '1px solid black', display: 'flex', width: '330px', justifyContent: 'space-between',}}>
                                {`${getCurrentDate().slice(8,10)}.${getCurrentDate().slice(5,7)}.${getCurrentDate().slice(0,4)}`} 
                                <Clock/>
                            </span>
                        </Badge>
                     </ListGroup.Item>
                   
                <ListGroup.Item>
                  
                    <h3>
                        ЦМА 
                    </h3>
                    <Badge style={{fontSize: '14px'}} bg="success">{ordersCMA.length}</Badge>
                  
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Арсенал 
                    </h3>
                        <Badge style={{fontSize: '14px'}} bg="success">{ordersArsenal.length}</Badge>
              
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Парголово 
                    </h3>
                    <Badge style={{fontSize: '14px'}} bg="primary">{ordersPargolovo.length}</Badge>
                   
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Яндекс 
                    </h3>
                    <Badge style={{fontSize: '14px'}} bg="success">{ordersYandex.length}</Badge>
                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Яндекс КГТ
                    </h3>    
                    <Badge style={{fontSize: '14px'}} bg="primary">{ordersLargeYandex.length}</Badge>
                   
                </ListGroup.Item>

            </ListGroup>
            <ListGroup style={{ position: 'absolute', right: '50px', top: '120px'}}>   
                    <ListGroup.Item  style={{padding: '0px'}}>              
                        <Badge style={{fontSize: '12px', width: '330px',display: 'flex',justifyContent: 'space-between',borderBottom: '1px solid black', height: '35px',  color: 'black', padding: '13px 3px  0px 3px',}} bg="light">
                            
                            <span style={{padding: '0px',  display: 'flex',   }}>
                                {`Завтра`}   
                            </span>
                            <span style={{padding: '0px',  display: 'flex',  justifyContent: 'space-between',}}>
                            {`${ getTomorrowDate().slice(8,10)}.${ getTomorrowDate().slice(5,7)}.${ getTomorrowDate().slice(0,4)}`}    

                           
                            </span>
                        </Badge>
                     </ListGroup.Item>
                   
                <ListGroup.Item>
                        <h3>
                            ЦМА 
                        </h3>
                    <Badge style={{fontSize: '14px'}} bg="success">{ordersCMATomorrow .length}</Badge>
                  
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Арсенал 
                    </h3>
                    <Badge style={{fontSize: '14px'}} bg="success">{ordersArsenalTomorrow .length}</Badge>
                   
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Парголово 
                    </h3>
                    <Badge style={{fontSize: '14px'}} bg="primary">{ordersPargolovoTomorrow .length}</Badge>
                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Яндекс 
                    </h3>
                    <Badge style={{fontSize: '14px'}} bg="success">{ordersYandexTomorrow.length}</Badge>
                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>
                        Яндекс КГТ 
                    </h3>
                    <Badge style={{fontSize: '14px'}} bg="primary">{ordersLargeYandexTomorrow.length}</Badge>
                    
                </ListGroup.Item>

            </ListGroup>
        </div>
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