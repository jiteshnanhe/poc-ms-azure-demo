import { useState } from 'react';
import '../App.css';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState({
    name:'',
    email:'',
    sapId:'',
    designation:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prevValue => {
      return {
        ...prevValue,
        [name]:value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({user});
    axios.get('https://wsdcrud.azurewebsites.net/api/items').then(response => {
      console.log(response);
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <div style={{width:'40%'}}>
        <div>
          <h1>CREATE USER</h1>
          <p>Please fill in this form to create an user</p>
          <hr />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'><b>Name</b></label>
              <input type='text' id='name' name='name' onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor='email'><b>Email</b></label>
              <input type='text' id='email' name='email' onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor='sap-id'><b>SAP ID</b></label>
              <input type='text' id='sap-id' name='sapId' onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor='designation'><b>Designation</b></label>
              <input type='text' id='designation' name='designation' onChange={handleChange} required/>
            </div>
            <div>
              <button type='submit' className='registerbtn'>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUser
