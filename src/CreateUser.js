import React, { Component } from 'react';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            isAdmin: false
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleChange(ev){
        this.setState({name: ev.target.value})
        console.log(this.state.name)
    }

    handleCheckChange(ev){
        const value = ev.target.checked
        this.setState({isAdmin: value})
    }
    
    render() { 
        const { createUser } = this.props;
        const { handleChange, handleCheckChange } = this;
        const { name, isAdmin } = this.state;
        return ( 
            <form onSubmit={(e)=>createUser(e, name, isAdmin)}>
                <h3>Create A User</h3>
                <input type='text' name='name' placeholder='enter name' value={name} onChange={handleChange}></input>
                <label>is Admin</label>
                <input type="checkbox" name="isAdmin" checked={isAdmin} onChange={handleCheckChange}></input>
                <button type='submit'>Create</button>
            </form>
         );
    }
}
 
export default CreateUser;