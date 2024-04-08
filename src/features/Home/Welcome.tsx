import { Avatar, Typography, styled } from "@mui/material";
import { ComponentPropsWithoutRef } from "react"
import { useStravaContext } from "../../store/StravaContext";

type WelcomeProps = {

} & ComponentPropsWithoutRef<'section'>;

const Welcome: React.FC<WelcomeProps> = () => {

    const { loggedInAthlete: athlete } = useStravaContext();

    const HeadLine = styled('div')({
        marginTop: '-75px',
    });

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
            </HeadLine>
        </section>
    )
}

export default Welcome;