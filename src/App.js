
function DB(key){
    this.key = key;
    }
    
    DB.prototype = {
    delay: () => {
    return new Promise((res)=> {
    setTimeout(()=> {
        res();
    }, Math.random()*100)
    });
    },
    storage: window.localStorage,
    byId: function(id){
    return this.read()
    .then( items => items.find( item => item.id === id)); 
    },
    read: function(){
    return new Promise((resolve, reject)=> {
    const data = this.storage.getItem(this.key);
    if(!data){
        return this.delay().then(()=> resolve([]));
    }
    try{
        const parsed = JSON.parse(data);
        if(!Array.isArray(parsed)){
        return resolve([]);
        }
        this.delay().then(()=> resolve(parsed));
    }
    catch(ex){
        resolve([]);
    }
    });
    },
    create: function(item){
    return new Promise((resolve, reject)=> {
    this.read()
        .then( items => {
        const id = Math.random().toString().slice(2);
        const _item = Object.assign({}, item, { id });
        items.push(_item)
        this.storage.setItem(this.key, JSON.stringify(items))
        this.delay().then(() => resolve(_item));
        });
    });
    },
    update: function(item){
    return new Promise((resolve, reject)=> {
    this.read()
        .then( items => {
        const _items = items.map(_item => {
            if(_item.id === item.id){
            return item;
            }
            return _item;
        });
        this.storage.setItem(this.key, JSON.stringify(_items));
        this.delay().then(()=> resolve(item));
        });
    });
    },
    clear: function(){
    return new Promise((resolve, reject)=> {
    this.storage.removeItem(this.key);
    resolve();
    
    });
    
    },
    destroy: function(item){
    return new Promise((resolve, reject)=> {
    this.read()
        .then( items => {
        const _items = items.filter(_item => {
            return _item.id !== item.id;
        });
        this.storage.setItem(this.key, JSON.stringify(_items));
        resolve();
        });
    });
    },
    };
      
    


import React from 'react';
import Home from './Home';
import Users from './Users';
import {HashRouter, NavLink, Route} from 'react-router-dom'
const db = new DB('users');

          

class App extends React.Component{
    constructor(){
      super();
      this.state = {
        users: []
      }
    }
    componentDidMount(){
      db.read()
        .then(users => this.setState({ users }))
    }
    render(){
        console.log(this.state);
        const { users } = this.state;
      return( 
          <HashRouter>
            <NavLink exact activeClassName='is-active' to='/'>Home</NavLink>
            <NavLink exact activeClassName='is-active' to='/users'>Users</NavLink>
            <Route exact path='/' component={Home}/>
            <Route path='/users' render={()=><Users users={users} />}/>
          </HashRouter>
      );
    }
  }

  export default App;