import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { registerThunk } from "@/store/slice/authSlice";
import { Mail, Sparkles, User, Lock } from "lucide-react";
import { toast } from "sonner";
function SignUp() {

  const [formdata, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = React.useState({
    name: false,
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
    if (!formdata.name) {
      newErrors.name = "Name is required";
    }
    if (!formdata.email) {
      newErrors.email = "Email is required";
    }
    if (!formdata.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
    })
    if (validateForm()) {
      console.log("Form submitted:", formdata);
      try {
        const result = await dispatch(registerThunk(formdata));
        if (registerThunk.fulfilled.match(result)) {
          toast.success("Successfully registered!");
          navigate("/dashboard");
        } else {
          toast.error(result.payload || "Registration failed");
        }
      } catch (err) {
        toast.error("An unexpected error occurred during registration");
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [formdata]);

  return (
    // <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
    //   <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">

    //     {/* Header */}
    //     <div className="mb-6 text-center">
    //       <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
    //       <p className="text-sm text-muted-foreground mt-1">
    //         Register to continue to your dashboard
    //       </p>
    //     </div>

    //     {/* Form */}
    //     <form className="space-y-5" onSubmit={handleSubmit}>

    //       {/* Name */}
    //       <div className="space-y-2">
    //         <label htmlFor="email" className="text-sm font-medium text-foreground">
    //           Name
    //         </label>
    //         <input
    //           type="text"
    //           name="name"
    //           placeholder="Enter your name"
    //           className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    //           value={formdata.name}
    //           onChange={handleInputChange}
    //           onBlur={handleBlur}
    //         />
    //         {touched.name && errors.name && <span className="text-red-500">{errors.name}</span>}
    //       </div>

    //       {/* Email */}
    //       <div className="space-y-2">
    //         <label htmlFor="email" className="text-sm font-medium text-foreground">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           name="email"
    //           placeholder="you@example.com"
    //           className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    //           value={formdata.email}
    //           onChange={handleInputChange}
    //           onBlur={handleBlur}
    //         />
    //         {touched.email && errors.email && <span className="text-red-500">{errors.email}</span>}
    //       </div>

    //       {/* Password */}
    //       <div className="space-y-2">
    //         <label htmlFor="password" className="text-sm font-medium text-foreground">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           placeholder="••••••••"
    //           className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    //           value={formdata.password}
    //           onChange={handleInputChange}
    //           onBlur={handleBlur}
    //         />
    //         {touched.password && errors.password && <span className="text-red-500">{errors.password}</span>}
    //       </div>

    //       {/* Forgot Password */}
    //       <div className="flex justify-end">
    //         <NavLink
    //           to="/forgot-password"
    //           className="text-sm text-primary hover:underline"
    //         >
    //           Forgot password?
    //         </NavLink>
    //       </div>

    //       {/* Button */}
    //       <button
    //         type="submit"
    //         className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition"
    //       >
    //         Register
    //       </button>
    //     </form>

    //     {/* Footer */}
    //     <p className="text-center text-sm text-muted-foreground mt-6">
    //       Don’t have an account?{" "}
    //       <NavLink to="/login" className="text-primary hover:underline">
    //         Login instead
    //       </NavLink>
    //     </p>

    //   </div>
    // </div>
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-md animate-in fade-in duration-300">
        <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">

          {/* Visual Glow Layer */}
          <div className="absolute top-0 right-1/4 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Logo */}
          <div className="flex items-center gap-3.5 mb-6 relative z-10">
            {/* <img src={logo} alt="logo" className="w-12 h-12 object-contain" /> */}
            <div className="leading-tight">
              <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
                Create Account
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Setup dynamic scraping jobs in minutes
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={15} />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full pl-11 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formdata.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>

              {touched.name && errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail size={15} />
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

              {touched.email && errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock size={15} />
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

              {touched.password && errors.password && <span className="text-red-500">{errors.password}</span>}
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
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don’t have an account?{" "}
            <NavLink to="/login" className="text-primary hover:underline">
              Login instead
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;