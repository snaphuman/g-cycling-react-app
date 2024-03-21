import { useStravaContext } from "../store/StravaContext";
import { Navigate } from "react-router-dom";

const RouteElementGuard: React.FC<{children: JSX.Element}> = ({children}) => {
    const { isLoggedIn } = useStravaContext();
    return (
        <>
            { isLoggedIn ? children : <Navigate to="/" replace />}
        </>
    )
}

export default RouteElementGuard;