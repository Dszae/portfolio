import React, { useState, useRef } from 'react';

const INITIAL_NODES = [
  { id: 'power', type: 'Battery', x: 20, y: 150, value: '9V' },
  { id: 'switch', type: 'Switch', x: 250, y: 150, closed: false },
  { id: 'led', type: 'LED', x: 480, y: 150 }
];

const WIRES = [
  { from: 'power', to: 'switch' },
  { from: 'switch', to: 'led' }
];

export default function CircuitSimulator() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [dragging, setDragging] = useState(null);
  const containerRef = useRef(null);

  // The logic engine: LED is on only if the switch node is closed
  const isCircuitClosed = nodes.find(n => n.id === 'switch')?.closed;

  const handlePointerDown = (e, id) => {
    e.target.setPointerCapture(e.pointerId);
    setDragging(id);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Center the node on the cursor (Node width is 100px, height is 70px)
    setNodes(nodes.map(n => n.id === dragging ? { ...n, x: x - 50, y: y - 35 } : n));
  };

  const handlePointerUp = (e) => {
    if (dragging) {
      e.target.releasePointerCapture(e.pointerId);
      setDragging(null);
    }
  };

  const toggleSwitch = (id) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, closed: !n.closed } : n));
  };

  const getNodeCenter = (id) => {
    const node = nodes.find(n => n.id === id);
    return { x: node.x + 50, y: node.y + 35 }; 
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-100">Live Circuit Logic</h3>
          <p className="text-sm text-slate-400 font-mono mt-1">Drag the nodes. Toggle the switch to complete the circuit.</p>
        </div>
        <div className={`px-3 py-1 text-[10px] uppercase font-black tracking-wider rounded-full border ${isCircuitClosed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
          System Status: {isCircuitClosed ? 'Active' : 'Disconnected'}
        </div>
      </div>

      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full h-[400px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
        style={{ touchAction: 'none' }} // Prevents mobile scrolling while dragging
      >
        {/* Engineering Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        ></div>

        {/* Dynamic SVG Wiring */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {WIRES.map((wire, idx) => {
            const start = getNodeCenter(wire.from);
            const end = getNodeCenter(wire.to);
            return (
              <line 
                key={idx}
                x1={start.x} 
                y1={start.y} 
                x2={end.x} 
                y2={end.y} 
                stroke={isCircuitClosed ? "#ef4444" : "#334155"} 
                strokeWidth="4"
                strokeLinecap="round"
                className="transition-colors duration-500"
              />
            );
          })}
        </svg>

        {/* Interactive Nodes */}
        {nodes.map(node => (
          <div
            key={node.id}
            onPointerDown={(e) => handlePointerDown(e, node.id)}
            className={`absolute flex flex-col items-center justify-center w-[100px] h-[70px] rounded-xl border-2 cursor-grab active:cursor-grabbing select-none backdrop-blur-md transition-shadow duration-200 
              ${dragging === node.id ? 'shadow-[0_0_30px_rgba(59,130,246,0.3)] z-20 scale-105' : 'z-10 scale-100'} 
              ${node.type === 'LED' && isCircuitClosed ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_40px_rgba(250,204,21,0.2)]' : 'border-slate-700 bg-slate-900/90'}`
            }
            style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
          >
            <span className="text-[10px] font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{node.type}</span>
            
            {node.type === 'Battery' && (
              <span className="text-sm font-black text-emerald-400">{node.value}</span>
            )}
            
            {node.type === 'Switch' && (
              <button 
                onPointerDown={(e) => e.stopPropagation()} // Prevents the node from dragging when clicking the toggle button
                onClick={() => toggleSwitch(node.id)}
                className={`px-4 py-1 text-[10px] uppercase font-black tracking-wider rounded-lg transition-all ${node.closed ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {node.closed ? 'ON' : 'OFF'}
              </button>
            )}

            {node.type === 'LED' && (
              <div className={`w-5 h-5 rounded-full transition-all duration-500 ${isCircuitClosed ? 'bg-yellow-400 shadow-[0_0_20px_#facc15]' : 'bg-slate-800'}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}