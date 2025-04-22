import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      {/* Hexagon grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0z' fill-rule='evenodd' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      {/* Floating particles */}
      <div className="honeycomb">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="honeycomb-cell bg-white/10 rounded-full absolute"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          33% { transform: translateY(-100px) translateX(100px) rotate(120deg); }
          66% { transform: translateY(100px) translateX(-100px) rotate(240deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;