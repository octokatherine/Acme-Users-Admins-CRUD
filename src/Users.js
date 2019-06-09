import React, { Component } from 'react';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { users } = this.props;
        console.log(users)
        return ( 
            <div>
                <h2>Users</h2>
                {
                    users.map((user)=><div key={user.id}>{user[0]}</div>)
                }
            </div>
         );
    }
}
 
export default Users;