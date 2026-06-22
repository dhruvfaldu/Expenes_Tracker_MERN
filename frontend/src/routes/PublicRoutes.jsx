
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
function PublicRoutes({ children }) {
    const { isAuthenticated } = useSelector(state => state.auth);
    console.log("PublicRoutes: rendering, isAuthenticated =", isAuthenticated);

    return (
        <>
            {!isAuthenticated ? (
                <>
                    {/* {console.log("PublicRoutes: Rendering children")} */}
                    {children}
                </>
            ) : (
                <>
                    {/* {console.log("PublicRoutes: Redirecting to /dashboard")} */}
                    <Navigate to="/dashboard" replace />
                </>
            )}
        </>
    )
}

export default PublicRoutes;