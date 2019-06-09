
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
import UpdateUser from './UpdateUser'
import {HashRouter, NavLink, Route} from 'react-router-dom'

const db = new DB('users');

          

class App extends React.Component{
    constructor(){
      super();
      this.state = {
        users: []
      }
      this.createUser = this.createUser.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
      db.read()
        .then(users => this.setState({ users }))
    }

    async createUser(e, name, isAdmin){
        e.preventDefault();
        const newUser = await db.create({name, isAdmin})
        const users = [...this.state.users, newUser];
        this.setState({users});
    }

    async updateUser(e, user, isAdmin) {
        e.preventDefault();
        const idx = this.state.users.indexOf(user);
        const updatedUser = await db.update(user);
        updatedUser.isAdmin = isAdmin;
        const updatedUsers = this.state.users;
        updatedUsers[idx] = updatedUser;
        this.setState({users: updatedUsers})
}

    async deleteUser(e, user){
        e.preventDefault();
        const idx = this.state.users.indexOf(user);
        db.destroy(user);
        const updatedUsers = Array.concat(this.state.users.slice(0, idx), this.state.users.slice(idx+1, this.state.users.length-1));
        this.setState({users: updatedUsers})
        
    }

    render(){
        const { users, admins } = this.state;
        const { createUser, updateUser, deleteUser } = this;
        const numAdmins = users.filter((el)=>el.isAdmin);
      return( 
          <HashRouter>
            <div id='nav'>
                <NavLink style={{marginRight: '20px'}} exact activeClassName='is-active' to='/'>Home</NavLink>
                <NavLink exact activeClassName='is-active' to='/users'>Users:({users.length}) Admins:({numAdmins.length})</NavLink>
            </div>
            <Route exact path='/' component={Home}/>
            <Route path='/users' render={()=><Users users={users} createUser={createUser} admins={admins}/>}/>
            <Route path='/users/:id' render={(props)=><UpdateUser users={users}  updateUser={updateUser} deleteUser={deleteUser} {...props}/>}/>
          </HashRouter>
      );
    }
  }

  export default App;