import { useEffect } from "react";
import { useStravaContext } from "../../store/StravaContext";
import { useLayoutContext } from "../../store/LayoutContext";

const Profile: React.FC = () => {

    const { setLayoutState } = useLayoutContext();
    const { loggedInAthlete: profile } = useStravaContext();

    useEffect(() => {
        setLayoutState({
            isFrontPage: true,
            showSidebar: false,
        });
    }, []);

    if (!profile) {
        return <div>Loading Profile...</div>
    }

    return (
        <>
          <h2>Profile:</h2>
         { Object.entries(profile).map(([key, value], index) => ( 
            <div key={index}>
                <strong>{key}: </strong> { value }
            </div>
         ))}
        </>
    )
}

export default Profile;