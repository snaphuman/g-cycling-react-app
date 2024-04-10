import { Avatar, Typography, styled } from "@mui/material";
import { ComponentPropsWithoutRef, useEffect } from "react"
import { useStravaContext } from "../../store/StravaContext";
import { Stats } from "../Athlete/Index";
import { LayoutState, useLayoutContext } from "../../store/LayoutContext";
import { ActivityStats } from "../../models/StravaModels";

type WelcomeProps = {

} & ComponentPropsWithoutRef<'section'>;

const Welcome: React.FC<WelcomeProps> = () => {

    const { loggedInAthlete: athlete } = useStravaContext();
    const { setLayoutState } = useLayoutContext();

    const getStatsTypesByActivity = (activity: 'ride' | 'run' | 'swim'): string[] => {

        return [
                `all_${activity}_totals`,
                `recent_${activity}_totals`,
                `ytd_${activity}_totals`,
               ]

    }

    const HeadLine = styled('div')({
        marginTop: '-75px',
    });

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
                <Stats types={getStatsTypesByActivity('ride')} />

            </HeadLine>
        </section>
    )
}

export default Welcome;