import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge'; 
import './filter-category.scss'



const FilterCategory = ({onSetDate,
                         onSetConditioners, 
                         onSetPVLUniversal, 
                         onSetPVL, 
                         onSetUniversal, 
                         onSetSinglePitched, 
                         onSetDoublePitched,
                         onSetArched,
                         onSetRailings,
                         onSetVisors,
                         onSetFances,
                         onSetAllProducts,
                         allProducts }) => { 
    return(
        <div className='filter-category'> 
            <Form style={{width: '150px', height: '50px'}} >
                  <Form.Group className="mb-3" controlId="formBasicEmail"> 
                      <Form.Control type="date" onInput={(e) => {onSetDate(e.target.value)}}/>
                  </Form.Group>
            </Form>
          
            <Button variant="primary" onClick={onSetConditioners}>Корзины</Button>
            <Button variant="primary" onClick={onSetVisors}>Козырьки конд.</Button>
            <Button variant="primary" onClick={onSetPVLUniversal}>ПВЛ унив.</Button>
            <Button variant="primary" onClick={onSetPVL}>ПВЛ</Button>
            <Button variant="primary" onClick={onSetUniversal}>Универсал</Button>
            <Button variant="primary" onClick={onSetRailings}>Перила</Button>
            <Button variant="primary" onClick={onSetSinglePitched}>Односкатные</Button>
            <Button variant="primary" onClick={onSetDoublePitched}>Двускатные</Button>
            <Button variant="primary" onClick={onSetArched}>Арочные</Button>
            <Button variant="primary" onClick={onSetFances}>Ограды</Button>
            <Button variant="secondary" onClick={onSetAllProducts}>Показать все</Button>
            <h4>
                  <Badge bg="success">{allProducts.length}</Badge>
            </h4>
        </div>
    )
}

export default FilterCategory;