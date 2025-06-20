import React from 'react';
import { Link } from 'react-router-dom';
import './BloodGuide.css';

const guideItems = [
  {
    id: 1,
    title: "Ai có thể hiến máu?",
    icon: "/bloodguide1.jpg",
    content: [
      "Công dân từ 18 đến 60 tuổi",
      "Cân nặng ≥ 45kg (nữ), ≥ 50kg (nam)",
      "Không mắc bệnh truyền nhiễm (HIV, viêm gan B/C, giang mai...)",
      "Không đang dùng thuốc kháng sinh, không có bệnh mạn tính nặng",
      "Thời gian giữa hai lần hiến máu toàn phần tối thiểu 12 tuần"
    ],
  },
  {
    id: 2,
    title: "Các loại hình hiến máu",
    icon: "/bloodguide2.jpg",
    content: [
      "Hiến máu toàn phần: phổ biến, đơn giản, mỗi lần từ 250–450ml",
      "Hiến tiểu cầu: yêu cầu máy tách, thường tại bệnh viện lớn",
      "Hiến huyết tương: hiếm gặp, yêu cầu riêng biệt",
    ],
  },
  {
    id: 3,
    title: "Trước khi hiến máu",
    icon: "/bloodguide3.jpg",
    content: [
      "Ăn nhẹ trước khi hiến 1–2 giờ (không ăn đồ dầu mỡ, không nhịn đói)",
      "Uống đủ nước",
      "Không uống rượu/bia, không thức khuya",
      "Không vận động mạnh, không đang điều trị bệnh",
    ],
  },
  {
    id: 4,
    title: "Sau khi hiến máu",
    icon: "/bloodguide4.jpg",
    content: [
      "Nghỉ tại chỗ 10–15 phút, theo dõi sức khỏe",
      "Uống nước/sữa, ăn nhẹ theo hướng dẫn",
      "Tránh vận động mạnh trong 1 ngày",
      "Không leo cao, không điều khiển máy móc phức tạp trong vài giờ đầu",
      "Có thể trở lại sinh hoạt bình thường sau 24h",
    ],
  },
  {
    id: 5,
    title: "Lợi ích khi hiến máu",
    icon: "/bloodguide5.jpg",
    content: [
      "Cứu sống người khác trong tình huống nguy cấp",
      "Kích thích tủy xương tạo máu mới, kiểm tra sức khỏe miễn phí",
      "Nhận giấy chứng nhận và quà tặng từ chương trình",
      "Tăng cảm giác tích cực, kết nối cộng đồng",
    ],
  },
  {
    id: 6,
    title: "Các câu hỏi thường gặp",
    icon: "/bloodguide6.jpg",
    content: [
      "Hiến máu có đau không? → Chỉ như kim tiêm thông thường, không gây đau lâu.",
      "Sau bao lâu có thể hiến lại? → Khoảng 3 tháng với hiến máu toàn phần.",
      "Có bị lây bệnh khi hiến máu không? → KHÔNG! Tất cả dụng cụ đều vô trùng & dùng 1 lần.",
    ],
  },
];

export default function BloodGuide() {
  return (
    <>
      <header className='header'>
        {/* Logo */}
        <div className='logo'>
          <Link to="/">
            <img src='/LogoPage.jpg' alt='Logo' />
          </Link>
          <div className='webname'>Hope Donor 🩸</div>
        </div>
        {/* Menu */}
        <nav className='menu'>
          <Link to='/bloodguide'>Blood Guide</Link>
          <div className='dropdown'>
            <Link to='/blood' className='dropbtn'>Blood ▼</Link>
            <div className='dropdown-content'>
              <Link to='/blood/type'>Type</Link>
              <Link to='/blood/red-cells'>Red Cells</Link>
              <Link to='/blood/plasma'>Plasma</Link>
              <Link to='/blood/white-cells'>White Cells</Link>
              <Link to='/blood/knowledge'>Blood Knowledge</Link>
            </div>
          </div>
          <Link to='/news'>News & Events</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/about'>About Us</Link>
        </nav>
        {/* Login */}
        <div className='actions'>
          <Link to='/login'>
            <button className='login-btn'>👤 Login</button>
          </Link>
        </div>
      </header>
      <section className="bloodguide-section">
        <h1 className="title">🩸 Blood Guide</h1>
        <div className="guide-list">
          {guideItems.map(({ id, title, icon, content }) => (
            <div key={id} className="guide-item">
              <img src={icon} alt={title} className="guide-icon" />
              <div className="guide-content">
                <h2>{id}️⃣ {title}</h2>
                <ul>
                  {content.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="register-cta">
          <Link to="/register" className="register-button">
            Đăng ký hiến máu ngay
          </Link>
        </div>
      </section>
    </>
  );
}