import { Container } from "@mui/material";
import { ComponentPropsWithoutRef } from "react"

type FeaturedMediaProps = {

} & ComponentPropsWithoutRef<'section'>

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({...props}) => {

    return (
        <section {...props} >
            <Container maxWidth="xl">
                Featured Media
            </Container>
        </section>
    )
}

export default FeaturedMedia;