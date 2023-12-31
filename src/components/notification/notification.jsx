import useWarehouseService from "../../services/warehouse-services";
import { useEffect, useState } from "react";
import Toast from 'react-bootstrap/Toast';

const Notification = () => {
    const [ordersOzn, setOrdersOzn] = useState([])
    const {getAllOrdersOZN} = useWarehouseService()


    useEffect(() => {
        JSON.parse(localStorage.getItem('apiData')).forEach(item => {
            const headersOzn = {  
                'Client-Id': `${item.clientId}` ,
                'Api-Key': `${item.apiKey}`
             } 
             console.log(item)
             getAllOrdersOZN(headersOzn).then(data => setOrdersOzn(prevOzn => {
                return[...prevOzn, ...data]
                
             }))
        })
    }, [])
    const elems = ordersOzn.filter(item => item.productName.slice(0, 8) === 'Защитный' || item.productName.slice(0, 7) === 'Корзина' || item.warehouse.slice(0, 9) === 'ПАРГОЛОВО' || item.productArt.slice(0, 4) === 'AR46') 
    const sortedElems = elems.sort((a, b) => new Date(a.date) - new Date(b.date))
    const readyPosting = JSON.parse(localStorage.getItem('readyPosting')) || []
 
    const allNotification = sortedElems.filter(item => {
        const res = readyPosting.filter(posting => posting.postingNumber === item.postingNumber)
        if(!res.length){
            return item
        }
    })
 

    return(
        <>
        {allNotification.map((item, i) =>  <NotificationItem item={item} i={i}/>)}
        </>
    )

}

export default Notification

const NotificationItem = ({item, i}) => {
    const [show, setShow] = useState(true);
    return(
        <Toast style={{position: 'absolute', right: '15px', top: `${i}0px`}} 
               bg="secondary" 
               show={show} 
               onClose={() => setShow(!show)}
                key={i}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Новый заказ</strong> 
                <small className="text-muted">{`${item.date.slice(8, 10)}.${item.date.slice(5, 7)}.${item.date.slice(2, 4)}`}</small>
            </Toast.Header>
            <Toast.Body>{item.productName }</Toast.Body>
        </Toast>
    )
}