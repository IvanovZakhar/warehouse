import {useHttp} from '../hooks/http.hooks';

const useWarehouseService = () => {
    const {loading, request,  error, clearError, successfull, errorMessage} = useHttp()
    const _url =  process.env.REACT_APP_SERVER_URL  || "https://f9fd09879062.vps.myjino.ru:49256"

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

    return {
        getAllProducts,
        updateProduct,
        getAllLogs, 
        newOrder,
        getAllOrders
    }
}

export default useWarehouseService;