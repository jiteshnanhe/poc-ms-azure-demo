import { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from "../components/barchart";
// import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../App.css';
import PieChart from '../components/pieChart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Dashboard() {
    const chartData = {
        labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
        values: [12, 19, 3, 5, 2],
    };
    const pieChartData = {
        labels: ['In Progress', 'To Do', 'Completed'],
        values: [12, 19, 8],
      };
    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        axios.get('https://wsdcrud.azurewebsites.net/api/users')
        .then(response => {
            console.log('user list -->', response.data);
            setUsersData(response.data);
        })
    }, []);

    // const navigate = useNavigate();
    // const routeChange = () =>{ 
    //     let path = '/createUser'; 
    //     navigate(path);
    // }

    return (
        <>
            <div style={{display:'flex', justifyContent:'space-between', marginLeft:'20px', marginRight:'20px'}}>
                <div>
                    <h1>WORKITEM DASHBOARD</h1>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginRight:'15px'}}>Welcome, JiteshShankar.nanhe@hcl.com</div>
                    <div style={{marginLeft:'15px'}}>
                        <Button variant="outlined">Sign out</Button>
                    </div>
                </div>
            </div>
            <div style={{margin:'20px'}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Item>
                                <div style={{height:'350px'}}>
                                    <h3 style={{marginTop:0}}>Work Items</h3>
                                    <div>500</div>
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
                                                {/* {usersData?.map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.sapId}</TableCell>
                                                        <TableCell>{row.designation}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                    </TableRow>
                                                ))}  */}
                                                <TableRow>
                                                    <TableCell>101</TableCell>
                                                    <TableCell>Work Item 1</TableCell>
                                                    <TableCell>To Do</TableCell>
                                                    <TableCell>07/02/2024</TableCell>
                                                    <TableCell>12/02/2024</TableCell>
                                                    <TableCell>16</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>102</TableCell>
                                                    <TableCell>Work Item 2</TableCell>
                                                    <TableCell>To Do</TableCell>
                                                    <TableCell>07/02/2024</TableCell>
                                                    <TableCell>12/02/2024</TableCell>
                                                    <TableCell>16</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>103</TableCell>
                                                    <TableCell>Work Item 3</TableCell>
                                                    <TableCell>To Do</TableCell>
                                                    <TableCell>07/02/2024</TableCell>
                                                    <TableCell>12/02/2024</TableCell>
                                                    <TableCell>16</TableCell>
                                                </TableRow>
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
