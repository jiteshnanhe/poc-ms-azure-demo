import { useState } from 'react';
import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';
import '../App.css';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState({
    name:'',
    email:'',
    sapid:'',
    designation:''
  })
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

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
    axios.post('https://wsdcrud.azurewebsites.net/api/users', {...user, partition:'test', id:user.sapid}).then(response => {
      if(response.data.id) {
        setSuccess(true);
      } else {
        setFailed(true);
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <div style={{width:'40%'}}>
        <div>
            {success ? (
                <Alert severity="success">
                    User Added Successfully
                </Alert>) : null
            }
            {failed ? (
                <Alert severity="success">
                    User Added Successfully
                </Alert>) : null
            }
        </div>
        <div>
          <h1>CREATE USER</h1>
          <p>Please fill in this form to create an user</p>
          <hr />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'><b>Name</b></label>
              <input type='text' id='name' name='name' value={user.name} onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor='email'><b>Email</b></label>
              <input type='text' id='email' name='email' value={user.email} onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor='sap-id'><b>SAP ID</b></label>
              <input type='text' id='sap-id' name='sapid' value={user.sapid} onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor='designation'><b>Designation</b></label>
              <input type='text' id='designation' name='designation'value={user.designation} onChange={handleChange} required/>
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
