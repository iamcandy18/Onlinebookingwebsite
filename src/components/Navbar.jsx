import { Link } from "react-router-dom"

export default function Navbar(){
    return(<>
<header className="header">
        <Link to={'/firstpage'} className="logo">
          <i class="fa fa-snowflake-o" aria-hidden="true"></i>
          <span className="title">EVES</span>
        </Link>
         
      
        <div className="right">
            <i class="fa fa-search" aria-hidden="true"></i>
          
         <Link to ={'/dashboard'}><i className="fa fa-user" aria-hidden="true"></i></Link>
          <Link to={'/login'}><button className="button2">
            Login here
             
            
          </button>
          </Link>
        </div>
      </header>
      </>)}