import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function AnalyzerTelemetry() {
  const [systemState, setSystemState] = useState('NOMINAL');
  const [logs, setLogs] = useState(['[SYS] Diagnostics Engine Initialized...', '[SYS] Awaiting telemetry stream...']);
  
  // Telemetry Data Queues
  const [pressureData, setPressureData] = useState(Array(50).fill(100));
  const [rpmData, setRpmData] = useState(Array(50).fill(3000));
  
  // Current Live Values
  const [metrics, setMetrics] = useState({
    pressure: 100.0,
    temp: 37.0,
    rpm: 3000,
    probeVol: 2.5
  });

  const logEndRef = useRef(null);

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-15), `[${new Date().toISOString().split('T')[1].slice(0,-1)}] ${msg}`]);
  };

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Master Telemetry Loop (Runs every 100ms to simulate live hardware)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        let newPressure = prev.pressure;
        let newRpm = prev.rpm;

        if (systemState === 'NOMINAL') {
          newPressure = 99.5 + Math.random(); // Normal vacuum fluctuation
          newRpm = 2990 + Math.random() * 20;
        } else if (systemState === 'VACUUM_FAILURE') {
          newPressure = Math.max(0, prev.pressure - (Math.random() * 5 + 2)); // Rapid pressure drop
          newRpm = prev.rpm * 0.98; // Motor spinning down
        } else if (systemState === 'RECALIBRATING') {
          newPressure = Math.min(100, prev.pressure + (Math.random() * 3));
          newRpm = 3000;
        }

        setPressureData(d => [...d.slice(1), newPressure]);
        setRpmData(d => [...d.slice(1), newRpm]);

        return { ...prev, pressure: newPressure, rpm: newRpm, temp: 37.0 + (Math.random() * 0.2 - 0.1) };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [systemState]);

  // Actions
  const triggerVacuumFailure = () => {
    setSystemState('VACUUM_FAILURE');
    addLog('ERR: CRITICAL VACUUM DROP DETECTED ON MANIFOLD 4');
    addLog('SYS: HALTING FLUIDIC INJECTION');
  };

  const runCalibration = () => {
    setSystemState('RECALIBRATING');
    addLog('CMD: INITIATING PROBE RECALIBRATION SEQUENCE...');
    setTimeout(() => {
      setSystemState('NOMINAL');
      addLog('SYS: RECALIBRATION SUCCESSFUL. RETURNING TO NOMINAL STATUS.');
    }, 4000);
  };

  // SVG Chart Generator
  const generatePath = (data, max, height) => {
    const width = 100; // ViewBox width percentage
    const step = width / (data.length - 1);
    return data.map((val, i) => {
      const y = height - ((val / max) * height);
      return `${i === 0 ? 'M' : 'L'} ${i * step} ${y}`;
    }).join(' ');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 font-mono p-4 sm:p-8 selection:bg-cyan-900 overflow-x-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-end border-b border-slate-800 pb-4 mb-8">
        <div>
          <Link to="/" className="text-cyan-500 hover:text-cyan-400 text-sm mb-4 inline-block">&larr; Return to Portfolio</Link>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tighter">IMMUNOASSAY_TELEMETRY</h1>
          <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest mt-1">Automated Diagnostics & Fluidics Control</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest animate-pulse border ${
            systemState === 'NOMINAL' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500' :
            systemState === 'VACUUM_FAILURE' ? 'border-red-500/50 bg-red-500/10 text-red-500' :
            'border-amber-500/50 bg-amber-500/10 text-amber-500'
          }`}>
            STATUS: {systemState}
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* Left Column: Live Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pressure Chart */}
          <div className="bg-[#121216] border border-slate-800 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l7.5 13.5h-15L12 6.5z"/></svg>
            </div>
            <div className="flex justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Vacuum Manifold Pressure</h3>
              <span className={`text-xl font-black ${metrics.pressure < 80 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                {metrics.pressure.toFixed(1)} <span className="text-sm text-slate-500">kPa</span>
              </span>
            </div>
            <div className="h-40 w-full relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                {[...Array(5)].map((_, i) => <div key={i} className="w-full border-b border-cyan-500 h-0"></div>)}
              </div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <path 
                  d={generatePath(pressureData, 120, 100)} 
                  fill="none" 
                  stroke={metrics.pressure < 80 ? '#ef4444' : '#22d3ee'} 
                  strokeWidth="1.5"
                  className="transition-all duration-75"
                />
              </svg>
            </div>
          </div>

          {/* Secondary Metrics Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#121216] border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Centrifuge Rotor</h3>
              <span className="text-2xl font-black text-white">{Math.round(metrics.rpm)} <span className="text-sm text-slate-500">RPM</span></span>
              <div className="mt-4 h-16 w-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-50">
                  <path d={generatePath(rpmData, 3500, 100)} fill="none" stroke="#a78bfa" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            <div className="bg-[#121216] border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reaction Temp</h3>
              <span className="text-2xl font-black text-white">{metrics.temp.toFixed(2)} <span className="text-sm text-slate-500">°C</span></span>
              <div className="mt-6">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>36.0</span><span>37.0</span><span>38.0</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${((metrics.temp - 36) / 2) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Terminal */}
        <div className="flex flex-col gap-6">
          
          {/* Hardware Controls */}
          <div className="bg-[#121216] border border-slate-800 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Hardware Overrides</h3>
            <div className="space-y-4">
              <button 
                onClick={triggerVacuumFailure}
                disabled={systemState === 'VACUUM_FAILURE'}
                className="w-full py-3 bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20 font-bold text-xs tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simulate Vacuum Leak
              </button>
              <button 
                onClick={runCalibration}
                disabled={systemState !== 'VACUUM_FAILURE'}
                className="w-full py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 font-bold text-xs tracking-widest uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Execute Probe Calibration
              </button>
            </div>
          </div>

          {/* Diagnostic Terminal */}
          <div className="bg-[#0a0a0c] border border-slate-800 p-4 rounded-xl flex-grow flex flex-col min-h-[250px]">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">Diagnostic Terminal</h3>
            <div className="flex-grow overflow-y-auto font-mono text-[10px] sm:text-xs space-y-2 text-slate-400">
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes('ERR') ? 'text-red-400' : log.includes('CMD') ? 'text-cyan-400' : ''}`}>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}