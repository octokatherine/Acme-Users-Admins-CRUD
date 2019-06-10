import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        try {
            const { users } = this.props;
            const { id } = this.props.match.params;
            const user = users.find(function(user) {return user.id === id});
            console.log(user);
            this.setState({user, isAdmin: user.isAdmin});
        }
        catch (err) {
            console.log(err)
        }
    }

    componentDidUpdate(prevProps){
        try {
            if (prevProps.match.params !== this.props.match.params) {
                const { users } = this.props;
                const { id } = this.props.match.params;
                const user = users.find(function(user) {return user.id === id});
                this.setState({user, isAdmin: user.isAdmin});
                }
            }
        catch(err) {
            console.log(err);
        }
        }

    handleChange(ev){
        const updatedUser = this.state.user;
        updatedUser.name = ev.target.value;
        this.setState({user: updatedUser});
    }

    handleCheckChange(ev){
        const value = ev.target.checked;
        this.setState({isAdmin: value});
    }

    render() { 
        const { user, isAdmin } = this.state;
        const { handleChange, handleCheckChange } = this;
        const { updateUser, deleteUser } = this.props;
        return ( 
            <form onSubmit={(e)=>updateUser(e, user, isAdmin)}>
                <h3>Update User</h3>
                <input placeholder="enter name" name="name" value={user && user.name} onChange={handleChange}></input>
                <label>is Admin</label>
                <input type="checkbox" name="isAdmin" checked={isAdmin} onChange={handleCheckChange}></input>
                <button type='submit' id='update'>Update</button>
                <button type='button' id='delete' onClick={(e)=>{deleteUser(e, user); this.props.history.push('/users')}}>Delete</button>
                <Link to='/users'>Cancel</Link>
            </form>
         );
    }
}
 
export default UpdateUser;