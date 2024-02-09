import { useState } from 'react';
import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';
import '../App.css';
import axios from 'axios';

function EditWorkItem() {
    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{width:'40%'}}>
                <div>
                    {success ? (
                        <Alert severity="success">
                            Work Item Updated Successfully
                        </Alert>) : null
                    }
                    {failed ? (
                        <Alert severity="error">
                            Something went wrong!
                        </Alert>) : null
                    }
                </div>
                <div>
                <h1>Work Item</h1>
                <hr />
                </div>
                <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='title'><b>Title</b></label>
                        <input type='text' id='title' name='title' value={workItem.title} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='status'><b>Select Status</b></label>
                        <select>
                            <option>To Do</option>
                        </select>
                        <input type='text' id='email' name='email' value={user.email} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='userId'><b>Assign To</b></label>
                        <input type='text' id='userId' name='userId' value={user.sapid} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='startDate'><b>Start Date</b></label>
                        <input type='text' id='startDate' name='startDate'value={user.designation} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='endDate'><b>End Date</b></label>
                        <input type='text' id='endDate' name='endDate'value={user.designation} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='totalHours'><b>Total Hours</b></label>
                        <input type='text' id='totalHours' name='totalHours'value={user.designation} onChange={handleChange} required/>
                    </div>
                    <div>
                        <button type='submit' className='registerbtn'>Update</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default EditWorkItem;