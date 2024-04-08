import axios from "axios";
import { StravaApi } from "../../enums/StravaApi";
import { useStravaContext } from "../../store/StravaContext";
import { Button } from "@mui/material";
import { LayoutState, useLayoutContext } from "../../store/LayoutContext";

export type AuthDataType = {
    authUrl?: string,
    tokenUrl?: string,
    clientId?: string,
    clientSecret?: string,
    redirectUri?: string,
    responseType?: 'code',
    scope?: 'read,read_all,profile:read_all,activity:read,activity:read_all,activity:write',
}

const StravaAuthButton: React.FC = () => {

    const { setLayoutState } = useLayoutContext()
    const { token, removeToken, isLoggedIn } = useStravaContext();

    const authData: AuthDataType = {
        authUrl: StravaApi.AUTH_URL,
        clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
        redirectUri: encodeURIComponent(process.env.REACT_APP_STRAVA_REDIRECT_URI || ''),
        responseType: 'code',
        scope: 'read,read_all,profile:read_all,activity:read,activity:read_all,activity:write',
    }

    const authLink = `${authData.authUrl}?client_id=${authData.clientId}&redirect_uri=${authData.redirectUri}&response_type=${authData.responseType}&scope=${authData.scope}&approval_prompt=auto&state=test`;

    const disconnect = async () => {

        const endpoint = `${StravaApi.API_URL}/oauth/deauthorize`;
        const response = await axios.post(endpoint, {
            access_token: token,
        });  

        const config: Partial<LayoutState> = {
            showSidebar: false
        }

        setLayoutState(config)
        removeToken();

        console.info('disconnected ok:', response)
    }

    const connect = () => {
        window.location.href = authLink;
    }

    return isLoggedIn ? <Button color="inherit" onClick={disconnect}>Disconnect</Button> 
                      : <Button color="inherit" onClick={connect}>Connect with Strava</Button>
} 

export default StravaAuthButton;