"use client";

export function GradientBackground() {
  return (
    <>
      {/* Animated mesh gradient */}
      <div className="mesh-gradient" aria-hidden="true" />
      
      {/* Additional gradient orbs - all dark/sage tones only */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Top left orb */}
        <div 
          className="absolute -top-[40vh] -left-[20vw] w-[80vw] h-[80vh] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #576953 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'float1 30s ease-in-out infinite',
          }}
        />
        
        {/* Bottom right orb */}
        <div 
          className="absolute -bottom-[30vh] -right-[20vw] w-[70vw] h-[70vh] rounded-full opacity-[0.015]"
          style={{
            background: 'radial-gradient(circle, #576953 0%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'float2 35s ease-in-out infinite',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 10%) scale(1.05); }
          66% { transform: translate(-5%, 5%) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-8%, -5%) scale(1.1); }
          66% { transform: translate(3%, -8%) scale(0.9); }
        }
      `}</style>
    </>
  );
}
