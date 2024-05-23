import { Link } from "react-router-dom"

export default function Navbar(){
    return(<>
<header className="header">
        <a href="" className="logo">
          <i class="fa fa-snowflake-o" aria-hidden="true"></i>
          <span className="title">EVES</span>
        </a>
         
      
        <div className="right">
        <button className="button">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
          <a href=""><i className="fa fa-user" aria-hidden="true"></i></a>
          <Link to={'/login'}><button className="button2">
            Login here
             
            
          </button>
          </Link>
        </div>
      </header>
      </>)}