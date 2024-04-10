import { useEffect } from "react";
import { useStravaContext } from "../store/StravaContext"
import axios, { AxiosResponse } from "axios";
import { Athlete, AthleteActivity, ClubActivity } from "../models/StravaModels";
import { StravaApi } from "../enums/StravaApi";


const useFetchData = () => {

    const { isLoggedIn, loggedInAthlete, token, setAthlete, setActivityStats, setAthleteActivities, setClubActivities } = useStravaContext();


    useEffect(() => {

        if (isLoggedIn) {
            fetchData();
        }
        

    }, [token]);

    const fetchData = async () => {
        const data = await axios.all<AxiosResponse<any>>([
                       getLoggedIntAthlete(),
                       getClubActivitiesById(),
                       getLoggedInAthleteActivities(),
                       getStats(),
                     ]);

        console.log('data', data);
        setAthlete(data[0]?.data);
        setClubActivities(data[1]?.data);
        setAthleteActivities(data[2]?.data);
        setActivityStats(data[3]?.data);
                         
    }

    const getLoggedIntAthlete = async () => {
        return axios.get<Athlete>(`${StravaApi.API_URL}/athlete`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const getLoggedInAthleteActivities = async () => {
        return axios.get<AthleteActivity[]>(`${StravaApi.API_URL}/athlete/activities`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const getClubActivitiesById = async () => {
        return axios.get<ClubActivity[]>(`${StravaApi.API_URL}/clubs/${StravaApi.CLUB_ID}/activities`, {
            headers: {
                Authorization: `Bearer ${ token }`,
            }
        });
    }

    const getStats = async () => {
        return await axios.get<any>(`${StravaApi.API_URL}/athletes/${loggedInAthlete?.id}/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });  
    }
}

export default useFetchData;