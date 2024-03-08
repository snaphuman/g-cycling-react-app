import axios from "axios";
import { useEffect, useState } from 'react';
import { StravaApi } from "../enums/StravaApi";


const LeaderBoard: React.FC = () => {

    const [leaders, setLeaders] = useState<any>([]);

    useEffect(() => {


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