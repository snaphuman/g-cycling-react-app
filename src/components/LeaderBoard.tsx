import axios from "axios";
import { useEffect, useState } from 'react';
import { StravaApi } from "../enums/StravaApi";

const StravaApiV3 = require('strava_api_v3');
const defaultClient = StravaApiV3.ApiClient.instance;

const LeaderBoard: React.FC = () => {

    const [leaders, setLeaders] = useState<any>([]);

    useEffect(() => {

        console.log('default', defaultClient);

        const fetchLeaders = async () => {
            try {
                const response = await axios.get(`${StravaApi.ApiUrl}/clubs/${StravaApi.ClubId}/activities`, {
                    headers: {
                        Authorization: `Bearer ${StravaApi.BearerToken}`,
                    }
                })

            } catch (error) {

            }
        }

        fetchLeaders()
    });


    return (
        <>
            <h2>
                Leader Board
            </h2>
        </>
    )
}

export default LeaderBoard;