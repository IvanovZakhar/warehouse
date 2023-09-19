 
import WarehouseListItem  from "../warehouse-list-item/warehouse-list-item" 
import { useEffect, useState  } from 'react'; 
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './warehouse-list.css'

const WarehouseList = ({logs, data, allOrders}) => {
    const [newLogs, setNewLogs] = useState([])

    useEffect(() => {
      setNewLogs(logs)
    }, [logs])

    const sortLogsDate = (e) => { 
        setNewLogs(logs.filter(log => log.date.slice(0,10) === e.target.value))
       }
     
       const resetNewLogs = () => {
         setNewLogs(logs)
       }
     
         
 
        const elements = data.map((item, i) => {
       
            const logsItem =  newLogs.filter(log => log.article === item.article)  
            return (<div key={item._id} className="list-group">
                        <WarehouseListItem  data={item} />
                        <Accordion  >
                            <Accordion.Item eventKey={i} style={{backgroundColor: 'ffff1a', height: ''}}>
                                <Accordion.Header style={{  padding: 0}}>{`История изменений ${item.article}`}</Accordion.Header>
                  
                                <Accordion.Body >
                                <input type="date" onChange={sortLogsDate}/>
                                <Button variant="primary" onClick={resetNewLogs} style={{marginLeft: '10px', marginBottom: '10px', height: '35px', }}>Показать все</Button>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Дата</th>
                                            <th>Артикул</th>
                                            <th>Название</th>
                                            <th>Причина</th>
                                            <th>Было на складе</th>
                                            <th>Разница</th>
                                            <th>Итого на складе</th>
                                        </tr> 
                                    </thead>
                                    <tbody>
                                        {logsItem.map((log, i) => {
                                            const {date, article, name_of_product, newQuantity, oldQuantity, quantityDifference, comment} = log
                                            const newDate = `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(0,4)}`
                                            const newTime = `${+date.slice(11,13) + 3}:${date.slice(14,16)}` 
                                            return(
                                                
                                                <tr key={i}>
                                                    <td>{i+1}</td>
                                                    <td>
                                                        {newTime}
                                                        <br/>
                                                        {newDate}
                                                    </td>
                                                    <td>{article}</td>
                                                    <td>{name_of_product}</td>
                                                    <td>{comment}</td>
                                                    <td>{oldQuantity }</td>
                                                    <td>{quantityDifference}</td>
                                                    <td>{newQuantity}</td>
                                                </tr>
                                            
                                            )
                                        })} 
                                        
                                    </tbody>
                                </Table>
                                </Accordion.Body>
                            </Accordion.Item> 
                        </Accordion>
                    </div>
                    )
            })

  
            
            return(
                <> 
                    <ul className="app-list list-group"  > 
                        {elements}
                    </ul> 
                </>
            )
    }
 

export default WarehouseList;