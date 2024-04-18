import {useHttp} from '../hooks/http.hooks';

const useWarehouseService = () => {
    const {loading, request,  error, clearError, successfull, errorMessage} = useHttp()
    const _url =  process.env.REACT_APP_SERVER_URL  || "https://f9fd09879062.vps.myjino.ru:49256"
    // const headersDef = {  
    //     'Client-Id': '634359' ,
    //     'Api-Key': '88e173c2-16ad-4a13-a3a5-c322f8a6e305'
    //  } 

// Получение текущей даты и времени в Московском времени
const moscowTime = new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' });
const currentDateTime = new Date(moscowTime);
const currentFormattedDate = currentDateTime.toISOString().slice(0, 19) + 'Z'; 

// Получение даты и времени через неделю от текущего времени в Московском времени
const nextWeekDateTime = new Date(currentDateTime);
nextWeekDateTime.setDate(nextWeekDateTime.getDate() + 10);
const nextWeekFormattedDate = nextWeekDateTime.toISOString().slice(0, 19) + 'Z'; 



     const formData = JSON.stringify({
        dir: 'ASC',
        filter: {
          cutoff_from: `${currentFormattedDate}`,
          cutoff_to: `${nextWeekFormattedDate}`,
          delivery_method_id: [],
          provider_id: [],
          status: 'awaiting_deliver',
          warehouse_id: [],
        },
        limit: 100,
        offset: 0,
        with: {
          analytics_data: true,
          barcodes: true,
          financial_data: true,
          translit: true,
        }
    })

    const getAllProducts = async () => {
        
        const res = await request(
                                    `${_url}/products-for-warehouse`, 
                                    'GET' 
                                    ) 
        return res
    }

    const updateProduct = async (data) => {
        const res = await request(
            `${_url}/update/products-for-warehouse/`, 
            'POST', 
            JSON.stringify(data) 
            )

        return res
    }

    const newOrder = async (data) => {
        const res = await request(
            `${_url}/new-order-warehouse`, 
            'POST', 
            JSON.stringify(data) 
            )

        return res
    }

    const getAllLogs = async () => {
        
        const res = await request(`${_url}/logs/products-for-warehouse`, 
                                    'GET')
    
        return res
    }

    
    const getAllOrders = async () => { 
        const res = await request(`${_url}/all-orders-warehouse`, 
                                    'GET') 
        return res
    }


    const getAllOrdersOZN = async (headersDef) => {  
        const res = await request(`${_url}/arsenal-orders`, 'GET' );  
       
        return res.map(transformProduct)
    }

    const getAllOrdersYandex = async (companyId) => { 
      
        const res = await request(`https://f9fd09879062.vps.myjino.ru:49256/yandex-orders/${companyId}`, 'GET');
         
        return res.orders
    }

    const transformProduct = (product) => {
        
        return{
            postingNumber: product.posting_number,
            date: `${product.shipment_date.slice(8, 10)}.${product.shipment_date.slice(5, 7)}.${product.shipment_date.slice(2, 4)}`,
            productArt: product.offer_id,
            productName: product.name,
            productPrice: product.price,
            quantity: product.quantity,
            warehouse: product.warehouse, 
            company: product.company
        } 
     }

    return {
        getAllProducts,
        updateProduct,
        getAllLogs, 
        newOrder,
        getAllOrders, 
        getAllOrdersOZN, 
        getAllOrdersYandex 
    }
}

export default useWarehouseService;