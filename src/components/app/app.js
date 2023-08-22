import { useState, useEffect } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import WarehouseList from '../warehouse-list/warehouse-list';

import './app.css';


const App = () => {

 //    const deleteItem = (id) =>{
//         this.setState(({data}) => {
//             return{
//                 data: data.filter(item => item.id !== id)
//             }
//         })
//     }

//     const addItem = (name, salary)  => {
//         const newItem = {
//             name, 
//             salary,
//             increase: false,
//             like: false,
//             id: this.maxId++
//         }
//         this.setState(({data}) => {
//             const newArr = [...data, newItem];
//             return {
//                 data: newArr
//             }
//         });
//     }
    
//     const onToggleProp = (id, prop) => {
//         this.setState(({data}) => ({
//             data: data.map(item => {
//                 if (item.id === id){
//                     return{...item, [prop]: !item[prop]}
//                 }
//                 return item;
//             })
//         }))
//     }

//     const searchEmp = (items, term) =>{
//         if(term.length === 0){
//             return items;
//         }

//         return items.filter(item => {
//             return item.name.indexOf(term) > -1
//         })
//     }

//     const onUpdateSearch = (term) => {
//         this.setState({term});
//     }

//     const filterPost = (items, filter) => {
//         switch (filter) {
//             case 'rise':
//                 return items.filter(item => item.like);
//             case 'moreThen1000':
//                 return items.filter(item => item.salary > 1000);
//             default: 
//                 return items    
//         }
//     }

//     const onFilterSelect = (filter) => {
//         this.setState({filter});
//     }

//     const ValueChange = (id) => {
//         console.log(id)
//         console.log(this.state.valueSalary)
//     }

//     const onUpdateValueSalary = (valueSalary) => {
//         this.setState({valueSalary})
//         console.log(this.state.valueSalary)
        
//     }

    
        // const {data, term, filter} = this.state;
        // const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return(
            <div className="app">
                <AppInfo />
    
                <div className="search-panel">
                    <SearchPanel  />
                   
                </div>
                <WarehouseList  />
                {/* <EmployersAddForm  /> */}
            </div>
        )
    }
 

export default App;