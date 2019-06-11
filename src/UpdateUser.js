import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            name: '',
            isAdmin: false
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    componentDidMount(){
        try {
            const { users } = this.props;
            console.log(users)
            console.log(this.props);
            const { id } = this.props.match.params;
            const user = users.find(function(user) {return user.id === id});
            console.log(user);
            if(user){
            this.setState({user, name: user.name, isAdmin: user.isAdmin});
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params !== this.props.match.params) {
            const { users } = this.props;
            const { id } = this.props.match.params;
            const user = users.find(function(user) {return user.id === id});
            this.setState({user, name: user.name, isAdmin: user.isAdmin});
            }
        }
        

    handleChange(ev){
        const name = ev.target.value;
        this.setState({name});
    }

    handleCheckChange(ev){
        const value = ev.target.checked;
        this.setState({isAdmin: value});
    }

    render() { 
        const { user, isAdmin, name } = this.state;
        const { handleChange, handleCheckChange } = this;
        const { updateUser, deleteUser } = this.props;
        return ( 
            <form onSubmit={(e)=>updateUser(e, user, name, isAdmin)}>
                <h3>Update User</h3>
                <input placeholder="enter name" name="name" value={name} onChange={handleChange}></input>
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