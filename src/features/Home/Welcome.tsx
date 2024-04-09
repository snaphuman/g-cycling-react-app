import { Avatar, Typography, styled } from "@mui/material";
import { ComponentPropsWithoutRef, useEffect } from "react"
import { useStravaContext } from "../../store/StravaContext";
import { Stats } from "../Athlete/Index";
import { LayoutState, useLayoutContext } from "../../store/LayoutContext";

type WelcomeProps = {

} & ComponentPropsWithoutRef<'section'>;

const Welcome: React.FC<WelcomeProps> = () => {

    const { loggedInAthlete: athlete } = useStravaContext();
    const { setLayoutState } = useLayoutContext();

    const HeadLine = styled('div')({
        marginTop: '-75px',
    });

    const statsTypes = [
        "distance",
        "achievement_count",
        "count",
        "elapsed_time",
        "elevation_gain",
        "moving_time"
    ]

    useEffect(() => {
        const config: LayoutState = { showSidebar: false, isFrontPage: true }
        setLayoutState(config);
    }, [])

    return (
        <section>
            <HeadLine>
                <Avatar 
                    alt={`${athlete?.firstname} ${athlete?.lastname}`}
                    src={ athlete?.profile }
                    sx={{ width: 100, height: 100}}
                />
                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                    {
                        `Kudos ${athlete?.firstname} ${athlete?.lastname}.`
                    }
                </Typography>
                <Stats types={statsTypes} source="recentRideTotals" />

            </HeadLine>
        </section>
    )
}

export default Welcome;