import { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from "../components/barchart";
// import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useIsAuthenticated, useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import '../styles/dashboard.css';
import PieChart from '../components/pieChart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Dashboard({ msalInstance }) {
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const { result, error }= useMsalAuthentication(InteractionType.Popup,{scopes: ['user.read']});
    const [username, setUsername] = useState("");
    const [usersData, setUsersData] = useState([]);
    const [workItems, setWorkItems] = useState([]);
    const [totalWorkItems, setTotalWorkItems] = useState(0);
    console.log({ result });
    console.log({ error });

    const handleSignIn = () => {
        instance.loginRedirect({
            scopes: ['user.read']
        });
    }

    const handleSignOut = () => {
        instance.logoutRedirect();
    }
    
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [12, 19, 3, 5, 2, 12, 19, 3, 5, 2, 10, 11],
    };
    const pieChartData = {
        labels: ['In Progress', 'To Do', 'Completed'],
        values: [12, 19, 8],
      };

    useEffect(() => {
        axios.get('https://cosmosdemo1.azurewebsites.net/api/Items')
        .then(response => {
            console.log('user list -->', response.data);
            setWorkItems(response.data);
            setTotalWorkItems(response.data.length);
        })
    }, []);
    useEffect(() => {
        const fetchUserProfile = async () => {
            if(result){
                setUsername(result["account"]["username"]);
            try {
                var accessToken = result.accessToken;
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
        }
        };
        fetchUserProfile();
    }, [msalInstance,result]);
    console.log({workItems});
    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         try {
    //           const accounts = msalInstance.getAllAccounts();
    //           const accessTokenResponse = await msalInstance.acquireTokenSilent({
    //             scopes: ['User.Read'],
    //             account: accounts[0],
    //           });
    //           const accessToken = accessTokenResponse.accessToken;
              
    //           const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    //             headers: {
    //               Authorization: `Bearer ${accessToken}`,
    //             },
    //           });
              
    //           if (!response.ok) {
    //             throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    //           }
      
    //           const userProfileData = await response.json();
    //           console.log({userProfileData});
    //           setUsersData(userProfileData);
    //         } catch (error) {
    //           console.error('Error fetching user profile:', error);
    //         }
    //     };
    //     fetchUserProfile();
    // }, [msalInstance]);
    console.log({usersData});
    // const navigate = useNavigate();
    // const routeChange = () =>{ 
    //     let path = '/createUser'; 
    //     navigate(path);
    // }

    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get month (add 1 since month is zero-based) and pad with leading zero if needed
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <div className='header'>
                <div>
                    <h1 className='titleColor'>WORKITEM DASHBOARD</h1>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    {isAuthenticated ? <div className='titleColor' style={{marginRight:'15px'}}>Welcome, {username}</div> : null}
                    {isAuthenticated ? 
                        <div style={{marginLeft:'15px'}}>
                            <Button variant="outlined" onClick={handleSignOut}>Sign out</Button>
                        </div>
                    : 
                        <div style={{marginLeft:'15px'}}>
                            <Button variant="outlined" onClick={handleSignIn}>Sign In</Button>
                        </div>
                    }
                </div>
            </div>
            <div style={{margin:'20px'}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Item>
                                <div style={{height:'250px'}}>
                                    <h2 style={{margin:0}}>Work Items</h2>
                                    <div className='totalWorkItems'>{totalWorkItems}</div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item>
                                <PieChart data={pieChartData} />
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <BarChart data={chartData} />
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <div style={{margin:'20px'}}>
                                    <h2>Work Items</h2>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>Title</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Start Date</TableCell>
                                                    <TableCell>End Date</TableCell>
                                                    <TableCell>Total hours</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {workItems?.map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row.work_item_id}</TableCell>
                                                        <TableCell>{row.title}</TableCell>
                                                        <TableCell>{row.status}</TableCell>
                                                        <TableCell>{formatDate(row.start_Date)}</TableCell>
                                                        <TableCell>{formatDate(row.end_date)}</TableCell>
                                                        <TableCell>{row.total_hours}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            {/* <div style={{display:'flex', justifyContent:'center', flexFlow:'column'}}>
                <div style={{backgroundColor:'#5678b5', color:'white', display:'flex', justifyContent:'space-between', paddingRight:'20px', paddingLeft:'20px'}}>
                    <h1 style={{textAlign:'center'}}>Welcome to WSD POC</h1>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <button onClick={routeChange} style={{padding:'15px', margin:'15px', backgroundColor:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>Create User</button>
                        <button style={{padding:'15px', margin:'15px', backgroundColor:'white', border:'none', borderRadius:'5px'}}>Sign In</button>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'space-around', marginTop:'50px'}}>
                    <div style={{width:'40%'}}>
                        <BarChart data={chartData} />
                    </div>
                    <div style={{width:'40%'}}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>SAP ID</TableCell>
                                        <TableCell>Designation</TableCell>
                                        <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersData?.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.sapId}</TableCell>
                                            <TableCell>{row.designation}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                        </TableRow>
                                    ))} 
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>              
                </div>
            </div> */}
        </>
    )
}

export default Dashboard
