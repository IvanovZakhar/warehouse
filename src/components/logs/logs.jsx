import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas'; 
import Table from 'react-bootstrap/Table';

function Logs({show, setShow, logs}) { 
  const handleClose = () => setShow(false);
  const [newLogs, setNewLogs] = useState([])

  useEffect(() => {
    setNewLogs(logs.sort(compareWithCurrentDate))
  }, [logs])
 
  console.log(logs)
  const sortLogsDate = (e) => { 
   setNewLogs(logs.filter(log => log.date.slice(0,10) === e.target.value))
  }

// Функция для сортировки по ближайшей дате к текущей дате
function compareWithCurrentDate(a, b) {
  const currentDate = new Date();
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  const differenceA = Math.abs(currentDate - dateA);
  const differenceB = Math.abs(currentDate - dateB);

  return differenceA - differenceB;
}

  const resetNewLogs = () => {
    setNewLogs(logs)
  }

  const tableLogs = newLogs.map((log, i) => {
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
                <input type="date" onChange={sortLogsDate}/>
                <Button variant="primary" onClick={resetNewLogs} style={{marginLeft: '10px', marginBottom: '10px', height: '35px'}}>Показать все</Button>
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