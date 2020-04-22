import React, { Component } from 'react';

class todo extends Component {
    state = {
        id : '',
        data : [],
        firstName : ' ',
        lastName : ' ',
        singleData: ''
    }

    handleChange(e){
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    save(e) {
        e.preventDefault();
        if(this.state.data.length === 0){
            this.state.id = 0
        }else{
            this.state.id = this.state.data[this.state.data.length -1].id + 1;
        }
        this.state.data.push({id: this.state.id, firstName:this.state.firstName, lastName:this.state.lastName})
        console.log(this.state.data)
        this.setState({
            firstName : '',
            lastName: ''
        })
    }

    edit(e, id){
        e.preventDefault()
        this.state.singleData = this.state.data.find(d => d.id === id)
        console.log(this.state.singleData)
        
        this.setState({
            id: id,
            firstName : this.state.singleData.firstName,
            lastName: this.state.singleData.lastName
        })
    }

    update(e){
        e.preventDefault()
        this.state.singleData = this.state.data.find(d => d.id === this.state.id)
        this.state.singleData.firstName = this.state.firstName
        this.state.singleData.lastName = this.state.lastName

        this.setState({
            firstName : '',
            lastName: ''
        })
    }

    delete(e, id) {
        e.preventDefault();
        this.state.data.splice(this.state.data.findIndex(data => data.id === id), 1);
        this.setState({

        })
    }

    render() {
        return (
            <div>
                <br/><br/>
                <div className="form">
                    <input type="text" id="firstName" value={this.state.firstName} onChange={e => this.handleChange(e)} placeholder="FirstName"/>
                    <input type="text" id="lastName" value={this.state.lastName} onChange={e => this.handleChange(e)} placeholder="LastName"/>
                    <button onClick = {e => this.save(e)}>Save</button>
                    <button onClick = {e => this.update(e)}>Update</button>

                </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>firstName</th>
                                <th>LastName</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((item, index)=> 
                                <tr key={index}>
                                    <td>{item.id + 1 }</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td><button onClick={e => this.edit(e, item.id)}>Edit</button></td>
                                    <td><button onClick={e => this.delete(e, item.id)}>Delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default todo;