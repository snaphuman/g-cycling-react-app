import { Link } from "react-router-dom";
import { useStravaContext } from "../../store/StravaContext";
import { ComponentPropsWithoutRef } from "react";

type MainNavigationProps = {

} & ComponentPropsWithoutRef<'nav'>

const MainNavigation: React.FC<MainNavigationProps> = ({...props}: MainNavigationProps) => {

    const { isLoggedIn } = useStravaContext();

    return (
        <nav {...props}>
            <ul>
                <Link to="/">Home</Link>
                { isLoggedIn 
                    ? 
                    <Link to="/club-activities">Club Activities</Link>
                    :
                    null
                }
            </ul>
        </nav>
    )

}

export default MainNavigation;