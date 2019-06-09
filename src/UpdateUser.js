import React, { Component } from 'react';

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {}
         }
         this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const { users } = this.props;
        console.log(this.props)
        const { id } = this.props.match.params;
        const user = users.find(function(user) {return user.id === id})
        this.setState({user})
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params !== this.props.match.params) {
            const { users } = this.props;
            const { id } = this.props.match.params;
            const user = users.find(function(user) {return user.id === id})
            this.setState({user})
        }
    }

    handleChange(ev){
        const updatedUser = this.state.user;
        updatedUser.name = ev.target.value;
        this.setState({user: updatedUser})
    }

    render() { 
        console.log(this.state)
        const { user } = this.state;
        const { handleChange } = this;
        const { updateUser } = this.props;
        return ( 
            <form onSubmit={(e)=>updateUser(e, user)}>
                <h3>Update User</h3>
                <input placeholder="enter name" name="name" value={user && user.name} onChange={handleChange}></input>
                <button type='submit'>Update</button>
                <button type='submit'>Delete</button>
            </form>
         );
    }
}
 
export default UpdateUser;