import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useForm } from "react-hook-form" 
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import useWarehouseService from '../../services/warehouse-services';
import './other-products.scss'

function OtherProducts() {

  const [nameProduct, setNameProduct] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const {getAllProductsMarket, addOtherProduct, getOtherProducts, addNewOtherProducts, loading} = useWarehouseService()
  const [newProduct, setNewProduct] = useState([])
  const [otherProducts, setOtherProducts] = useState([])
  const [updateProductStatus, setUpdateProductStatus] = useState(false)
  const [statusRequest, setStatusRequest] = useState('')

  const [show, setShow] = useState(false); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => { 
    const product = {...newProduct, number_posting: data.number_posting} 
    addOtherProduct(product).then(res => {window.location.reload()})
  }

  useEffect(() => {
    getAllProductsMarket().then(setAllProducts)
    getOtherProducts().then(setOtherProducts)
  }, []) 
 

  function onSetNameProduct (e){ 
    const res = allProducts.filter(product => product.article == e.target.value)
    if(res.length === 1){
        const {article, name_of_product, main_photo_link} = res[0]
        const newProduct = {
            article, 
            name: name_of_product, 
            photo: main_photo_link
        }
        setNewProduct(newProduct)
    }
  }

  function deleteItem(id) {
    setOtherProducts(otherProducts.filter(product => product._id != id))
    setUpdateProductStatus(true)
  }

  function updateProducts(){ 
    addNewOtherProducts(otherProducts).then(res => { 
      setStatusRequest(res); // Устанавливаем статус ответа
  
      // Устанавливаем таймер для очистки статуса через 3 секунды
      setTimeout(() => { 
        setStatusRequest(''); // Очищаем статус ответа 
      }, 3000); // Задержка в 3 секунды
      setUpdateProductStatus(false); 
    });
  }
  
 
  return (
    <>
      <Button variant="success" onClick={handleShow} className="me-2" style={{position: 'absolute', left: '1px', width: '10px', height: '100%'}}>
        {'>'}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={'start'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Остальные продукты</Offcanvas.Title>
        </Offcanvas.Header>
            {updateProductStatus ? 
                <div className='buttons'>
                    <Button variant="success" onClick={updateProducts}>Сохранить изменения</Button> 
                    {' '}
                    <Button variant="danger" onClick={() => {window.location.reload()}}>Отмена</Button> 
                </div> : 
                null}
            {loading ? "Загрузка.." : null}
            {statusRequest}
        <Offcanvas.Body> 
            <div className='other-products'>
                {otherProducts.map(product => {
                    const {photo, name, article, _id, number_posting } = product
                    return (
                        <Card style={{ width: '10rem', margin:'10px 0 0 10px'}} key={_id}  >
                            <Card.Img variant="top" src={photo}/>
                            <Card.Body>
                                <Card.Title style={{fontSize:'14px'}}>{article}</Card.Title> 
                                <Card.Text style={{fontSize:'14px', textDecoration: 'underline '}}>{number_posting}</Card.Text>
                                <Card.Text style={{fontSize:'10px'}}>{name}</Card.Text>
                                <Button variant="danger" onClick={() => {deleteItem(_id)}}>Удалить</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>

        <Accordion style={{marginTop: '30px'}}>
            <Accordion.Item eventKey="0">
        <Accordion.Header>Добавить продукт</Accordion.Header>
        <Accordion.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
             
                    <label htmlFor="article">Артикул</label>
                    <input
                        id="article"  
                        {...register("article", { required: true, maxLength: 30 })}
                        onChange={onSetNameProduct}
                    />
                    <label htmlFor="number_posting">Номер отправления</label>
                    <input
                        id="number_posting"  
                        {...register("number_posting", { required: true, maxLength: 30 })} 
                    />
                    <label htmlFor="name">Название</label>
                    <p style={{width: '200px', fontSize: '12px'}}>{newProduct.name ? newProduct.name : ''}</p>
                    {errors.name && errors.name.type === "required" && (
                        <span>This is required</span>
                    )}
                    {errors.name && errors.name.type === "maxLength" && (
                        <span>Max length exceeded</span>
                    )}
                    <input type="submit" />

                </form> 
        </Accordion.Body>
            </Accordion.Item> 
        </Accordion>
      
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OtherProducts;
 