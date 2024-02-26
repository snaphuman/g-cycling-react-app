import axios from "axios";
import { useEffect, useState } from "react";

enum StravaApi {
    ApiUrl = 'https://www.strava.com/api/v3',
    BearerToken = '7b41a39951cddcdc4e4e38485bf1fe2560293bd0',
}

const Profile: React.FC = () => {

    const [profile, setProfile] = useState<any>();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${StravaApi.ApiUrl}/athlete`, {
                    headers: {
                        Authorization: `Bearer ${StravaApi.BearerToken}`,
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