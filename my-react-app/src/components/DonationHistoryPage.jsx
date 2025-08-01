import React, { useState, useEffect, useContext, useCallback } from 'react';
import './DonationHistoryPage.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Link,} from 'react-router-dom';
import RecoveryCountdown from '../components/RecoveryCountdown';

function DonationItem({ item, expandedCardId, onToggle }) {
  const isExpanded = expandedCardId === item.IDRegister;
   

  return (
    <div className='donation-item'>
      <p><strong>Ngày hiến máu:</strong> {new Date(item.DonateBloodDate).toLocaleDateString('vi-VN')}</p>
      <p><strong>Nhóm máu:</strong> {item.BloodTypeName}</p>

      <button
        onClick={() => onToggle(item.IDRegister)}
        aria-expanded={isExpanded}
        aria-controls={`donation-details-${item.IDRegister}`}
        type="button"
      >
        {isExpanded ? 'Ẩn chi tiết' : 'Xem chi tiết'}
      </button>

      {isExpanded && (
        <div id={`donation-details-${item.IDRegister}`} className="donation-details">
          <hr />
          <p><strong>CMND/CCCD:</strong> {item.IdentificationNumber}</p>
          <p><strong>Ghi chú:</strong> {item.Note || 'Không có'}</p>
          <p><strong>Trạng thái:</strong> {item.Status}</p>
        </div>
      )}
    </div>
  );
}

export default function DonationHistoryPage() {
  const { user, logout } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [nextDonateDate, setNextDonateDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

 const handleLogout = () => {
    logout(); // gọi hàm logout trong context
  };


  useEffect(() => {
    if (!user?.IDUser) return;

    const fetchDonationHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/donation-history/${user.IDUser}`);
        const data = Array.isArray(res.data) ? res.data : [];
        setHistory(data);

        if (data.length > 0) {
          const sorted = [...data].sort((a, b) => new Date(b.DonateBloodDate) - new Date(a.DonateBloodDate));
          const latest = sorted[0];
          if (latest?.NextDonateDate) {
            setNextDonateDate(latest.NextDonateDate);
          }
        }
      } catch (error) {
        console.error('❌ Lỗi khi lấy lịch sử:', error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, [user?.IDUser]);

  const toggleExpandedCard = useCallback(
    (id) => {
      setExpandedCardId(prev => (prev === id ? null : id));
    },
    []
  );

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
                 <Link to='/bloodknowledge' className='dropbtn'>Blood</Link>
               </div>
               <Link to='/news'>News & Events</Link>
               <Link to='/contact'>Contact</Link>
               <Link to='/about'>About Us</Link>
             </nav>
             <div className='actions'>
               {!user ? (
                 <Link to='/login'><button className='login-btn'>👤 Login</button></Link>
               ) : (
                 <div className="dropdown user-menu" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                   <div className="dropbtn user-name">
                     Xin chào, {user?.FullName || user?.fullName || user?.name || "User"} <span className="ml-2">▼</span>
                   </div>
                   {isOpen && (
                     <div className="dropdown-content user-dropdown">
                            <Link to='/register/request-blood'>Register/Request</Link>
                                        <Link to='/my-activities'>List res/req</Link>
                                        <Link to='/history'>DonatationHistory</Link>
                                        <Link to="/profile">👤UserProfile</Link>
                                        {user?.role === 'Admin' && (
                            <Link to="/dashboard">🛠️Path to admin</Link>
                          )}
                                        <Link to="/notifications">🔔Notification</Link>
                       <button className="logout-btn" onClick={handleLogout}>🚪 Đăng xuất</button>
                     </div>
                   )}
                 </div>
               )}
             </div>
           </header>
      <main className='donation-history-page'>
        <h2>Lịch sử hiến máu của bạn</h2>

        {nextDonateDate && <RecoveryCountdown nextDate={nextDonateDate} />}

        {loading ? (
          <div className='loading'>Đang tải dữ liệu...</div>
        ) : history.length === 0 ? (
          <div className='no-data'>Chưa có lịch sử hiến máu.</div>
        ) : (
          <div className='donation-list'>
            {history.map(item => (
              <DonationItem
                key={item.IDRegister}
                item={item}
                expandedCardId={expandedCardId}
                onToggle={toggleExpandedCard}
              />
            ))}
          </div>
        )}
      </main>

          <div className='footer-container'>
            <div className='footer-block location'>
              <h3>📍 Location</h3>
              <p>Blood Donation Center, FPT University, Q9, TP.HCM</p>
            </div>
            <div className='footer-block hotline'>
              <h3>📞 Hotline</h3>
              <p>+84 123 456 789</p>
              <p>+84 123 456 987</p>
            </div>
            <div className='footer-block social-media'>
              <h3>🌐 Follow Us</h3>
              <ul>
                <li><a href='https://facebook.com' target='_blank' rel='noreferrer'>Facebook</a></li>
                <li><a href='https://instagram.com' target='_blank' rel='noreferrer'>Instagram</a></li>
                <li><a href='https://twitter.com' target='_blank' rel='noreferrer'>Twitter</a></li>
              </ul>
            </div>
          </div>
          <p className='footer-copy'>© 2025 HopeDonor. All rights reserved.</p>
      
    </>
  );
}