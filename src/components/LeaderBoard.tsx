import axios from "axios";
import { useEffect, useState } from 'react';
import { StravaApi } from "../enums/StravaApi";


const LeaderBoard: React.FC = () => {

    const [leaders, setLeaders] = useState<any>([]);

    useEffect(() => {


        const fetchLeaders = async () => {
            try {
                const response = await axios.get(`${StravaApi.API_URL}/clubs/${StravaApi.CLUB_ID}/activities`, {
                    headers: {
                        Authorization: `Bearer ${StravaApi.BEARER_TOKEN}`,
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