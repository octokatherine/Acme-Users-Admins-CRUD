import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import CreateUser from './CreateUser'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { users, createUser} = this.props;
        return ( 
            <div>
                <h2>Users</h2>
                <CreateUser createUser={createUser}/>
                {
                    users.map(user=> {
                        return <div className={user.isAdmin ? 'is-Admin' : null} key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></div>
                    })
                }
            </div>
         );
    }
}
 
export default Users;