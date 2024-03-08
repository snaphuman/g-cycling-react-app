import axios from "axios";
import { useEffect, useState } from "react";
import { StravaApi } from "../enums/StravaApi";

const Profile: React.FC = () => {

    const [profile, setProfile] = useState<any>();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${StravaApi.API_URL}/athlete`, {
                    headers: {
                        Authorization: `Bearer ${StravaApi.BEARER_TOKEN}`,
                    }
                })
                setProfile(response.data);

            } catch (error) {
                console.error('error fetching profile', error)
            };
        }

        fetchProfile();

    }, []);

    if (!profile) {
        return <div>Loading Profile...</div>
    }

    return (
        <>
            <h2>Profile:</h2>
            <div>
                <strong>Name: </strong> {profile.firstname} {profile.lastname}
            </div>
            <div>
                <strong>Username: </strong> {profile.username}
            </div>
            <div>
                <strong>City: </strong> {profile.city}
            </div>
        </>
    )
}

export default Profile;