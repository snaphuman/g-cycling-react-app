import { Container } from "@mui/material"
import { ComponentPropsWithoutRef } from "react"

type FooterProps = {

} & ComponentPropsWithoutRef<'footer'>

const Footer: React.FC<FooterProps> = ({...props}) => {

    return (
        <footer {...props}>
            <Container maxWidth="xl">
                From g-cycling-col community with  {'<3'}
            </Container>
        </footer>
    )
}

export default Footer;