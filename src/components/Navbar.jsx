import { Link } from "react-router-dom"

export default function Navbar(){
    return(<>
<header className="header">
        <Link to={'/'} className="logo">
          <i class="fa fa-snowflake-o" aria-hidden="true"></i>
          <span className="title">EVES</span>
        </Link>
        <div className="search">
        <button>ANYWHERE</button>
        <button>ANYWEEK</button>
        <button>ADD GUESTS<i class="fa fa-search search2" aria-hidden="true"></i></button>

        </div>
         
      
        <div className="right">
        <i class="fa fa-bars" aria-hidden="true"></i>
          
         <Link to ={'/login'}><i className="fa fa-user" aria-hidden="true"></i></Link>
          
        </div>
      </header>
      </>)}