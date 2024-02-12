import { Button } from '@mui/material';
import { useIsAuthenticated, useMsal,useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';
import { useEffect, useState } from 'react';

function Header() {
    const [username, setUsername] = useState("");
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const { result } = useMsalAuthentication(InteractionType.Popup,{scopes: ['user.read']});
    console.log({ result });
    useEffect(() => {
        if(result){
            setUsername(result["account"]["username"]);
            localStorage.setItem('accessToken', result.accessToken);
        }
    }, [result]);
    const handleSignIn = () => {
        instance.loginRedirect({
            scopes: ['user.read']
        });
    }
    const handleSignOut = () => {
        instance.logoutRedirect();
    }
    return (
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
    )
}

export default Header;