import React from 'react'
import { Eye,  EyeOff, MessageSquare, Loader2, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/userAuthStore';
import toast from "react-hot-toast";

const LoginPage = () => {

  const { login } = useAuthStore();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success) login(formData);

  }

  const validateForm = () => {

      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) === false) {
        return toast.error("invalid email");
      };

    if (formData.password.length < 6) {
      return toast.error("password required");
    };

    return true;

  }

  return (
    <>
     <div className="min-h-screen grid lg: grid-cols-2 ">
        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8">
            <form onSubmit={handleSubmit} className='space-y-6'>

              <div className="text-center mb-8">
                    <div className="flex flex-col items-center gap-2 group">
                      <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageSquare className="size-6 text-primary " />
                      </div>
                      <h1 className="text-2xl font-bold mt-2">Login</h1>
                      <p className="text-base-content/60 text-sm ">
                        Get started with your free account
                      </p>
                    </div>
              </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type="email"
                        className={`input input-bordered w-full pl-10`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* for password */}
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`input input-bordered w-full pl-10`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5 text-base-content/40" />
                        ) : (
                          <Eye className="size-5 text-base-content/40" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
            </form>

            <div className="text-center">
                    <p className="text-base-content/60">Don't have an account? </p>
                    <Link to="/signup" className="link link-primary">
                      create account
                    </Link>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default LoginPage;