import { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from "../components/barchart";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/dashboard.css';
import PieChart from '../components/pieChart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Dashboard() {
    const navigate = useNavigate();
    const [workItems, setWorkItems] = useState([]);
    const [totalWorkItems, setTotalWorkItems] = useState(0);

    const workItem = (workItem) => {
        let path = '/workItem'; 
        navigate(path, { state: { data: workItem, page:'edit' }});
    }
    const createWorkItem = () => {
        let path = '/workItem'; 
        navigate(path, { state: { page:'create' }});
    }
    
    const chartData = {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0,0,0,1)',
        labels: ['NOV/23', 'OCT/23', 'Dec/23', 'Jan/24', 'Feb/24'],
        values: [12, 19, 3, 5, 2],
    };
    const pieChartData = {
        labels: ['In Progress', 'To Do', 'Completed'],
        values: [12, 19, 8],
      };

    useEffect(() => {
        axios.get('https://wsdcrud.azurewebsites.net/api/items')
        .then(response => {
            setWorkItems(response.data);
            setTotalWorkItems(response.data.length);
        })

        // axios.get('https://wsdcrudapi.azurewebsites.net/api/items')
        // .then(response => {
        //     console.log('items data -->', response.data);
        // })
    }, []);
    console.log({workItems});

    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get month (add 1 since month is zero-based) and pad with leading zero if needed
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
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
                                    <div style={{ display:'flex', justifyContent:'space-between'}}>
                                        <div>
                                            <h2>Work Items</h2>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <Button variant="outlined" onClick={()=>createWorkItem()}>Create Work Item</Button>
                                        </div>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>Title</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Assign To</TableCell>
                                                    <TableCell>Start Date</TableCell>
                                                    <TableCell>End Date</TableCell>
                                                    <TableCell>Total hours</TableCell>
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {workItems?.map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row.work_item_id}</TableCell>
                                                        <TableCell>{row.title}</TableCell>
                                                        <TableCell>{row.status}</TableCell>
                                                        <TableCell>{row.workItem_userId}</TableCell>
                                                        <TableCell>{formatDate(row.start_Date)}</TableCell>
                                                        <TableCell>{formatDate(row.end_date)}</TableCell>
                                                        <TableCell>{row.total_hours}</TableCell>
                                                        <TableCell>
                                                            <div>
                                                                <Button variant="outlined" onClick={()=>workItem(row)}>Edit</Button>
                                                            </div>
                                                        </TableCell>
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
        </>
    )
}

export default Dashboard
