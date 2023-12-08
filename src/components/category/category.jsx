import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button'; 
import Dropdown from 'react-bootstrap/Dropdown';


const Category = ({setCategory, setSort, setShow}) => {
    return (
        <ul className="category" style={{display: 'flex', flexWrap: 'wrap'}}>

            <li className='category__item'  >  
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Все
                </Button>
            </li>

            <li className='category__item'>  
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Решетки  
                </Button>
            </li>
            <li className='category__item' text="dark" > 
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Перголы   
                </Button>
            </li >
            <li className='category__item' > 
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Качели  
                </Button>
            </li>
            <li className='category__item' > 
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Животные
                </Button>
            </li>
            <li className='category__item'> 
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Флагштоги  
                </Button>
            </li>
            <li className='category__item'  > 
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Память  
                </Button>
            </li>
            <li className='category__item'  > 
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Дровницы
                </Button>
            </li>
            <li className='category__item'  > 
                <Button variant="secondary" style={{ backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Козырьки  
                </Button>
            </li>
            <li className='category__item'  > 
                <Button variant="secondary" style={{marginTop: '10px', backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Противоугонные
                </Button>
            </li>
            <li className='category__item'  > 
                <Button variant="secondary" style={{marginTop: '10px', backgroundColor: '#3d5a80' }} onClick={(e) => setCategory(e.target.innerHTML) }>
                    Пластины
                </Button>
            </li>
            <li className='category__item'  style={{marginTop: '10px'}}> 
                <Button variant="success"   onClick={(e) => setCategory(e.target.innerHTML) }>
                   В работе 
                </Button>
            </li>
  
            <li className='category__item'  style={{marginTop: '10px'}}> 
            <Dropdown  >
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Сортировка
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    <Dropdown.Item  onClick={(e) => setSort(e.target.innerHTML)}>По возрастанию</Dropdown.Item>
                    <Dropdown.Item  onClick={(e) => setSort(e.target.innerHTML)}>По убыванию</Dropdown.Item>  
                </Dropdown.Menu>
            </Dropdown>
            </li>
        </ul>
    )
}

export default Category 