import { useEffect, useRef,  } from "react";
import JSMpeg from '@cycjimmy/jsmpeg-player';

export default function JSMpegPlayer() {
    const playerRef = useRef();
    const url = 'ws://10.10.80.46:8765/';
  
    useEffect(() => {
      const video = new JSMpeg.VideoElement(
        playerRef.current,
        url,
        {},
        {protocols: [], audio: false, videoBufferSize: 1024*1024*4}
      );
      return () => {
        video.destroy();
      };
    }, [url]);
  
    return (
      <div ref={playerRef} class="jsmpeg w-full h-full" />
    );
}
