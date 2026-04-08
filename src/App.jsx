import React, { useState } from 'react';
import { activities } from './ActivitiesData';

// 活動卡片組件
const ActivityCard = ({ item }) => {
  const isPending = item.isPending;
  const [isExpanded, setIsExpanded] = useState(false); // 控制紀錄是否展開

  const cardStyle = {
    border: isPending ? '2px dashed #bdc3c7' : '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: isPending ? '#fdfdfd' : '#fff',
    boxShadow: isPending ? 'none' : '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    opacity: isPending ? 0.8 : 1
  };

  const tagStyle = {
    alignSelf: 'flex-start',
    backgroundColor: isPending ? '#95a5a6' : '#3498db',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };

  return (
    <div style={cardStyle}>
      <div style={tagStyle}>{isPending ? "規劃中" : item.date}</div>
      <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '1.25rem' }}>{item.theme}</h3>
      <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
        <strong>主講/主持：</strong> {item.speaker} {item.host ? `(${item.host})` : ''}
      </div>
      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#34495e', flexGrow: 1 }}>
        {item.desc}
      </p>

      {/* 如果不是規劃中的活動，且有紀錄資料，才顯示按鈕 */}
      {!isPending && item.record && (
        <>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              alignSelf: 'flex-start',
              padding: '6px 16px',
              backgroundColor: isExpanded ? '#3498db' : '#fff',
              border: '1px solid #3498db',
              color: isExpanded ? '#fff' : '#3498db',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.3s'
            }}
          >
            {isExpanded ? '收起活動紀錄' : '查看活動紀錄'}
          </button>
          
          {/* 展開後的內容區塊（包含文字、照片牆、影片） */}
          {isExpanded && (
            <div style={{
              marginTop: '10px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              borderLeft: '4px solid #3498db',
              fontSize: '0.9rem',
              color: '#2c3e50',
              lineHeight: '1.6',
            }}>
              {/* 1. 文字紀錄 */}
              <div style={{ marginBottom: '15px', whiteSpace: 'pre-line' }}>
                {item.record}
              </div>
              
              {/* 2. 多張照片牆 (CSS Grid 響應式排版) */}
              {item.imageUrls && item.imageUrls.length > 0 && (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                  gap: '10px', 
                  marginBottom: '15px' 
                }}>
                  {item.imageUrls.map((url, index) => (
                    <img 
                      key={index}
                      src={url} 
                      alt={`${item.theme} 照片 ${index + 1}`} 
                      style={{ 
                        width: '100%', 
                        height: '150px', 
                        objectFit: 'cover', 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                      }} 
                    />
                  ))}
                </div>
              )}

              {/* 3. YouTube 影片嵌入 (16:9 完美比例) */}
              {item.videoUrl && (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                  <iframe 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={item.videoUrl} 
                    title={`${item.theme} 活動影片`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// 主網頁組件
function App() {
  const members = [
    { name: "黃如昕", role: "召集人 / 導師", school: "國立高餐大附中" },
    { name: "林律揚", role: "成員 / 導師", school: "國立高餐大附中" },
    { name: "羅琳峰", role: "成員 / 導師", school: "國立高餐大附中" },
    { name: "蔡宗凌", role: "成員 / 學務主任", school: "國立高餐大附中" }
  ];

  return (
    <div style={{ 
      fontFamily: '"PingFang TC", "Microsoft JhengHei", sans-serif',
      backgroundColor: '#f5f7f9',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      {/* 標頭區塊 */}
      <header style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '10px' }}>
          SEL運動共學社群實踐紀錄
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          實施期程：115年3月9日起至115年12月31日止
        </p>
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '30px',
          textAlign: 'left',
          borderLeft: '5px solid #2ecc71'
        }}>
          <strong>社群目標：</strong>
          以「社會情緒學習（SEL）」為核心，透過運動體驗提升教師自我覺察與壓力調適能力。
        </div>
      </header>

      {/* 成員區塊 */}
      <section style={{ maxWidth: '1000px', margin: '0 auto 60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>社群成員</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          {members.map((m, i) => (
            <div key={i} style={{ 
              backgroundColor: '#fff', 
              padding: '20px', 
              borderRadius: '8px', 
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{m.name}</div>
              <div style={{ color: '#3498db', fontSize: '0.9rem', margin: '5px 0' }}>{m.role}</div>
              <div style={{ color: '#95a5a6', fontSize: '0.8rem' }}>{m.school}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 活動歷程區塊 */}
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>活動歷程</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '30px' 
        }}>
          {activities.map((act) => (
            <ActivityCard key={act.id} item={act} />
          ))}
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '80px', color: '#bdc3c7', fontSize: '0.9rem' }}>
        © 115 SEL運動共學社群 - 國立高雄師範大學 SEL 教師專業發展與實踐學習社群
      </footer>
    </div>
  );
}

export default App;