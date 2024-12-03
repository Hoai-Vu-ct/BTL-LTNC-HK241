import React from 'react';
import './index.css'; // Tạo file CSS riêng để dễ chỉnh style

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>HCMUT-Course</h3>
          <p>BTL Môn học Lập trình nâng cao HK241</p>
          <p>Trường đại học Bách Khoa, Đại học Quốc Gia TP. Hồ Chí Minh</p>
        </div>
        
        <div className="footer-section help">
          
        </div>
        
        <div className="footer-section programs">
          
        </div>
        
        <div className="footer-section contact">
          <h3>Team Members</h3>
          <p>Nguyễn Phương Hoài Vũ</p>
          <p>Hoàng Mạnh Đức</p>
          <p>Huỳnh Hữu Kha</p>
          <p>Thang Khiết Dương</p>
          <p>Nguyễn Duy Ngọc</p>
          <p>Phạm Đình Chương</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 HCMUT-Course</p>
      </div>
    </footer>
  );
}

export default Footer;
