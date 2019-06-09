import React, { Component } from 'react';

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            isAdmin: false
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    componentDidMount(){
        const { users } = this.props;
        console.log(this.props)
        const { id } = this.props.match.params;
        const user = users.find(function(user) {return user.id === id})
        this.setState({user, isAdmin: user.isAdmin})
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params !== this.props.match.params) {
            const { users } = this.props;
            const { id } = this.props.match.params;
            const user = users.find(function(user) {return user.id === id})
            this.setState({user, isAdmin: user.isAdmin})
        }
    }

    handleChange(ev){
        const updatedUser = this.state.user;
        updatedUser.name = ev.target.value;
        this.setState({user: updatedUser})
    }

    handleCheckChange(ev){
        const value = ev.target.checked
        this.setState({isAdmin: value})
    }

    render() { 
        console.log(this.state)
        const { user, isAdmin } = this.state;
        const { handleChange, handleCheckChange } = this;
        const { updateUser } = this.props;
        return ( 
            <form onSubmit={(e)=>updateUser(e, user, isAdmin)}>
                <h3>Update User</h3>
                <input placeholder="enter name" name="name" value={user && user.name} onChange={handleChange}></input>
                <label>is Admin</label>
                <input type="checkbox" name="isAdmin" checked={isAdmin} onChange={handleCheckChange}></input>
                <button type='submit'>Update</button>
                <button type='submit'>Delete</button>
            </form>
         );
    }
}
 
export default UpdateUser;