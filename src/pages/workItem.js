import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useMsalAuthentication } from "@azure/msal-react";
// import { InteractionType } from '@azure/msal-browser';
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

function WorkItem({msalInstance}) {
    const location = useLocation();
    const navigate = useNavigate();
    // const { result } = useMsalAuthentication(InteractionType.Popup,{scopes: ['user.read']});
    console.log({ location });
    const workItemData = location.state?.data;
    const create = location.state?.page === 'create';
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get month (add 1 since month is zero-based) and pad with leading zero if needed
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const newWorkItem = {        
        name: '',
        description: '',
        email: '',
        desgnation: '',
        sapid: '',
        title: '',
        workItem_userId: '',
        status: 'To Do',
        type: '',
        role: '',
        work_item_id: '',
        start_Date: formatDate(new Date()),
        end_date: '',
        total_hours: '8'
    };
    const existingWorkItem = {
        id: workItemData?.id,
        name: workItemData?.name,
        description: workItemData?.description,
        email: workItemData?.email,
        desgnation: workItemData?.desgnation,
        sapid: workItemData?.sapid,
        title: workItemData?.title,
        workItem_userId: workItemData?.workItem_userId,
        status: workItemData?.status,
        type: workItemData?.type,
        role: workItemData?.role,
        work_item_id: workItemData?.work_item_id,
        start_Date: formatDate(workItemData?.start_Date),
        end_date: formatDate(workItemData?.end_date),
        total_hours: workItemData?.total_hours,  
    }
    const initialWorkItem = create ? newWorkItem : existingWorkItem;
    console.log({ workItemData });
    const [workItem, setWorkItem] = useState(initialWorkItem)
    const [usersData, setUsersData] = useState([]);
    console.log({ usersData });
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
        if(create){
            axios.post('https://wsdcrud.azurewebsites.net/api/items', {...workItem, id:'', total_hours:'8'})
            .then(response => {
                if(response.data.id) {
                    toast.success('Work item created successfully!');
                    setTimeout(() => {
                        let path = '/';
                        navigate(path);
                    }, 1000)
                } else {
                    toast.error("Something went wrong");
                }
            })
        } else {
            axios.put(`https://wsdcrud.azurewebsites.net/api/items/${workItem.id}}`, {...workItem})
            .then(response => {
                console.log({ response });
                if(response.status === 204) {
                    // alert('Work item updated successfully');
                    toast.success('Work item updated successfully!');
                    setTimeout(() => {
                        let path = '/';
                        navigate(path);
                    }, 1000)
                } else {
                    toast.error("Something went wrong");
                }
            })
        }
    }

    const backToHome = () => {
        navigate('/');
    }
    return(
        <div style={{margin:'20px'}}>
            <Grid item xs={12}>
                <Item>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div style={{width:'40%'}}>
                            <div>
                                <h2 style={{textAlign:'left'}}>{create? 'Create' : 'Update'} Work Item</h2>
                                <hr />
                            </div>
                            <div>
                            <form onSubmit={handleSubmit} style={{textAlign:'left'}}>
                                {/* <div>
                                    <label htmlFor='work_item_id'><b>Work Item ID</b></label>
                                    <input type='text' id='work_item_id' name='work_item_id' value={workItem.work_item_id} onChange={handleChange} required/>
                                </div> */}
                                <div>
                                    <label htmlFor='title'><b>Title</b></label>
                                    <input type='text' id='title' name='title' value={workItem.title} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor='status'><b>Select Status</b></label>
                                    <select name='status' id='status' value={workItem.status} onChange={handleChange}>
                                        <option value='To Do'>To Do</option>
                                        <option value='In Progress'>In Progress</option>
                                        <option value='Completed'>Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='workItem_userId'><b>Assign To</b></label>
                                    <select name='workItem_userId' id='workItem_userId' value={workItem.workItem_userId} onChange={handleChange}>                         
                                        <option value=''>Select</option>
                                        {usersData?.value?.map(user => {
                                            return <option value={user.displayName}>{user.displayName}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='start_Date'><b>Start Date</b></label>
                                    <input type='date' id='start_Date' name='start_Date'value={workItem.start_Date} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor='end_date'><b>End Date</b></label>
                                    <input type='date' id='end_date' name='end_date'value={workItem.end_date} onChange={handleChange} required/>
                                </div>
                                {/* <div>
                                    <label htmlFor='total_hours'><b>Total Hours</b></label>
                                    <input type='text' id='total_hours' name='total_hours'value={workItem.total_hours} onChange={handleChange} required/>
                                </div> */}
                                <div>
                                    <label htmlFor='description'><b>Description</b></label>
                                    <input type='text' id='description' name='description'value={workItem.description} onChange={handleChange} required/>
                                </div>
                                <div>
                                    <button type='submit' className='registerbtn'>
                                        {create? 'Create' : 'Update'}
                                    </button>
                                    <button className='registerbtn' onClick={backToHome}>
                                        Back To Home
                                    </button>
                                    <ToastContainer />
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

export default WorkItem;