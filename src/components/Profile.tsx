import { useStravaContext } from "../store/StravaContext";

const Profile: React.FC = () => {

    const { loggedInAthlete: profile } = useStravaContext();

    if (!profile) {
        return <div>Loading Profile...</div>
    }

    return (
        <>
          <h2>Profile:</h2>
         { Object.entries(profile).map(([key, value]) => ( 
            <div>
                <strong>{key}: </strong> { value }
            </div>
         ))}
        </>
    )
}

export default Profile;