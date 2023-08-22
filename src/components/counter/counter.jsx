import plus from './../../resources/plus.svg'
import minus from './../../resources/minus.svg'
import check from './../../resources/check.svg'
import close from './../../resources/close.svg'
import useWarehouseService from '../../services/warehouse-services'
import './counter.css'
import { useState } from 'react'

const Counter = ({data}) => {
    const {updateProduct} = useWarehouseService()
    console.log(data)
    const {quantity, article} = data
    const [send, setSend] = useState(false)
    const [newData, setNewData] = useState({})
    const [successfull, setSuccessfull] = useState(false)
    const [error, setError] = useState(false)

    const onChangeValue = (article, quantity) => {
        setSend(true)
        setNewData({article, newQuantity: quantity})
        
    }
    
    const sendNewData = () => {
        updateProduct(newData)
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
                <input type='number' defaultValue={quantity} className='quantity' onChange={(e) => onChangeValue(article, e.target.value)}/> 
            </div>
            <input type='text' placeholder='Коментарий' className={`reason ${send ? 'active' : ''}`}/>
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