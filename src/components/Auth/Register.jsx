import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../api/client";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("no");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const ADMIN_KEY = "23rurgy2gyygwdgyfvu";

  useEffect(() => {
    async function getUserData() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (data?.user) {
          setUser(data.user);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }

    if (!user) {
      getUserData();
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, username, name } = data;
    setIsSubmitting(true);
    try {
      if (mode === "yes") {
        const enteredKey = prompt("Enter the admin key");
        if (enteredKey !== ADMIN_KEY) {
          alert("Wrong admin key");
          setIsSubmitting(false);
          return;
        }
      }

      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      alert(
        "Signup successful, please check your email for verification link!"
      );
      await saveUserInfo({ email, username, name, mode });
      navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      alert(`Signup failed: ${error.message}`);
    }
  };

  const saveUserInfo = async (user) => {
    const { email, username, name, mode } = user;
    const { data, error } = await supabase
      .from("newusers")
      .insert([{ username, email, name, Admin: mode }]);

    if (error) {
      console.error("Error saving user info:", error.message);
    } else {
      console.log("User info saved successfully:", data);
    }
  };

  return (
    <div>
      <div className="loginbox">
        <div className="wr1">
          <div className="loginbox2">
            SIGN UP NOW
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  className="log"
                  placeholder="Enter Your Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="err">{errors.username.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className="log"
                  placeholder="Enter Your Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="err">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  type="email"
                  className="log"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /@/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && <p className="err">{errors.email.message}</p>}
              </div>
              <div>
                <input
                  type="password"
                  className="log"
                  placeholder="Enter Your Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="err">{errors.password.message}</p>
                )}
              </div>

              <div className="label">
                <input
                  type="radio"
                  name="mode"
                  id="User"
                  checked={mode === "no"}
                  onChange={() => setMode("no")}
                  required
                />
                <label htmlFor="User">User</label>
                <input
                  type="radio"
                  name="mode"
                  id="Admin"
                  checked={mode === "yes"}
                  onChange={() => setMode("yes")}
                  required
                />
                <label htmlFor="Admin">Admin</label>
              </div>

              <button type="submit" className="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <h6>
              Already have an account?
              <br />
              <Link to="/login" className="log1">
                Login Here
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
