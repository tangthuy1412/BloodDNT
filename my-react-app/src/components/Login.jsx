import { Link, useNavigate } from "react-router-dom";
import './Login-register.css';
import React, { useState, useContext } from "react";
import { UserContext } from '../context/UserContext.jsx';
import Swal from 'sweetalert2';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   const { login, user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': 'Bearer ' + token } : {})
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) { 
      const receivedToken = data.token;
      localStorage.setItem('token', receivedToken);

      // ✅ Giải mã token để lấy thêm thông tin như Role
      const payload = JSON.parse(atob(receivedToken.split('.')[1]));

      // ✅ Gộp lại user gốc từ backend với role từ token
      const userWithRole = {
        ...data.user,
        Role: payload.Role
      };

      console.log('user trả về:', userWithRole);

      login(userWithRole, receivedToken);

     Swal.fire('Đăng nhập thành công! Chào ' + (userWithRole.fullName ));
      navigate('/');
    } else {
     Swal.fire('Lỗi: ' + data.message);
    }
  } catch (error) {
   Swal.fire('Lỗi server: ' + error.message);
  }
};

 const handleLogout = () => {
    logout();
  };
  return (
     <>
      <header className='header'>
        <div className='logo'>
          <Link to="/">
            <img src='/LogoPage.jpg' alt='Logo' />
          </Link>
          <div className='webname'>Hope Donnor🩸</div>
        </div>
        <nav className='menu'>
          <Link to='/bloodguide'>Blood Guide</Link>
          <div className='dropdown'>
            <Link to='/bloodknowledge' className='dropbtn'>Blood ▼</Link>
          </div>
          <Link to='/news'>News & Events</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/about'>About Us</Link>
        </nav>
        <div className='actions'>
          {!user ? (
            <Link to='/login'>
              <button className='login-btn'>👤 Login</button>
            </Link>
          ) : (
            <div 
              className="dropdown user-menu"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="dropbtn user-name">
                Xin chào, { user?.fullName || "User"} <span className="ml-2">▼</span>
              </div>
              {isOpen && (
                <div className="dropdown-content user-dropdown">
                  <Link to="/profile">👤 Thông tin cá nhân</Link>
                  <Link to="/notifi cations">🔔 Thông báo</Link>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    <section className="login-section">
      <div className="login-box">
        <div className='logo-login'>
          <Link to="/">
            <div className='webname-login'>Hope Donnor🩸</div>
          </Link>
        </div>
        <h2 className="login-title">🔐 Đăng nhập</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="Nhập Địa Chỉ Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="login-label">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-extra">  
            <label className="remember-me">
              <input type="checkbox" /> Nhớ mật khẩu
            </label>
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>
        
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>

        <div className="register-link">
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </section>
    </>
  );
}