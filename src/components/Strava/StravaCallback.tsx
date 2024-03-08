import axios from "axios"
import { type AuthDataType } from "./StravaAuthButton"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react";


const StravaCallback: React.FC = () => {

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const authData: AuthDataType = {
        tokenUrl: 'https://www.strava.com/oauth/token',
        clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
        clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
    }


    useEffect(() => {
        console.log('code', code)
        if (code) {
            exchangeToken(code, authData)
        }
    }, [code]);

    const exchangeToken = async (code: string, authData: AuthDataType) => {
        try {
            const tokenUrl = authData.tokenUrl as string
            const response = await axios.post(tokenUrl, {
                client_id: authData.clientId,
                client_secret: authData.clientSecret,
                code: code,
                grant_type: 'authorization_code',

            });

            const accessToken = response.data.access_token;
            console.log('access token', accessToken);

        } catch (error) {

            console.error('Error exchanging token', error);
        }
    }


    return (
        <div>
            <h1>Strava Callback</h1>
            { code ? <p>Exchanging code...</p> : <p>No authorization code provided</p> }
        </div>
    )
}

export default StravaCallback;
