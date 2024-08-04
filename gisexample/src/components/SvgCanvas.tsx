import React, { useEffect, useRef, useState } from 'react';

interface AppBarProps {
  children: React.ReactNode;
}

const SvgCanvas: React.FC<AppBarProps> = ({ children }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [viewboxPosition, setViewboxPosition] = useState({ x: 0, y: 0 });
  const [viewboxScale, setViewboxScale] = useState(1.0);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const handleWheel = (e: WheelEvent) => {
      const scale = (e.deltaY < 0) ? 0.8 : 1.2;
      const newScale = viewboxScale * scale;

      if (newScale < 8.0 && newScale > 1 / 256) {
        const mouseX = e.clientX - svgElement.getBoundingClientRect().left;
        const mouseY = e.clientY - svgElement.getBoundingClientRect().top;

        const mouseScaled = { x: mouseX * viewboxScale, y: mouseY * viewboxScale };
        const currentPosition = { x: viewboxPosition.x, y: viewboxPosition.y };
        const centerPosition = {
          x: mouseScaled.x + currentPosition.x,
          y: mouseScaled.y + currentPosition.y,
        };

        setViewboxPosition({
          x: (viewboxPosition.x - centerPosition.x) * scale + centerPosition.x,
          y: (viewboxPosition.y - centerPosition.y) * scale + centerPosition.y,
        });
        setViewboxScale(newScale);
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [viewboxPosition, viewboxScale]);

  const viewBox = `${viewboxPosition.x} ${viewboxPosition.y} ${480 * viewboxScale} ${480 * viewboxScale}`;

  return (
    <div style={{ margin: `20px` }}>
      <svg 
        ref={svgRef} 
        viewBox={viewBox} 
        style={{ width: '480px', height: '480px', border: '1px solid black', cursor: 'pointer' }}
      >
        <rect width="100" height="100" fill="lightgray" />
        {children}
      </svg>
    </div>
  );
};

export default SvgCanvas;