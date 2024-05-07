import { useRef, useEffect, useState } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';

function StreamVideo() {
  const initialized = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let player: JSMpeg.Player | null = null;
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const wsUrl = 'ws://10.10.80.228:8765/';
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
  // useEffect(() => {
  //   if(!reload){
  //     location.reload();
  //   }
  //   return ()=>{
  //     setReload(true)
  //   }
  // }, [reload])
  
  return (
        <canvas ref={canvasRef} className='w-full h-full '/>
  );
}

export default StreamVideo;