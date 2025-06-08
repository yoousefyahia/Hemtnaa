import { FaChartLine, FaUser } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import './navber.css'


const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <>  
          <div className='iconSide'>
            <div className='iconSide-content'>
                 <div className={`img-center ${currentPath === '/' ? 'active' : ''}`}>
                    <Link className='incon' to='/'>
                        <FaUser className='inconH' />
                        <p>الرئيسية</p>
                    </Link>
                </div> 
                <div className={`img-center ${currentPath === '/chat' ? 'active' : ''}`}>
                    <Link className='incon' to="/chat">
                        <MdOutlineMessage className='inconH' />                   
                        <p>الدردشة</p>
                    </Link>
                </div>
                <div className={`img-center ${currentPath === '/rating' ? 'active' : ''}`}>
                    <Link className='incon' to="/Rating">
                        <FaChartLine className='inconH' />
                        <p>التقييم</p>
                    </Link>
                </div>
            </div>
               
            </div> 
        </>
    )
}

export default Sidebar;