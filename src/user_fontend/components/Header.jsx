import logo from '../assets/Skyemec.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(null);

    const handleMouseEnter = (menu) => {
        setIsOpen(menu);
    };
    const handleMouseLeave = () => {
        setIsOpen(null);
    };
    return (
        <nav className="Header-navbar">
            <img className="Header-logo" src={logo} alt="logo" />
            <ul className="Header-navbar-list">
                <li className="Header-nav-item" 
                onMouseEnter={() => handleMouseEnter("Chuyên khoa")}
                onMouseLeave={handleMouseLeave}
                >
                    <span>Chuyên khoa</span>
                    <FontAwesomeIcon icon={faAngleDown}/>
                    {isOpen === "Chuyên khoa" && (
                        <div className="dropdown-container">
                            <div className="triangle"></div>
                            <ul className="Header-dropdown-list">
                                <li className="Header-dropdown-item">Nội khoa</li>
                                <li className="Header-dropdown-item">Ngoại khoa</li>
                                <li className="Header-dropdown-item">Nhi khoa</li>
                                <li className="Header-dropdown-item">Sản phụ khoa</li>
                                <li className="Header-dropdown-item">Da liễu</li>
                                <li className="Header-dropdown-item">Mắt</li>
                                <li className="Header-dropdown-item">Tai mũi họng</li>
                                <li className="Header-dropdown-item">Răng hàm mặt</li>
                                <li className="Header-dropdown-item">Tâm lý</li>
                                <li className="Header-dropdown-item">Thần kinh</li>
                                <li className="Header-dropdown-item">Tiêu hóa</li>
                                <li className="Header-dropdown-item">Tim mạch</li>
                            </ul>
                        </div>
                    )}
                </li>
                <li className="Header-nav-item">
                    <span>Đặt lịch</span>
                </li>
                <li className="Header-nav-item">
                    <span>Tìm bác sĩ</span>
                </li>
                <li className="Header-nav-item" 
                onMouseEnter={() => handleMouseEnter("Liên hệ")}
                onMouseLeave={handleMouseLeave}
                > 
                    <span>Liên hệ</span>
                    <FontAwesomeIcon icon={faAngleDown}/>
                    {isOpen === "Liên hệ" && (
                        <div className="dropdown-container">
                        <div className="triangle"></div>
                            <ul className="Header-dropdown-list" id='Header-dropmenu-contact'>
                                <li className="Header-dropdown-item">Đặt lịch khám</li>
                                <li className="Header-dropdown-item">Tư vấn sức khỏe</li>
                                <li className="Header-dropdown-item">Hỗ trợ kỹ thuật</li>
                            </ul>
                    </div>
                    )}
                </li>
                <li className="Header-nav-item" id='Header-nav-item-about'
                onMouseEnter={() => handleMouseEnter("Về Skyemec")}
                onMouseLeave={handleMouseLeave}
                >
                    <span>Về Skyemec</span>
                    <FontAwesomeIcon icon={faAngleDown}/>
                    {isOpen === "Về Skyemec" && (
                        <div className="dropdown-container">
                        <div className="triangle"></div>
                            <ul className="Header-dropdown-list" id='Header-dropmenu-about'>
                                <li className="Header-dropdown-item">Giới thiệu</li>
                                <li className="Header-dropdown-item">Tin tức</li>
                                <li className="Header-dropdown-item">Sự kiện</li>
                                <li className="Header-dropdown-item">Tuyển dụng</li>
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
            <div className='Header-navbar-right'>
                
                <div className="Header-login">
                    <FontAwesomeIcon icon={faUser}/>
                    <span className='login'>Đăng nhập</span>
                </div>
                <div className="Header-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
            </div>
        </nav>
    )
}
export default Header; 
