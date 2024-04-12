import { useEffect } from "react";
import { useStravaContext } from "../../store/StravaContext";
import { useLayoutContext } from "../../store/LayoutContext";
import { Typography } from "@mui/material";

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
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          {  Object.entries(profile)
                   .filter(([key, _value]) => key !== 'clubs')
                   .map(([key, value], index) => 
                        <div key={index}>
                            {key}: {value}
                        </div>
          )}
        </>
    )
}

export default Profile;