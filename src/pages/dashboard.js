import BarChart from "../components/barchart";
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";


function Dashboard() {
    const chartData = {
        labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
        values: [12, 19, 3, 5, 2],
    };
    return (
        <div style={{display:'flex', justifyContent:'center', flexFlow:'column'}}>
            <h1>Welcome to POC Application</h1>
            <div style={{width:'35%'}}>
                <BarChart data={chartData} />
            </div>
            <div>
                <Button variant="outlined" component={RouterLink} to="/createUser">Create User</Button>
            </div>
        </div>
    )
}

export default Dashboard
