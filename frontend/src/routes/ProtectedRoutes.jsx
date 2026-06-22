import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log("ProtectedRoutes: rendering, isAuthenticated =", isAuthenticated);

    return isAuthenticated
        ? (
            <>
                {/* {console.log("ProtectedRoutes: Rendering children")} */}
                {children}
            </>
          )
        : (
            <>
                {/* {console.log("ProtectedRoutes: Redirecting to /login")} */}
                <Navigate to="/login" replace />
            </>
          );
}

export default ProtectedRoutes;