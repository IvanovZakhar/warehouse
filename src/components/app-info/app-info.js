import './app-info.css'

const AppInfo = (data) => {

    // const increase = data.data.filter(item => {return item.increase === true})

    
     return(
        <div className="app-info">
        <h1>Склад АрсеналЪ</h1>
        {/* <h2>Общее число сотрудников: {data.data.length}.</h2>
        <h2>Премию получат: {increase.length}</h2> */}
    </div>
     )

    
}

export default AppInfo;