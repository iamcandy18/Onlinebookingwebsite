import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./api/client";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = supabase.auth.getUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <header className="header">
        <Link to={"/"} className="logo">
          <i className="fa fa-snowflake-o" aria-hidden="true"></i>
          <span className="title">EveS</span>
        </Link>
        <div className="right">
          {user ? (
            <Link to={"/dashboard"}>
              <i className="fa fa-bars" aria-hidden="true"></i>
              <i className="fa fa-user" aria-hidden="true"></i>
            </Link>
          ) : (
            <Link to={"/login"}>
              <i className="fa fa-bars" aria-hidden="true"></i>
              <i className="fa fa-user" aria-hidden="true"></i>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

