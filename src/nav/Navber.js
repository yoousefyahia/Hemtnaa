import { Link } from 'react-router-dom';
import imgLoge from '../nav/9937d96f0cafac59d05f98addbb453597c1f555e (2).png';
import './navber.css';
import Profile from './Profile';

function Navbar() {

    return (
        <nav className="navbar">
             <div className="imgLoge">
                    <Link to="#">
                        <img src={imgLoge} alt="Logo" />
                    </Link>
                </div>
                <Profile/>

        </nav>
    );
}

export default Navbar;