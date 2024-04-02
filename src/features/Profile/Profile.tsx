import { useEffect } from "react";
import { useStravaContext } from "../../store/StravaContext";
import { useLayoutContext } from "../../store/LayoutContext";
import { Typography } from "@mui/material";

const Profile: React.FC = () => {

    const { setLayoutState } = useLayoutContext();
    const { loggedInAthlete: profile, isLoggedIn } = useStravaContext();

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
              {
                  isLoggedIn && `Kudos ${profile?.firstname} ${profile?.lastname}. `
              }
          </Typography>
         { Object.entries(profile).map(([key, value], index) => ( 
            <div key={index}>
                <strong>{key}: </strong> { value }
            </div>
         ))}
        </>
    )
}

export default Profile;