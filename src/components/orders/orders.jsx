import Table from 'react-bootstrap/Table';
import AppInfo from "../app-info/app-info"
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge'; 
import { useBarcode } from 'next-barcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './orders.css'
import { useState, useEffect } from 'react';
import useWarehouseService from '../../services/warehouse-services';
import { useForm } from "react-hook-form"
import React from 'react';


const Orders = ({allOrders}) => {
    const [orders, setOrders] = useState([])
    const {getAllProducts, newOrder, getAllOrders} = useWarehouseService()
    const [products, setProducts] = useState([]) 
    const [elemsSearch, setElemsSearch] = useState([])
    const [searchRes, setSearchRes] = useState([]) 
    const { register, handleSubmit, setValue, watch,reset} = useForm( )
    const [salaryValue, setSalaryValue] = useState('');
    const [quantityValue, setQuantityValue] = useState(''); 

    const [master, setMaster] = useState('')
    const textInputValue = watch('textInput'); 

     
    const totalSalary = salaryValue * quantityValue;
  
    const handleSalaryChange = (e) => {
      setSalaryValue(e.target.value); 
    };
  
    const handleQuantityChange = (e) => {
      setQuantityValue(e.target.value);  
    };


    
     
    const onSubmit = (data) => { 
      
        setOrders([...orders, data])
        reset()
    }
    const handleTextInputChange = (e) => {
        setValue('textInput', e); // Обновляем значение текстового поля
      }; 
    // Обработчик выбора предложенного ответа
    const handleSuggestionClick = (value, name) => {
        setValue('article', value);
        setValue('name_of_product', name);
        setValue('textInput', value); // Устанавливаем значение текстового поля
    };

    useEffect(()=>{
        getAllProducts().then(setProducts) 
    }, [])

 
    
 



    const searchArt = (search) =>{
        if(search){
            
             setElemsSearch(products.filter(product =>
                product.article.toLowerCase().includes(search.toLowerCase())
              ))
            
        }
        const res = elemsSearch.map(item => {
            const {article, name_of_product} = item 
            return(
                <li className='search__art-item' onClick={() => {
                     setSearchRes({article, name_of_product})
                     handleSuggestionClick(article, name_of_product)
                }}>{item.article}</li>
            )
        })
       
        return(
             <ul className='search__art'>
                {res}
             </ul>
        )
    }
    const Select = React.forwardRef(({ onChange, onBlur, name  }, ref) => (
        <> 
            <select id="pet-select"  name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
                <option value="">Выберите</option>
                <option value="Тургунов">Тургунов</option>
                <option value="Бородин">Бородин</option>
                <option value="Зеленов">Зеленов</option> 
            </select>
        </>
      ))

  
  

      const saveAsPDF = async (id) => {
        const input = document.getElementById(`${id}`);
      
        const canvas = await html2canvas(input);
        const pdf = new jsPDF('p', 'mm', 'a4'); // Задаем книжный формат
      
        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Улучшаем качество, используя image/jpeg
      
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${id}__${new Date()}.pdf`);
      };
       
      const Barcode = ({barcodeOrders}) => {
        const options = {
            value: `${barcodeOrders}`,
            options: {
              background: '#ffffff',
              height: '50',
              width: '6', 
              display: 'flex',
              justifyContent: 'center'
            }
          };
        const { inputRef } = useBarcode(options);
      
        return <svg className='barcode' ref={inputRef} style={  {
            display: 'block',
            margin: '0 auto',
            textAlign: 'center'
          }}/>;
      };
    return(
        <div className="Orders">
            <AppInfo/>

            <Accordion defaultActiveKey="1" style={{marginTop: '50px'}}>
            {allOrders.map(order => {   
                const {barcodeOrders, createdAt, master, products, status} = order
                const newDate = `${createdAt.slice(8,10)}.${createdAt.slice(5,7)}.${createdAt.slice(0,4)}`
                const newTime = `${+createdAt.slice(11,13) + 3}:${createdAt.slice(14,16)}` 
                return(
                    <Accordion.Item eventKey={`${barcodeOrders}`} key={barcodeOrders}>
                        <Accordion.Header >Наряд № {`${barcodeOrders}`}</Accordion.Header>
                        <Accordion.Body>

                            <Table striped bordered hover id={`${barcodeOrders}`}> 
                            <thead>
                                <tr>
                                    <th className='item_time'>
                                        Дата 
                                        <br/>
                                        <Badge bg="secondary">{newDate}</Badge> 
                                        <br/> 
                                    </th>
                                    <th className='item_time'>
                                        Время
                                        <br/>
                                        <Badge bg="secondary">{newTime}</Badge>
                                    </th>
                                    <th colSpan={3}> 
                                    {<Barcode barcodeOrders={barcodeOrders}/>}</th>
                                    <th colSpan={2} style={{fontSize: '24px'}}>
                                        Статус
                                        <br/>
                                        <Badge bg={ status === "Упакован" ?  "success" :  status === "Изготовление" ? "primary" : "warning"  } 
                                            style={{fontSize: '16px'}}>
                                            {status}
                                        </Badge></th>
                                
                                    <th colSpan={1} className='master'>Мастер
                                    <br/> <Badge bg="secondary">{master}</Badge></th> 
                                </tr>
                            </thead>
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Артикул</th>
                                        <th>Название</th>
                                        <th>3пл/шт.</th>
                                        <th>Кол-во</th>
                                        <th>Общая 3пл/шт.</th>
                                        <th>Кол-во компл.</th>
                                        <th>Сварщик</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => {
                                        const {article, name_of_product, salary, quantity, quantityCompl, worker} = product
                                        return(
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td className='item_orders'>{article}</td>
                                                <td className='item_orders'>{name_of_product}</td>
                                                <td className='item_orders'>{salary}</td>
                                                <td className='item_orders'>{quantity}</td>
                                                <td className='item_orders'>{quantity * salary}</td>
                                                <td className='item_orders'>{quantityCompl}</td> 
                                                <td className='item_orders'>{worker}</td>
                                            </tr>
                                        )
                                    })}
                                     
                                </tbody>
                            </Table>
                            <button onClick={() => saveAsPDF(`${barcodeOrders}`)}>Сохранить</button>
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
            <Accordion.Item eventKey="1">
                <Accordion.Header>Создать новый </Accordion.Header>
                <Accordion.Body>
                <Table striped bordered hover id={'000002'}> 
                    <thead>
                        <tr>
                            <th colSpan={2}>Дата 
                            <br/>
                            <Badge bg="secondary"> 
                            </Badge></th>
                            <th colSpan={3}  > 
                            {/* {<svg className='barcode' ref={inputRef} style={{display: 'block',margin: '0 auto'}}/>} */}
                            </th> 
                            <th colSpan={3}>Мастер
                             <br/>         
                             <Badge bg="secondary">
                             <select id="pet-select" onChange={e => setMaster(e.target.value)}>
                                <option value="">Выберите</option>
                                <option value="Карлен">Карлен</option>
                                <option value="Дима">Дима</option> 
                            </select>
                            </Badge></th> 
                        </tr>
                    </thead>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Артикул</th>
                                <th>Название</th>
                                <th>3пл/шт.</th>
                                <th>Кол-во</th>
                                <th>Общая 3пл/шт.</th>
                                <th>Кол-во компл.</th>
                                <th>Сварщик</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i + 1 }</td>
                                        <td>{order.article}</td>  
                                        <td>{order.name_of_product}</td>
                                        <td>{order.salary}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.totalSalary}</td>
                                        <td>{order.quantityCompl}</td>
                                        <td>{order.worker}</td>
                                    </tr> 
                                )
                            })}

                            <tr className='new-order'>
                                 
                              
                                <td></td>
                                <td><input value={textInputValue || ''} {...register("article", { required: true, minLength: 3 })} onChange={(e) => {
                                    searchArt(e.target.value)
                                    handleTextInputChange(e.target.value) 
                                }}  /> </td> 
                                <td>{searchRes.name_of_product}</td> 
                                <td> <input  className='number'{...register("salary", { required: true })} value={salaryValue} onChange={handleSalaryChange} />  </td> 
                                <td> <input  className='number'{...register("quantity", { required: true })} value={quantityValue} onChange={handleQuantityChange} />  </td> 
                                <td>{ totalSalary} </td> 
                                <td><input  className='number'{...register("quantityCompl", { required: true })} /></td> 
                                <td><Select   {...register("worker")} /></td>
                                {searchArt()}
                                
                            </tr>
                           
                        </tbody>
                       
                    </Table>
                    <form onSubmit={handleSubmit(onSubmit)} > 
                                <button type='submit' className='addedProd' onClick={() => {
                                    setValue('totalSalary', totalSalary)
                                }}>Добавить продукт</button>
                    </form>
                    <button className='addedOrder' onClick={() => {
                        const Order = {barcodeOrders: `${++allOrders[allOrders.length-1].barcodeOrders}`, master, products: orders}
                        newOrder(Order).then(() => window.location.reload() )
                        
                    }}>Создать новый наряд</button>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </div>
    )
}


export default Orders