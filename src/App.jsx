// src/App.jsx
import React from 'react';
import { activities } from './ActivitiesData'; // 引入剛才建立的檔案

function App() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
        SEL運動共學社群實踐紀錄 [cite: 4]
      </h1>
      <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
        實施期程：115年3月9日起至115年12月31日止 [cite: 3]
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
        {/* 使用 map 迴圈產出每一場活動 */}
        {activities.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div style={tagStyle}>{item.date}</div>
            <h3 style={{ margin: '15px 0' }}>{item.theme}</h3>
            <p><strong>主講人：</strong>{item.speaker} ({item.host})</p>
            <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 簡單的內聯樣式
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const tagStyle = {
  display: 'inline-block',
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '0.8rem'
};

export default App;