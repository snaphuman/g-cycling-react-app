import axios from "axios";
import { useEffect, useState } from 'react';
import { StravaApi } from "../enums/StravaApi";
import { useStravaContext } from "../store/StravaContext";


const LeaderBoard: React.FC = () => {

    const { token } = useStravaContext();
    const [leaders, setLeaders] = useState<any>([]);

    useEffect(() => {


        const fetchActivities = async () => {
            try {
                const response = await axios.get(`${StravaApi.API_URL}/clubs/${StravaApi.CLUB_ID}/activities`, {
                    headers: {
                        Authorization: `Bearer ${ token }`,
                    }
                })

            } catch (error) {

            }
        }

        fetchActivities()
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