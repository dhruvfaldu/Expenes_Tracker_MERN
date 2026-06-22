import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/slice/authSlice";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";

function Login() {

    const [formdata, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const [touched, setTouched] = React.useState({
        email: false,
        password: false,
    });
    const [errors, setErrors] = React.useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formdata.email) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)
        ) {
            newErrors.email = "Invalid email format";
        }

        if (!formdata.password) {
            newErrors.password = "Password is required";
        } else if (formdata.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setTouched({
            email: true,
            password: true,
        });

        const isValid = validateForm();

        if (isValid) {
            console.log("Form submitted:", formdata);
            try {
                const result = await dispatch(loginThunk(formdata));
                if (loginThunk.fulfilled.match(result)) {
                    toast.success("Successfully logged in!");
                    navigate("/dashboard");
                } else {
                    toast.error(result.payload || "Invalid credentials");
                }
            } catch (err) {
                toast.error("An unexpected error occurred during login");
            }
        }
    };

    useEffect(() => {
        validateForm();
    }, [formdata]);

    return (
        // <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">

        //     <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">

        //         {/* Header */}
        //         <div className="mb-6 text-center">
        //             <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
        //             <p className="text-sm text-muted-foreground mt-1">
        //                 Login to continue to your dashboard
        //             </p>
        //         </div>

        //         {/* Form */}
        //         <form className="space-y-5" onSubmit={handleSubmit}>

        //             {/* Email */}
        //             <div className="space-y-2">
        //                 <label htmlFor="email" className="text-sm font-medium text-foreground">
        //                     Email
        //                 </label>
        //                 <input
        //                     type="email"
        //                     id="email"
        //                     name="email"
        //                     placeholder="you@example.com"
        //                     className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        //                     value={formdata.email}
        //                     onChange={handleInputChange}
        //                     onBlur={handleBlur}
        //                 />
        //                 {errors.email && touched.email && (
        //                     <p className="text-sm text-destructive mt-1">{errors.email}</p>
        //                 )}
        //             </div>

        //             {/* Password */}
        //             <div className="space-y-2">
        //                 <label htmlFor="password" className="text-sm font-medium text-foreground">
        //                     Password
        //                 </label>
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     name="password"
        //                     placeholder="••••••••"
        //                     className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        //                     value={formdata.password}
        //                     onChange={handleInputChange}
        //                     onBlur={handleBlur}
        //                 />
        //                 {errors.password && touched.password && (
        //                     <p className="text-sm text-destructive mt-1">{errors.password}</p>
        //                 )}
        //             </div>

        //             {/* Forgot Password */}
        //             <div className="flex justify-end">
        //                 <NavLink
        //                     to="/forgot-password"
        //                     className="text-sm text-primary hover:underline"
        //                 >
        //                     Forgot password?
        //                 </NavLink>
        //             </div>

        //             {/* Button */}
        //             <button
        //                 type="submit"
        //                 className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition"

        //             >
        //                 Login
        //             </button>
        //         </form>

        //         {/* Footer */}
        //         <p className="text-center text-sm text-muted-foreground mt-6">
        //             Don’t have an account?{" "}
        //             <NavLink to="/register" className="text-primary hover:underline">
        //                 Sign up
        //             </NavLink>
        //         </p>

        //     </div>
        // </div>
        <>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-md animate-in fade-in duration-300">
                <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                    {/* Visual Glow Layer */}
                    <div className="absolute top-0 left-1/4 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Brand Header */}
                    <div className="flex items-center gap-3.5 mb-8 relative z-10">
                        {/* <img src={logo} alt="logo" className="w-12 h-12 object-contain" /> */}
                        <div className="leading-tight">
                            <h1 className="text-xl font-bold tracking-tight text-foreground">Welcome Back</h1>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Sign in to access your scraping workspace
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    <Mail size={16} />
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={formdata.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {errors.email && touched.email && (
                                <p className="text-sm text-destructive mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    <Lock size={16} />
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={formdata.password}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {errors.password && touched.password && (
                                <p className="text-sm text-destructive mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <NavLink
                                to="/forgot-password"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </NavLink>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition"

                        >
                            Login
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don’t have an account?{" "}
                        <NavLink to="/register" className="text-primary hover:underline">
                            Sign up
                        </NavLink>
                    </p>

                </div>
            </div>
        </>
    );
}

export default Login;


