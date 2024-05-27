import { useCallback, useMemo, useRef, useState, useEffect } from 'react';


export default function StableMask({ points, scale, width, height }) {
    const boundingRef = useRef(null);
    const snap = true
    const scaledPoints = useMemo(() => scalePolylinePoints(points, scale), [points, scale]);
    
    return (
      <div
        className="absolute"
        style={{
          top: `-${MaskInset}px`, 
          right: `-${MaskInset}px`, 
          bottom: `-${MaskInset}px`, 
          left: `-${MaskInset}px`
        }}>
        {!scaledPoints
          ? null
          : scaledPoints.map(([x, y], i) => (
              <PolyPoint
                key={i}
                boundingRef={boundingRef}
                index={i}
                x={x + MaskInset}
                y={y + MaskInset}
              />
            ))}
        <div className="absolute inset-0 right-0 bottom-0" ref={boundingRef} />
        <svg
          width="100%"
          height="100%"
          className="absolute pointer-events-none"
          style={{
            top: `-${MaskInset}px`, 
            right: `-${MaskInset}px`, 
            bottom: `-${MaskInset}px`, 
            left: `-${MaskInset}px`
          }}
        >
          {!scaledPoints ? null : (
            <g>
              <polygon points={polylinePointsToPolyline(scaledPoints)} fill="rgba(175,39,47,0.3)" stroke="white" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  function boundedSize(value, maxValue, snap) {
    const newValue = Math.min(Math.max(0, Math.round(value)), maxValue);
    if (snap) {
      if (newValue <= MaskInset) {
        return 0;
      } else if (maxValue - newValue <= MaskInset) {
        return maxValue;
      }
    }
  
    return newValue;
  }

  
function getPolylinePoints(polyline) {
    if (!polyline) {
      return;
    }
    return polyline.split(',').reduce((memo, point, i) => {
      if (i % 2) {
        memo[memo.length - 1].push(parseInt(point, 10));
      } else {
        memo.push([parseInt(point, 10)]);
      }
      return memo;
    }, []);
  }
  
  function scalePolylinePoints(polylinePoints, scale) {  
    if (!polylinePoints) {
      return;
    }
  
    return polylinePoints.map(([x, y]) => [Math.round(x * scale), Math.round(y * scale)]);
  }
  
  function polylinePointsToPolyline(polylinePoints) {
  
    if (!polylinePoints) {
      return;
    }
  
    return polylinePoints.reduce((memo, [x, y]) => `${memo}${x},${y},`, '').replace(/,$/, '');
  }
  
  const PolyPointRadius = 10;
  function PolyPoint({ boundingRef, index, x, y/*,  onMove, onRemove */ }) {
    const [hidden, setHidden] = useState(false);
  
    return (
      <div
        className={` bg-sky-700 rounded-full absolute z-50 hidden `}
  
        style={{
          top: `${y - PolyPointRadius}px`, 
          left: `${x - PolyPointRadius}px`, 
          width: '20px', 
          height: '20px',
        }}
      />
    );
  }
  
  const MaskInset = 0 