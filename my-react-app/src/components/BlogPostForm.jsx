import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import './blog.css';
import Swal from 'sweetalert2';

export default function BlogPostForm({ onPostSuccess }) {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({ title: "", content: "", category: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();//stop reload
    const token = localStorage.getItem('token');
    const res = await fetch("http://localhost:5000/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
      Title: form.title,       
      Content: form.content    
  
    })
    });
    if (res.ok) {
      setForm({ title: "", content: "", category: "" });
      if (onPostSuccess) onPostSuccess();
      Swal.fire("Đăng bài thành công!");
    } else {
      Swal.fire("Đăng bài thất bại!");
    }
  };

  if (!user) return <p style={{ color: "red" }}>Bạn cần đăng nhập để đăng bài.</p>;

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <div className="blog-form-row">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tiêu đề"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Chủ đề (tuỳ chọn)"
        />
      </div>
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Nội dung"
        required
      />
      <button type="submit">Đăng bài</button>
    </form>
  );
}
