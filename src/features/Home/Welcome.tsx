import { ComponentPropsWithoutRef } from "react"

type WelcomeProps = {

} & ComponentPropsWithoutRef<'section'>;

const Welcome: React.FC<WelcomeProps> = () => {

    return (
        <>
            Welcome
        </>
    )
}

export default Welcome;