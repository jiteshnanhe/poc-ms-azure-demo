import { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from "../components/barchart";
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function Dashboard() {
    const chartData = {
        labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
        values: [12, 19, 3, 5, 2],
    };
    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        axios.get('https://wsdcrud.azurewebsites.net/api/users')
        .then(response => {
            console.log('user list -->', response.data);
            setUsersData(response.data);
        })
    }, []);

    return (
        <div style={{display:'flex', justifyContent:'center', flexFlow:'column'}}>
            <h1 style={{textAlign:'center'}}>Welcome to POC Application</h1>
            <div style={{display:'flex', justifyContent:'space-around', marginTop:'50px'}}>
                <div style={{width:'35%'}}>
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
            <div>
                <Button variant="outlined" component={RouterLink} to="/createUser">Create User</Button>
            </div>
        </div>
    )
}

export default Dashboard
