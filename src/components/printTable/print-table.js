import Table from 'react-bootstrap/Table';
import Category from '../category/category';
import AppInfo from '../app-info/app-info';
import Accordion from 'react-bootstrap/Accordion';

const PrintTable = ({data,  setCategory, setSort, setShow}) => {
    console.log(data)
    return(
        <>
        <Accordion  >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Меню</Accordion.Header>
                <Accordion.Body>
                    <AppInfo setShow={setShow}/>
                    <Category setCategory={setCategory} setSort={setSort} />
                </Accordion.Body>
            </Accordion.Item>
    
        </Accordion>
 
            <Table striped bordered hover id="list">
                <thead>
                    <tr style={{fontSize: '12px'}}>
                        <th style={{padding: '2px'}}>№</th>
                        <th style={{padding: '2px'}}>Артикул</th>
                        <th style={{padding: '2px'}}>Название</th>
                        <th style={{padding: '2px'}}>Кол-во</th>
                        <th style={{padding: '2px'}}>В работе</th>
                    </tr>
                </thead>
                <tbody style={{fontSize: '12px'}}>
                    {data.map((item, i )=> {
                        return(
                        <tr>
                            <td style={{padding: '2px'}}>{i+1}</td>
                            <td style={{padding: '2px'}}>{item.article}</td>
                            <td style={{padding: '2px'}}>{item.name_of_product}</td>
                            <td style={{padding: '2px 0px 0px 15px'}}>{item.quantity}</td>
                            <td style={{padding: '2px 0px 0px 15px'}}>{ item.orderQuantity ? `+${item.orderQuantity}` : null}</td>
                        </tr>
                        )
                    })}
            
                </tbody>
            </Table>
        </>
    )
}

export default PrintTable