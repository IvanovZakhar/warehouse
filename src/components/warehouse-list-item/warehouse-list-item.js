import Counter from '../counter/counter';
import './warehouse-list-item.css';


const WarehouseListItem = ({data}) => {
   
        console.log(data)
        const {name_of_product, article, quantity,main_photo_link} =  data;

        let classNames = 'list-group-item';
       
    return (
            <li className={classNames}>
                <img src={main_photo_link}  alt='photo' className='main_photo'/>
                <div className='name_and_article'>
                    <h2>{article}</h2>
                    <span className="list-group-item-label"   data-toggle="like">{name_of_product}</span>
                </div>
                
              
            
                <Counter data={data}/>
            </li>
            )
    }
    
 

    

export default WarehouseListItem;