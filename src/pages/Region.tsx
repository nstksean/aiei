import NoSideBarLayout from "../layout/NoSideBarLayout"
import React, { useEffect, useRef, useState, forwardRef, ForwardedRef } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';

import StableMask from "../components/CameraMask/StableMask.js"
import { useResizeObserver } from '../components/CameraMask/hooks.jsx';

interface StreamVideoProps {
  forwardedRef: ForwardedRef<HTMLCanvasElement>;
};

/* function StreamVideo({ forwardedRef }: StreamVideoProps) {
  
  
  return (
    <canvas ref={forwardedRef} className='w-full h-full' />
  );
} */

const ForwardedStreamVideo = forwardRef((props: StreamVideoProps, ref) => {
  return <StreamVideo {...props} forwardedRef={ref as ForwardedRef<HTMLCanvasElement>} />;
});

export default function Region(){
  const config = {
    "cameras": {
        "crosswalk": {
            "audio": {
                "enabled": false,
                "enabled_in_config": false,
                "filters": null,
                "listen": [
                    "bark",
                    "fire_alarm",
                    "scream",
                    "speech",
                    "yell"
                ],
                "max_not_heard": 30,
                "min_volume": 500,
                "num_threads": 2
            },
            "best_image_timeout": 60,
            "birdseye": {
                "enabled": true,
                "mode": "objects",
                "order": 0
            },
            "detect": {
                "annotation_offset": -500,
                "enabled": true,
                "fps": 10,
                "height": 720,
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
                "width": 1280
            },
            "enabled": true,
            "ffmpeg": {
                "global_args": [
                    "-hide_banner",
                    "-loglevel",
                    "warning",
                    "-threads",
                    "2"
                ],
                "hwaccel_args": "preset-vaapi",
                "input_args": "preset-rtsp-generic",
                "inputs": [
                    {
                        "global_args": [],
                        "hwaccel_args": [],
                        "input_args": "-re -stream_loop -1 -fflags +genpts",
                        "path": "/airport.mp4",
                        "roles": [
                            "record",
                            "detect"
                        ]
                    }
                ],
                "output_args": {
                    "detect": [
                        "-threads",
                        "2",
                        "-f",
                        "rawvideo",
                        "-pix_fmt",
                        "yuv420p"
                    ],
                    "record": "preset-record-generic",
                    "rtmp": "preset-rtmp-generic"
                },
                "retry_interval": 10
            },
            "ffmpeg_cmds": [
                {
                    "cmd": "ffmpeg -hide_banner -loglevel warning -threads 2 -hwaccel_flags allow_profile_mismatch -hwaccel vaapi -hwaccel_device /dev/dri/renderD128 -hwaccel_output_format vaapi -re -stream_loop -1 -fflags +genpts -i /airport.mp4 -f segment -segment_time 10 -segment_format mp4 -reset_timestamps 1 -strftime 1 -c copy -an /tmp/cache/crosswalk@%Y%m%d%H%M%S%z.mp4 -r 10 -vf fps=10,scale_vaapi=w=1280:h=720:format=nv12,hwdownload,format=nv12,format=yuv420p -threads 2 -f rawvideo -pix_fmt yuv420p pipe:",
                    "roles": [
                        "record",
                        "detect"
                    ]
                }
            ],
            "live": {
                "height": 720,
                "quality": 8,
                "stream_name": "crosswalk"
            },
            "motion": {
                "contour_area": 10,
                "delta_alpha": 0.2,
                "frame_alpha": 0.01,
                "frame_height": 100,
                "improve_contrast": true,
                "lightning_threshold": 0.8,
                "mask": "",
                "mqtt_off_delay": 30,
                "threshold": 30
            },
            "mqtt": {
                "bounding_box": true,
                "crop": true,
                "enabled": true,
                "height": 270,
                "quality": 70,
                "required_": [],
                "timestamp": true
            },
            "name": "crosswalk",
            "objects": {
                "filters": {
                    "amazon": {
                        "mask": null,
                        "max_area": 24000000,
                        "max_ratio": 24000000,
                        "min_area": 0,
                        "min_ratio": 0,
                        "min_score": 0.7,
                        "threshold": 0.7
                    },
                    "car": {
                        "mask": null,
                        "max_area": 24000000,
                        "max_ratio": 24000000,
                        "min_area": 0,
                        "min_ratio": 0,
                        "min_score": 0.5,
                        "threshold": 0.7
                    },
                    "face": {
                        "mask": null,
                        "max_area": 24000000,
                        "max_ratio": 24000000,
                        "min_area": 0,
                        "min_ratio": 0,
                        "min_score": 0.7,
                        "threshold": 0.7
                    },
                    "fedex": {
                        "mask": null,
                        "max_area": 24000000,
                        "max_ratio": 24000000,
                        "min_area": 0,
                        "min_ratio": 0,
                        "min_score": 0.7,
                        "threshold": 0.7
                    },
                    "license_plate": {
                        "mask": null,
                        "max_area": 24000000,
                        "max_ratio": 24000000,
                        "min_area": 0,
                        "min_ratio": 0,
                        "min_score": 0.7,
                        "threshold": 0.7
                    },
                    "person": {
                        "mask": null,
                        "max_area": 24000000,
                        "max_ratio": 24000000,
                        "min_area": 4000,
                        "min_ratio": 0,
                        "min_score": 0.5,
                        "threshold": 0.7
                    },
                    "ups": {
                        "mask": null,
                        "max_area": 24000000,
                        "max_ratio": 24000000,
                        "min_area": 0,
                        "min_ratio": 0,
                        "min_score": 0.7,
                        "threshold": 0.7
                    }
                },
                "mask": "",
                "track": [
                    "person",
                    "car"
                ]
            },
            "onvif": {
                "autotracking": {
                    "calibrate_on_startup": false,
                    "enabled": false,
                    "enabled_in_config": false,
                    "movement_weights": [],
                    "required_zones": [],
                    "return_preset": "home",
                    "timeout": 10,
                    "track": [
                        "person"
                    ],
                    "zoom_factor": 0.3,
                    "zooming": "disabled"
                },
                "host": "",
                "password": null,
                "port": 8000,
                "user": null
            },
            "record": {
                "enabled": true,
                "enabled_in_config": true,
                "events": {
                    "objects": null,
                    "post_capture": 5,
                    "pre_capture": 5,
                    "required_zones": [],
                    "retain": {
                        "default": 0.5,
                        "mode": "motion",
                        "objects": {}
                    }
                },
                "expire_interval": 60,
                "export": {
                    "timelapse_args": "-vf setpts=0.04*PTS -r 30"
                },
                "retain": {
                    "days": 0,
                    "mode": "all"
                },
                "sync_recordings": false
            },
            "rtmp": {
                "enabled": false
            },
            "snapshots": {
                "bounding_box": true,
                "clean_copy": true,
                "crop": true,
                "enabled": true,
                "height": null,
                "quality": 70,
                "required_zones": [],
                "retain": {
                    "default": 10,
                    "mode": "motion",
                    "objects": {}
                },
                "timestamp": true
            },
            "timestamp_style": {
                "color": {
                    "blue": 255,
                    "green": 255,
                    "red": 255
                },
                "effect": "solid",
                "format": "%m/%d/%Y %H:%M:%S",
                "position": "bl",
                "thickness": 2
            },
            "ui": {
                "dashboard": true,
                "order": 0
            },
            "webui_url": null,
            "zones": {}
        }
    }
  };
  // const imageRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cameraConfig = config.cameras['crosswalk'];
  const { width, height } = cameraConfig.detect;

  const [{ width: scaledWidth }] = useResizeObserver(canvasRef);
  const imageScale = scaledWidth / width;

  const initialized = useRef(false);
  const [player, setPlayer] = useState<JSMpeg.Player | null>(null);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const wsUrl = 'ws://10.10.80.228:8765/';
      let audioContext = null;
      if (!audioContext) {
        audioContext = new (window.AudioContext)();
      }
      const newPlayer = new JSMpeg.Player(wsUrl, {
          canvas: canvasRef.current,
          audio: true,
          audioContext: audioContext,
          videoBufferSize: 512 * 1024,
          preserveDrawingBuffer: true
      });
      setPlayer(newPlayer);
    }
    return ()=>{
        /* log for debug */
      console.log('Player',player)
      if (player) {
        console.log('IsPlayer',player)
        player.destroy();
      }
    }
  }, []);


  return(
    <NoSideBarLayout>
      <div className="relative">
        <canvas ref={canvasRef} className='w-full h-full '/>
        <StableMask
        points={[[0,0],[0,0],[0,0],[0,0]]} 
        scale={imageScale} 
        width={width} 
        height={height}
        />
      </div>
    </NoSideBarLayout>

)}


