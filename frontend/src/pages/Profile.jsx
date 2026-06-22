import { NavLink } from "react-router-dom";

function Profile() {
    return (
        <>  
            <div className="p-4">
                <NavLink to="/profile">
                    <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                </NavLink>
                {/* Add your profile content here */}
            </div>
        </>
    )
}

export default Profile;