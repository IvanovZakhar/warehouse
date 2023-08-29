import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useWarehouseService from '../../services/warehouse-services';
import Table from 'react-bootstrap/Table';

function Logs({show, setShow, logs}) { 
  const handleClose = () => setShow(false);
 

  const tableLogs = logs.map((log, i) => {
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
  })
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas show={show} onHide={handleClose} placement='top' style={{height: '80vh'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>История изменений</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
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
                      
                        {tableLogs}
                        
                    </tbody>
                </Table>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Logs;