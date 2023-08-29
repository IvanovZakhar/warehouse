import Table from 'react-bootstrap/Table';
import Category from '../category/category';
import AppInfo from '../app-info/app-info';

const PrintTable = ({data,  setCategory, setSort, setShow}) => {

    return(
        <>
        <AppInfo setShow={setShow}/>
        <Category setCategory={setCategory} setSort={setSort} />
            <Table striped bordered hover id="list">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Артикул</th>
                        <th>Название</th>
                        <th>Кол-во</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i )=> {
                        return(
                        <tr>
                            <td>{i+1}</td>
                            <td>{item.article}</td>
                            <td>{item.name_of_product}</td>
                            <td>{item.quantity}</td>
                        </tr>
                        )
                    })}
            
                </tbody>
            </Table>
        </>
    )
}

export default PrintTable