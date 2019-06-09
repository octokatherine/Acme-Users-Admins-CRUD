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
                    users.map(user=> {
                        return <div>{Object.keys(user).map( key=>{ 
                        if (key !== 'id') return user[key]
                    })}</div>
                    })
                }
            </div>
         );
    }
}
 
export default Users;