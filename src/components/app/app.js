import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeersList from '../employeers-list/employeers-list';
import EmployeersAddForm from '../employeers-add-form/employeers-add-form';


import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John S.', salary: 800, increase: false, like: true, id: 1 },
                {name: 'Alex D.', salary: 3000, increase: true, like: false, id: 2 },
                {name: 'Carl W.', salary: 5000, increase: false, like: false, id: 3 },
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        if(newItem.name === '' || newItem.salary === '') {
            return alert('You cant add an empty string ')
        } else {
            this.setState(({data}) => {
                const newArr = [...data, newItem]
                return {
                    data: newArr
                }
            })
        }
    }

    // onToggleIncrease = (id) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
            
        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            
        //     return {
        //         data: newArr
        //     }
        // })

    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if(item.id === id) {
    //                 return {...item, increase: !item.increase}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    // onToggleLike = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if(item.id === id) {
    //                 return {...item, like: !item.like}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmpty = (items, term) => {
        if(term.length === 0) {
            return items;
        } 

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'like':
                return items.filter(item => item.like);
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            default: 
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }
    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const prizeCounter = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmpty(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                    prizeCounter={prizeCounter}
                    employees={employees}/>
    
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        filter={filter} 
                        onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeersAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;