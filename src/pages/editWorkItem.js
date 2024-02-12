import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useMsalAuthentication } from "@azure/msal-react";
// import { InteractionType } from '@azure/msal-browser';
// import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';
import { Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../App.css';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function EditWorkItem({msalInstance}) {
    const location = useLocation();
    // const navigate = useNavigate();
    // const { result } = useMsalAuthentication(InteractionType.Popup,{scopes: ['user.read']});
    const workItemData = location.state;
    console.log({ workItemData });
    const [workItem, setWorkItem] = useState({
        id: workItemData.id,
        workItemId: workItemData.work_item_id,
        title: workItemData.title,
        status: workItemData.status,
        userId: workItemData.workItem_userId,
        startDate: workItemData.start_Date,
        endDate: workItemData.end_date,
        totalHours: workItemData.total_hours
    })
    const [usersData, setUsersData] = useState([]);
    console.log({ usersData });
    // const [success, setSuccess] = useState(false);
    // const [failed, setFailed] = useState(false);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                var accessToken = localStorage.getItem('accessToken');
                const response = await fetch('https://graph.microsoft.com/v1.0/users', {
                    headers: {
                    Authorization: `Bearer ${accessToken}`,
                    },
                });           
                if (!response.ok) {
                    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
                }
                const userProfileData = await response.json();
                console.log({userProfileData});
                setUsersData(userProfileData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
        // const fetchUserProfile = async () => {
        //     if(result){
        //         try {
        //             var accessToken = result.accessToken;
        //             const response = await fetch('https://graph.microsoft.com/v1.0/users', {
        //                 headers: {
        //                 Authorization: `Bearer ${accessToken}`,
        //                 },
        //             });           
        //             if (!response.ok) {
        //                 throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        //             }
        //             const userProfileData = await response.json();
        //             console.log({userProfileData});
        //             setUsersData(userProfileData);
        //         } catch (error) {
        //             console.error('Error fetching user profile:', error);
        //         }
        //     }
        // };
        // fetchUserProfile();
    }, [msalInstance]);
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log({name}, {value});
        setWorkItem(prevValue => {
          return {
            ...prevValue,
            [name]:value
          }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({workItem});
        axios.put('https://cosmosdemo1.azurewebsites.net/api/Items', {workItem})
        .then(response => {
            console.log({ response });
        })
        // axios.post('https://wsdcrud.azurewebsites.net/api/users', {...user, partition:'test', id:user.sapid}).then(response => {
        //   if(response.data.id) {
        //     setSuccess(true);
        //   } else {
        //     setFailed(true);
        //   }
        // })
        // let path = '/'; 
        // navigate(path);
    }
    return(
        <div style={{margin:'20px'}}>
            <Grid item xs={12}>
                <Item>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div style={{width:'40%'}}>
                            {/* <div>
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
                            </div> */}
                            <div>
                                <h2 style={{textAlign:'left'}}>Work Item</h2>
                                <hr />
                            </div>
                            <div>
                            <form onSubmit={handleSubmit} style={{textAlign:'left'}}>
                                <div>
                                    <label htmlFor='workItemId'><b>Work Item ID</b></label>
                                    <input type='text' id='workItemId' name='workItemId' value={workItem.workItemId} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor='title'><b>Title</b></label>
                                    <input type='text' id='title' name='title' value={workItem.title} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor='status'><b>Select Status</b></label>
                                    <select name='status' id='status' value={workItem.status} onChange={handleChange}>
                                        <option value=''>Select</option>
                                        <option value='To Do'>To Do</option>
                                        <option value='In Progress'>In Progress</option>
                                        <option value='Completed'>Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='userId'><b>Assign To</b></label>
                                    <select name='userId' id='userId' value={workItem.userId} onChange={handleChange}>                         
                                        <option value=''>Select</option>
                                        <option value='User 1'>User 1</option>
                                        <option value='User 2'>User 2</option>
                                        <option value='User 2'>User 3</option>
                                        {usersData?.map(user => {
                                            return <option value={user.displayName}>{user.displayName}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='startDate'><b>Start Date</b></label>
                                    <input type='text' id='startDate' name='startDate'value={workItem.startDate} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor='endDate'><b>End Date</b></label>
                                    <input type='text' id='endDate' name='endDate'value={workItem.endDate} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor='totalHours'><b>Total Hours</b></label>
                                    <input type='text' id='totalHours' name='totalHours'value={workItem.totalHours} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <button type='submit' className='registerbtn'>Update</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </Item>
            </Grid>
        </div>
    );
}

export default EditWorkItem;