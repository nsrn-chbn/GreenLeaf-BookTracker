import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
return (

<div>

<header className="header">

<div className="logo">GreenLeaf</div>

<div class="menu">

<Link to='/'> Home </Link>    
<Link to='/mybooks'> My books </Link>    
<Link to='/addbook'> New book </Link>    

</div>

</header>
    
</div>

)
}

export default Navbar;