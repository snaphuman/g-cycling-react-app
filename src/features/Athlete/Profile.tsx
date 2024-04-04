import { useEffect } from "react";
import axios from "axios";
import { useStravaContext } from "../../store/StravaContext";
import { useLayoutContext } from "../../store/LayoutContext";
import { Typography } from "@mui/material";
import { StravaApi } from "../../enums/StravaApi";
import { Athlete } from "../../models/StravaModels";

const Profile: React.FC = () => {

    const { setLayoutState } = useLayoutContext();
    const { token, isLoggedIn, loggedInAthlete: profile, setAthlete, isGlober } = useStravaContext();

    useEffect(() => {
        setLayoutState({
            isFrontPage: true,
            showSidebar: false,
        });

        if (isLoggedIn) {
            getLoggedIntAthlete();
        }
    }, []);

    const getLoggedIntAthlete = async () => {
        const response = await axios.get<Athlete>(`${StravaApi.API_URL}/athlete`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setAthlete(response.data);
    }

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
        </>
    )
}

export default Profile;