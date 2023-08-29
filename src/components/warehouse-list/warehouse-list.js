 
import WarehouseListItem  from "../warehouse-list-item/warehouse-list-item" 
import { useEffect, useState } from 'react';
import useWarehouseService from '../../services/warehouse-services'; 
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './warehouse-list.css'

const WarehouseList = ({category, logs, sort,data ,}) => {
  

   
 
        const elements = data.map((item, i) => {
       
            const logsItem =  logs.filter(log => log.article === item.article)  
            return (<div key={item._id} >
                        <WarehouseListItem  data={item} />
                        <Accordion  >
                            <Accordion.Item eventKey={i} style={{backgroundColor: 'ffff1a'}}>
                                <Accordion.Header>{`История изменений ${item.article}`}</Accordion.Header>
                                <Accordion.Body >
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