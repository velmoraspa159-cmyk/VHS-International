import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-8 px-6 pt-1 flex items-center justify-between text-[11px] font-semibold text-[#1F2421] select-none bg-white">
      {/* Current Time */}
      <div className="font-mono tracking-tight font-bold">
        {time || '9:41 AM'}
      </div>

      {/* Center Dynamic Notch / Speaker Pill */}
      <div className="w-20 h-4 bg-[#1F2421] rounded-full mx-auto flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-[#2D4A3E]/70" />
      </div>

      {/* Signal, Wi-Fi & Battery */}
      <div className="flex items-center gap-1.5 text-xs">
        {/* Cellular Signal (4 bars) */}
        <div className="flex items-end gap-0.5 h-2.5">
          <span className="w-0.5 h-1 bg-[#1F2421] rounded-xs" />
          <span className="w-0.5 h-1.5 bg-[#1F2421] rounded-xs" />
          <span className="w-0.5 h-2 bg-[#1F2421] rounded-xs" />
          <span className="w-0.5 h-2.5 bg-[#1F2421] rounded-xs" />
        </div>
        <Wifi className="w-3 h-3 text-[#1F2421]" />
        <div className="flex items-center gap-0.5">
          <Battery className="w-3.5 h-3.5 text-[#1F2421]" />
          <span className="text-[10px] font-mono">100%</span>
        </div>
      </div>
    </div>
  );
};
