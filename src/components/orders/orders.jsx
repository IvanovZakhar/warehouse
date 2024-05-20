import Table from 'react-bootstrap/Table';
import AppInfo from "../app-info/app-info"
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button'; 
import { useBarcode } from 'next-barcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './orders.scss'
import { useState, useEffect } from 'react';
import useWarehouseService from '../../services/warehouse-services';
import { useForm } from "react-hook-form"
import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton'; 
import ReactPaginate from 'react-paginate'; 
import Toast from 'react-bootstrap/Toast';
import Notification from '../notification/notification';

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
    const [newOrders, setNewOrders] = useState([])
    const [error, setError] = useState(false)
    const [nameProduct, setNameProduct] = useState('')


    useEffect(() => {
        setNewOrders(allOrders.reverse())
    }, [allOrders])

  

    const sortOrders = (e) => { 
        setNewOrders(allOrders.filter(order => order.createdAt.slice(0,10) === e.target.value))
    }

    const resetNewOrders = () => {
        setNewOrders(allOrders)
    }
     
    const totalSalary = salaryValue * quantityValue;
  
    const handleSalaryChange = (e) => {
      setSalaryValue(e.target.value); 
    };
  
    const handleQuantityChange = (e) => {
      setQuantityValue(e.target.value);  
    };

    const sortOrdersCategory = (e) =>{ 
        setNewOrders(allOrders.filter(order => order.status === e.target.outerText))
    }
    
     
    const onSubmit = (data) => { 
      
        setOrders([...orders, data])
        reset()
        setNameProduct('')
        setValue('salary', '');
        setValue('quantity', '');
        setValue('quantityCompl', '');
        setSalaryValue(0)
        setQuantityValue('')
    }
    const handleTextInputChange = (e) => {
        setValue('textInput', e); // Обновляем значение текстового поля
      }; 

    // Обработчик выбора предложенного ответа
    const handleSuggestionClick = (value, name) => {
        console.log(name)
        setValue('article', value);
        setValue('name_of_product', name);
        setValue('textInput', value); // Устанавливаем значение текстового поля
    };

    useEffect(()=>{
        getAllProducts().then(setProducts) 
    }, [])

 
    const deleteItem = (i) => {
        setOrders(prevOrders => prevOrders.filter(item => item.id !== i))
    }
 
 
    const searchArt = (search) => { 
        if (search) {
            setElemsSearch(products.filter(product =>
                product.article.toLowerCase().includes(search.toLowerCase())
            ));
        }
    
        const limitedResults = elemsSearch.slice(0, 6); // Ограничение до 7 элементов
    
        const res = limitedResults.map(item => {
        
            const { article, name_of_product, main_photo_link } = item;
            return (
                <li className='search__art-item' onClick={(e) => {
                    // e.target.parentNode.style.display = 'none'
                    setSearchRes({ article, name_of_product });
                    handleSuggestionClick(article, name_of_product);
                    onSetNameProduct(article)
                }}>
                    <img src={main_photo_link} alt="photo-product" />
                    {item.article}</li>
            );
        });
    
        return (
            <ul className='search__art' >
                {res}
            </ul>
        );
    }
    
    const Pagination = ({ data, itemsPerPage }) => {
        const [currentPage, setCurrentPage] = useState(0);
      
        const handlePageChange = ({ selected }) => {
          setCurrentPage(selected);
        };
      
        const offset = currentPage * itemsPerPage;
        const currentItems = data.slice(offset, offset + itemsPerPage);
      
        return (
          <div>
            {currentItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
      
            <ReactPaginate 
                   previousLabel={'←'}
                   nextLabel={'→'}
              pageCount={Math.ceil(data.length / itemsPerPage)}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        );
      };
    const Select = React.forwardRef(({ onChange, onBlur, name  }, ref) => (
        <> 
            <select id="pet-select"  name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
                <option value="">Выберите</option>
                <option value="Тургунов">Тургунов</option>
                <option value="Бородин">Бородин</option>
                <option value="Зеленов">Зеленов</option>
                <option value="Храмов">Храмов</option>
                <option value="Иванов">Иванов</option> 
                <option value="Орехов">Орехов</option> 
                <option value="Вильданов">Вильданов</option>  
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
      const itemsPerPage = 10;
      const elem =newOrders.map(order => {   
        const {barcodeOrders, createdAt, master, products, status} = order
        const newDate = `${createdAt.slice(8,10)}.${createdAt.slice(5,7)}.${createdAt.slice(0,4)}`
        const newTime = `${+createdAt.slice(11,13) + 3}:${createdAt.slice(14,16)}` 
        return(
            <Accordion.Item eventKey={`${barcodeOrders}`} key={barcodeOrders}>
                <Accordion.Header >
                         {  `  ${newDate} Наряд №${barcodeOrders} `  }
                        <Badge bg={ status === "Готов" ?  "success" : "primary"   } 
                                    style={{fontSize: '16px', marginLeft: '10px',  height: '25px', padding: '5px', color: 'white', fontSize: '14px', fontWeight: 'bold'}}>
                                    {status}
                        </Badge>
                        
                  
                </Accordion.Header>
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
                                <Badge bg={ status === "Упакован" ?  "success" :  "primary"   } 
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
                    <button onClick={() => saveAsPDF(`${barcodeOrders}`)}>Печать</button>
                </Accordion.Body>
            </Accordion.Item>
        )
    }) 


    function onSetNameProduct (article) {
        const name = products.filter(product => product.article == article)
        console.log(name)
        if(name.length){
            handleSuggestionClick(article, name[0].name_of_product)
        }
        setNameProduct(name.length ? name[0].name_of_product : 'Имя не найдено')
        
    }
     console.log(orders)

    return(
        <div className="Orders" > 
            <AppInfo/>
            <Toast style={{display: `${error ? 'block' : 'none'}`,position: 'sticky', top: `20px`, right: '10px', zIndex: '10', backgroundColor: 'yellow'}}>
                <Toast.Header onClick={() => {setError(false)}}>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Внимание</strong> 
                </Toast.Header>
                <Toast.Body>Наряд пуст!</Toast.Body>
            </Toast>
            <div className='orders__category-sort'>
                <input type='date' style={{marginTop: '10px'}} onChange={sortOrders}/> 
                <Button variant="primary" 
                        style={{margin: '10px 0 10px 10px', height: '30px', padding: '2px' , fontSize: '14px', fontWeight: 'bold'}}
                        onClick={sortOrdersCategory}>Изготовление</Button>{' '} 
        
                <Button variant="success" 
                        style={{margin: '10px 0 10px 10px', height: '30px', padding: '2px' , fontSize: '14px', fontWeight: 'bold'}}
                        onClick={sortOrdersCategory}>Готов</Button>{' '}
                <Button variant="secondary" onClick={resetNewOrders} style={{margin: '10px 0 10px 10px', height: '30px', padding: '2px' , fontSize: '14px', fontWeight: 'bold'}}>Показать все</Button>
            </div>
                
            <Accordion defaultActiveKey="1" style={{marginTop: '10px'}}> 
            <Pagination data={elem} itemsPerPage={itemsPerPage} />
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
                            {orders.map((order) => {
                                return(
                                    <tr key={order.id}>
                                        <td>{order.id }</td>
                                        <td>{order.article}</td>  
                                        <td>{order.name_of_product}</td>
                                        <td>{order.salary}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.totalSalary}</td>
                                        <td>{order.quantityCompl}</td>
                                        <td>{order.worker}</td>
                                        <CloseButton onClick={() => deleteItem(order.id)}/>
                                    </tr> 
                                )
                            })}
                            <br/>
                             <br/>
                            <tr className='new-order'> 
                                <td><input  className='number'{...register("id", { required: true })} value={orders.length + 1 }  /></td>
                                <td><input value={textInputValue || ''} {...register("article", { required: true, minLength: 3 })} onChange={(e) => {
                                    searchArt(e.target.value)
                                    handleTextInputChange(e.target.value)
                                    onSetNameProduct(e.target.value)} }/> </td> 
                                <td>{nameProduct}</td> 
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
                        const Order = {barcodeOrders: `${++allOrders[0].barcodeOrders}`, master, products: orders}
      
                        Order.products.length ?  newOrder(Order).then(() => window.location.reload() ) : setError(true)
                        //
                    }}>Создать этот наряд</button>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>

        </div>
    )
}


export default Orders
 

