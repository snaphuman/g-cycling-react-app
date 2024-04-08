import { Container, Paper, styled } from "@mui/material";
import { ComponentPropsWithoutRef } from "react"

type FeaturedMediaProps = {

} & ComponentPropsWithoutRef<'section'>

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({...props}) => {

    const FullWidthPaper = styled(Paper)({})

    const FluidImage = styled('img')({
        width: '100%',
        height: '300px',
    })

    return (
        <FullWidthPaper {...props} elevation={2}>
            <FluidImage src="https://source.unsplash.com/random/1920x300"
                        alt="Dummy banner" />
        </FullWidthPaper>
    )
}

export default FeaturedMedia;