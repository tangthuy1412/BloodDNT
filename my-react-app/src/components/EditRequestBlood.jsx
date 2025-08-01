import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditRequestBlood.css';
import Swal from 'sweetalert2';

export default function EditRequestBlood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    RequestDate: '',
    IdentificationNumber: '',
    EmergencyLevel: 'Normal',
    Note: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
          navigate('/login');
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/blood-requests/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const d = res.data.data;
        setFormData({
          RequestDate: d.RequestDate?.substring(0, 10),
          IdentificationNumber: d.IdentificationNumber,
          EmergencyLevel: d.EmergencyLevel || 'Normal',
          Note: d.Note || '',
        });
      } catch (err) {
        console.error('❌ Lỗi lấy dữ liệu yêu cầu:', err);
        Swal.fire('Không tìm thấy đơn yêu cầu máu!');
        navigate('/history');
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire('Bạn chưa đăng nhập!');
        navigate('/login');
        return;
      }

      await axios.put(`http://localhost:5000/api/blood-requests/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire('✅ Cập nhật đơn yêu cầu thành công!');
      navigate(`/request/${id}`);
    } catch (err) {
      Swal.fire('❌ Lỗi cập nhật đơn yêu cầu!');
      console.error(err);
    }
  };

  return (
    <div className="layout-wrapper">
        
      <main>
        <section className="edit-form-section">
          <form onSubmit={handleSubmit} className="edit-form">
            <h2>✏️ Chỉnh sửa đơn yêu cầu máu</h2>

            <label>📅 Ngày yêu cầu:</label>
            <input
              type="date"
              name="RequestDate"
              value={formData.RequestDate}
              onChange={handleChange}
              required
            />

            <label>🆔 CCCD:</label>
            <input
              type="text"
              name="IdentificationNumber"
              value={formData.IdentificationNumber}
              onChange={handleChange}
              required
            />

            <label>🚨 Mức độ khẩn cấp:</label>
            <select
              name="EmergencyLevel"
              value={formData.EmergencyLevel}
onChange={handleChange}
              required
            >
              <option value="Urgent">Khẩn cấp (Urgent)</option>
              <option value="Normal">Bình thường (Normal)</option>
            </select>

            <label>📝 Ghi chú:</label>
            <textarea
              name="Note"
              value={formData.Note}
              onChange={handleChange}
              rows={4}
              placeholder="Nhập ghi chú (nếu có)..."
            ></textarea>

            <button type="submit" className="save-btn">💾 Lưu thay đổi</button>
          </form>
        </section>
      </main>

      <section className='footer'>
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
      </section>
    </div>
  );
}