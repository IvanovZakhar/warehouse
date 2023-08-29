
import check from './../../resources/check.svg'
import close from './../../resources/close.svg'
import useWarehouseService from '../../services/warehouse-services'
import './counter.css'
import { useState } from 'react'

const Counter = ({data}) => {
    const {updateProduct} = useWarehouseService() 
    const {quantity, article, name_of_product} = data
    const [send, setSend] = useState(false)
    const [newData, setNewData] = useState({})
    const [successfull, setSuccessfull] = useState(false)
    const [error, setError] = useState(false)

    const onChangeValue = (article, quantity, name_of_product) => {
        setSend(true)
        setNewData({article, newQuantity: quantity, name_of_product})
        
    }
    
    const sendNewData = () => {
        updateProduct([newData])
            .then(res => {
                setSuccessfull(true)
                setSend(false)
            })
            .catch(e => setError(true))
    }

    const onCancel = () => {
        setSend(false)  
    }
 
    return(
        <div className="counter">
            <div className='counter-item'>
                <div className='text_quantity'>Кол-во</div>
                <input type='number' defaultValue={quantity} className={`quantity ${quantity <= 2  ? 'red' : ''}`} onChange={(e) => onChangeValue(article, e.target.value, name_of_product)}/> 
            </div>
            <input type='text' placeholder='Коментарий' className={`reason ${send ? 'active' : ''}`} onChange={(e) => {setNewData({...newData, comment: e.target.value})}}/>
            <div className={`send ${send ? 'active' : ''}`}>
                <img className='check' src={check} alt='check' onClick={sendNewData}/>
                <img className='close' src={close} alt='close' onClick={onCancel}/>
            </div>
            <div className={`error ${error ? 'active': ''}`}>Ошибка</div>
            <div className={`successfull ${successfull ? 'active': ''}`}>Успешно</div>
        </div>
    )
    
}

export default Counter