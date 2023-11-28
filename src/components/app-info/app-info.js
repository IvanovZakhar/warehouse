import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';  
import Notification from '../notification/notification';
import './app-info.css'
 
const AppInfo = ({setShow}) => {

    // const increase = data.data.filter(item => {return item.increase === true})

    
     return(
        <div className="app-info">
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" style={{color: 'white', fontWeight: 'bold', fontSize: '29px'}}>Склад АрсеналЪ </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/orders" style={{color: 'white',  }}  >Наряды</Nav.Link> 
                    <Nav.Link href="/print-table" style={{color: 'white'}}  >Печать</Nav.Link>
                    <Nav.Link  onClick={() => window.open('https://orders-products-z4dj.vercel.app/list-order?', '_blank')}  style={{color: 'white'}}  >Проверить сборщика</Nav.Link>
                    <Nav.Link href="/orders-conditioners" style={{color: 'white'}}  >Корзины/козырьки</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar> 
            <Notification/>
        </div>
     )

    
}

export default AppInfo;