import { Link } from "react-router-dom";
import { useStravaContext } from "../store/StravaContext";
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
                    <Link to="/leaders-board">Leaders Board</Link>
                    :
                    null
                }
            </ul>
        </nav>
    )

}

export default MainNavigation;