import { ComponentPropsWithoutRef } from "react"

type FeaturedMediaProps = {

} & ComponentPropsWithoutRef<'section'>

const FeaturedMedia: React.FC<FeaturedMediaProps> = ({...props}) => {

    return (
        <section {...props} >
            Featured Media
        </section>
    )
}

export default FeaturedMedia;