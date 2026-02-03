"use client";

export function GradientBackground() {
  return (
    <>
      {/* Animated mesh gradient */}
      <div className="mesh-gradient" aria-hidden="true" />
      
      {/* Additional gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Top left orb */}
        <div 
          className="absolute -top-[40vh] -left-[20vw] w-[80vw] h-[80vh] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'float1 30s ease-in-out infinite',
          }}
        />
        
        {/* Bottom right orb */}
        <div 
          className="absolute -bottom-[30vh] -right-[20vw] w-[70vw] h-[70vh] rounded-full opacity-[0.015]"
          style={{
            background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'float2 35s ease-in-out infinite',
          }}
        />
        
        {/* Center subtle orb */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full opacity-[0.01]"
          style={{
            background: 'radial-gradient(circle, #ffffff 0%, transparent 60%)',
            filter: 'blur(80px)',
            animation: 'float3 40s ease-in-out infinite',
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
        @keyframes float3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </>
  );
}
