import React, { useEffect, useRef, useState, forwardRef, ForwardedRef, useLayoutEffect, useCallback  } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';

import StableMask from "../CameraMask/StableMask.js"
import { useResizeObserver } from '../CameraMask/hooks.jsx';

export default function StreamWithMask(data){

  const config = {
    "cameras": {
      "crosswalk": {
        "detect": {
          "annotation_offset": -500,
          "enabled": true,
          "fps": 10,
          "height": 720,
          "width": 1280,
          "max_disappeared": 50,
          "min_initialized": 5,
          "stationary": {
              "interval": 100,
              "max_frames": {
                  "default": null,
                  "objects": {}
              },
              "threshold": 100
          },
      },
      }
    }
  };
  // const imageRef = useRef(null);
  const [region,setRegion] = useState(null)
  const rg = data.data.region[0].region_sets;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cameraConfig = config.cameras['crosswalk'];
  const { width, height } = cameraConfig.detect;

  const [{ width: scaledWidth }] = useResizeObserver(canvasRef);
  const videoScale = scaledWidth / width;

  const initialized = useRef(false);
  let player: JSMpeg.Player | null = null;
  const wsUrl = 'ws://127.0.0.1:8765/';
  
  /* const showVideo = useCallback(() => {
    if (!initialized.current) {
      initialized.current = true;
      let audioContext = null;
      if (!audioContext) {
        audioContext = new (window.AudioContext)();
      }
      player = new JSMpeg.VideoElement('#videoWrapper',wsUrl, {
          canvas: canvasRef.current,
          audio: true,
          audioContext: audioContext,
          videoBufferSize: 512 * 1024,
          preserveDrawingBuffer: true
      });
    }
  }, [wsUrl]); */

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const wsUrl = 'ws://127.0.0.1:8765/';
      let audioContext = null;
      if (!audioContext) {
        audioContext = new (window.AudioContext)();
      }
      player = new JSMpeg.Player(wsUrl, {
          canvas: canvasRef.current,
          audio: true,
          audioContext: audioContext,
          videoBufferSize: 512 * 1024,
          preserveDrawingBuffer: true
      });
    }
    return ()=>{
    }
  }, []);
  
  useLayoutEffect(() => {
    // showVideo()
    if(data !== undefined){
      setRegion(rg?.fence)
    }
  }, [data,region])

  return(
      <div className="relative">
        <canvas ref={canvasRef} id='videoWrapper' className='w-full h-full '/>
        <StableMask
        points={region? region : []} 
        scale={videoScale} 
        width={width} 
        height={height}
        />
      </div>
)};

