import axios from "axios"
import { type AuthDataType } from "./StravaAuthButton"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react";
import { useStravaContext } from "../../store/StravaContext";


const StravaCallback: React.FC = () => {

    const stravaCtx = useStravaContext();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const authData: AuthDataType = {
        tokenUrl: 'https://www.strava.com/oauth/token',
        clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
        clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
    }

    useEffect(() => {
        if (code && !stravaCtx.token) {
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

            if(accessToken) {
                stravaCtx.setToken(accessToken);
                navigate('/')
            }
        } catch (error) {

            console.error('Error exchanging token', error);
        }
    }

    const back = () => {
        navigate('/');
    }

    return (
        <div>
            <h1>Strava Callback</h1>
            { code ? <p>Exchanging code {stravaCtx.token}</p> : <p>No authorization code provided. <a href="javascript:void(0)" onClick={back}>Go Back</a></p> }
        </div>
    )
}

export default StravaCallback;