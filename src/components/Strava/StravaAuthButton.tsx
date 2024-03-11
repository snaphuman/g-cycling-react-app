import axios from "axios";
import { StravaApi } from "../../enums/StravaApi";
import { useStravaContext } from "../../store/StravaContext";

export type AuthDataType = {
    authUrl?: string,
    tokenUrl?: string,
    clientId?: string,
    clientSecret?: string,
    redirectUri?: string,
    responseType?: 'code',
    scope?: 'read,read_all',
}

const StravaAuthButton: React.FC = () => {

    const stravaCtx = useStravaContext();

    const authData: AuthDataType = {
        authUrl: StravaApi.AUTH_URL,
        clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
        redirectUri: encodeURIComponent(process.env.REACT_APP_STRAVA_REDIRECT_URI || ''),
        responseType: 'code',
        scope: 'read,read_all',
    }
    console.log('auth data', authData)

    const authLink = `${authData.authUrl}?client_id=${authData.clientId}&redirect_uri=${authData.redirectUri}&response_type=${authData.responseType}&scope=${authData.scope}&approval_prompt=auto`;

    const disconnect = async () => {

        const endpoint = `${StravaApi.API_URL}/oauth/deauthorize`;
        const response = await axios.post(endpoint, {
            access_token: stravaCtx.token,
        });  

        console.info('ok:', response)
        stravaCtx.removeToken();
    }

    return (
        <>
        { stravaCtx.isLoggedIn ? 
            <button onClick={disconnect}>
                Disconnect
            </button> : 
            <a href={authLink}>
                Connect with Strava
            </a>
        }
        </>
    );
} 

export default StravaAuthButton;