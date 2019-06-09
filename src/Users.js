import React, { Component } from 'react';
import CreateUser from './CreateUser'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { users, createUser } = this.props;
        console.log(users)
        return ( 
            <div>
                <h2>Users</h2>
                <CreateUser createUser={createUser}/>
                {
                    users.map(user=> {
                        return <div key={user.id}>{Object.keys(user).map( key=>{ 
                        if (key !== 'id') return user[key]
                    })}</div>
                    })
                }
            </div>
         );
    }
}
 
export default Users;