import {Button} from '../ui/button.tsx';
import Switch from './Switch.jsx';
import { useResizeObserver } from './hooks.jsx';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import bgPicture from '../../images/snapshot/0503snap.png'
import { useParams } from 'react-router-dom';
export default function CameraMasks({ camera, data, isEditZone}) {
  const config = {
    "audio": {
        "enabled": false,
        "enabled_in_config": null,
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
    "birdseye": {
        "enabled": true,
        "height": 1080,
        "mode": "objects",
        "quality": 8,
        "restream": false,
        "width": 1920
    },
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
    },
    "database": {
        "path": "/config/db/frigate.db"
    },
    "detect": {
        "annotation_offset": 0,
        "enabled": true,
        "fps": 5,
        "height": null,
        "max_disappeared": null,
        "min_initialized": null,
        "stationary": {
            "interval": null,
            "max_frames": {
                "default": null,
                "objects": {}
            },
            "threshold": null
        },
        "width": null
    },
    "detectors": {
        "coral1": {
            "device": "pci:0",
            "model": {
                "height": 320,
                "input_pixel_format": "rgb",
                "input_tensor": "nhwc",
                "labelmap": {
                    "0": "person",
                    "1": "bicycle",
                    "2": "car",
                    "3": "motorcycle",
                    "4": "airplane",
                    "5": "bus",
                    "6": "train",
                    "7": "car",
                    "8": "boat",
                    "9": "traffic light",
                    "10": "fire hydrant",
                    "11": "street sign",
                    "12": "stop sign",
                    "13": "parking meter",
                    "14": "bench",
                    "15": "bird",
                    "16": "cat",
                    "17": "dog",
                    "18": "horse",
                    "19": "sheep",
                    "20": "cow",
                    "21": "elephant",
                    "22": "bear",
                    "23": "zebra",
                    "24": "giraffe",
                    "25": "hat",
                    "26": "backpack",
                    "27": "umbrella",
                    "28": "shoe",
                    "29": "eye glasses",
                    "30": "handbag",
                    "31": "tie",
                    "32": "suitcase",
                    "33": "frisbee",
                    "34": "skis",
                    "35": "snowboard",
                    "36": "sports ball",
                    "37": "kite",
                    "38": "baseball bat",
                    "39": "baseball glove",
                    "40": "skateboard",
                    "41": "surfboard",
                    "42": "tennis racket",
                    "43": "bottle",
                    "44": "plate",
                    "45": "wine glass",
                    "46": "cup",
                    "47": "fork",
                    "48": "knife",
                    "49": "spoon",
                    "50": "bowl",
                    "51": "banana",
                    "52": "apple",
                    "53": "sandwich",
                    "54": "orange",
                    "55": "broccoli",
                    "56": "carrot",
                    "57": "hot dog",
                    "58": "pizza",
                    "59": "donut",
                    "60": "cake",
                    "61": "chair",
                    "62": "couch",
                    "63": "potted plant",
                    "64": "bed",
                    "65": "mirror",
                    "66": "dining table",
                    "67": "window",
                    "68": "desk",
                    "69": "toilet",
                    "70": "door",
                    "71": "tv",
                    "72": "laptop",
                    "73": "mouse",
                    "74": "remote",
                    "75": "keyboard",
                    "76": "cell phone",
                    "77": "microwave",
                    "78": "oven",
                    "79": "toaster",
                    "80": "sink",
                    "81": "refrigerator",
                    "82": "blender",
                    "83": "book",
                    "84": "clock",
                    "85": "vase",
                    "86": "scissors",
                    "87": "teddy bear",
                    "88": "hair drier",
                    "89": "toothbrush",
                    "90": "hair brush"
                },
                "labelmap_path": null,
                "model_type": "ssd",
                "path": "/edgetpu_model.tflite",
                "width": 320
            },
            "type": "edgetpu"
        }
    },
    "environment_vars": {},
    "ffmpeg": {
        "global_args": [
            "-hide_banner",
            "-loglevel",
            "warning",
            "-threads",
            "2"
        ],
        "hwaccel_args": [],
        "input_args": "preset-rtsp-generic",
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
    "go2rtc": {},
    "live": {
        "height": 720,
        "quality": 8,
        "stream_name": ""
    },
    "logger": {
        "default": "info",
        "logs": {
            "frigate.events": "info",
            "peewee": "info",
            "ws4py": "info"
        }
    },
    "model": {
        "height": 320,
        "input_pixel_format": "rgb",
        "input_tensor": "nhwc",
        "labelmap": {},
        "labelmap_path": null,
        "model_type": "ssd",
        "path": null,
        "width": 320
    },
    "motion": null,
    "mqtt": {
        "client_id": "frigate",
        "enabled": false,
        "host": "",
        "port": 1883,
        "stats_interval": 60,
        "tls_ca_certs": null,
        "tls_client_cert": null,
        "tls_client_key": null,
        "tls_insecure": null,
        "topic_prefix": "frigate",
        "user": null
    },
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
    "plus": {
        "enabled": false
    },
    "record": {
        "enabled": true,
        "enabled_in_config": null,
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
    "telemetry": {
        "network_interfaces": [],
        "stats": {
            "amd_gpu_stats": true,
            "intel_gpu_stats": true,
            "network_bandwidth": false
        },
        "version_check": false
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
        "date_style": "short",
        "live_mode": "mse",
        "strftime_fmt": null,
        "time_format": "browser",
        "time_style": "medium",
        "timezone": null,
        "use_experimental": false
    }
  }
  const imageRef = useRef(null);
  const [snap, setSnap] = useState(true);
  const cameraConfig = config.cameras[camera];
  const {
    motion: { mask: motionMask },
    objects: { filters: objectFilters },
    zones,
  } = cameraConfig;

  const { width, height } = cameraConfig.detect;

  const [{ width: scaledWidth }] = useResizeObserver(imageRef);
  const imageScale = scaledWidth / width;

  const [motionMaskPoints, setMotionMaskPoints] = useState(
    Array.isArray(motionMask)
      ? motionMask.map((mask) => getPolylinePoints(mask))
      : motionMask
      ? [getPolylinePoints(motionMask)]
      : []
  );

  const [zonePoints, setZonePoints] = useState(
    Object.keys(zones).reduce((memo, zone) => ({ ...memo, [zone]: getPolylinePoints(zones[zone].region_sets) }), {})
  );
  
  const [objectMaskPoints, setObjectMaskPoints] = useState(
    Object.keys(objectFilters).reduce(
      (memo, name) => ({
        ...memo,
        [name]: Array.isArray(objectFilters[name].mask)
          ? objectFilters[name].mask.map((mask) => getPolylinePoints(mask))
          : objectFilters[name].mask
          ? [getPolylinePoints(objectFilters[name].mask)]
          : [],
      }),
      {}
    )
  );

  const [editing, setEditing] = useState({ set: motionMaskPoints, key: 0, fn: setMotionMaskPoints });
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  /* clean hint every switch toggle */
  useEffect(() => {
    setError('')
    setSuccess('')
  }, [zonePoints,isEditZone])
  

  const handleUpdateEditable = useCallback(
    (newPoints) => {
      let newSet;
      if (Array.isArray(editing.set)) {
        newSet = [...editing.set];
        newSet[editing.key] = newPoints;
      } else if (editing.subkey !== undefined) {
        newSet = { ...editing.set };
        newSet[editing.key][editing.subkey] = newPoints;
      } else {
        newSet = { ...editing.set, [editing.key]: newPoints };
      }
      editing.set = newSet;
      editing.fn(newSet);
    },
    [editing]
  );

  // Zone methods
  const handleEditZone = useCallback(
    (key) => {
      setEditing({ set: zonePoints, key, fn: setZonePoints });
    },
    [setEditing, zonePoints, setZonePoints]
  );

  const handleAddZone = useCallback(() => {
    const n = Object.keys(zonePoints).filter((name) => name.startsWith('zone_')).length;
    if(n > 0){
      setError('One zone can only be added at a time')
    }else{
      const zoneName = `zone_${n}`;
      const newZonePoints = { ...zonePoints, [zoneName]: [] };
      setZonePoints(newZonePoints);
      setEditing({ set: newZonePoints, key: zoneName, fn: setZonePoints });
    }
  }, [zonePoints, setZonePoints]);
  
  const handleRemoveZone = useCallback(
    (key) => {
      console.log('remove',key,zonePoints)
      const newZonePoints = { key:[] };
      // delete newZonePoints[key];
      setZonePoints(newZonePoints);
      setError('');
      setSuccess('');
    },
    [zonePoints, setZonePoints]
  );
  

  const handleResetZone = useCallback(
    (key) => {
      console.log(key,zonePoints)
      /* handleRemoveZone()
      setTimeout(() => {
        handleRemoveZone()
      }, 500); */
    },
    [zonePoints, setZonePoints]
  );

  /* const handleSaveZones = useCallback( async ()  => {
    try { 
      const para = {
        'name':String(Math.random()),
        'region_sets':zonePoints[Object.keys(zonePoints)]
      }
      const requestBody = JSON.stringify(para)
      const endpoint = `http://10.10.80.228:8043/api/region`;

      const response = await axios.post(endpoint, requestBody, { 
      headers: {
        'Content-Type': 'application/json' 
      }
      });
      if (response.status === 200) {
        setSuccess(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  }, [camera, zonePoints]); */

  const handleSaveZones = useCallback( async ()  => {
    try { 
      const para = {
        "name":String(Math.random()),
        "region_sets":{
          "interest": [
            [
              0,
              0
            ],
            [
              1280,
              0
            ],
            [
              1280,
              720
            ],
            [
              0,
              720
            ],
          ],
          "fence": zonePoints[Object.keys(zonePoints)]
        }
      }
      const requestBody = JSON.stringify(para);
      const endpoint = `http://10.10.80.228:8043/api/region/${data.id}`;
      console.log('onSave=',requestBody,'ept=',endpoint)

      const response = await axios.put(endpoint, requestBody, { 
      headers: {
        'Content-Type': 'application/json' 
      }
      });
      if (response.status === 200) {
        setSuccess('Saved Successfully');
        console.log(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  }, [camera, zonePoints, data]);


  const handleChangeSnap = useCallback(
    (id, value) => {
      setSnap(value);
    },
    [setSnap]
  );

  return (
    <div className="flex-col">

      {success && <div className="p-4 max-h-20 text-green-500">{success}</div>}
      {error && <div className="p-4 overflow-scroll text-red-500 whitespace-pre-wrap">{error}</div>}
      
      <div className="space-y-4">
        <div className="relative">
          <img ref={imageRef} src={bgPicture} className=' rounded-md' />
          <EditableMask
            onChange={handleUpdateEditable}
            points={'subkey' in editing ? editing.set[editing.key][editing.subkey] : editing.set[editing.key]}
            scale={imageScale}
            snap={snap}
            width={width}
            height={height}
            setError={setError}
          />
        </div>
        <div className="flex-col space-y-4">
          <MaskValues
            editing={editing}
            title="Zones"
            onSave={handleSaveZones}
            onCreate={handleAddZone}
            onEdit={handleEditZone}
            onRemove={handleRemoveZone}
            onReset={handleResetZone}
            points={zonePoints}
            yamlPrefix="zones:"
            yamlKeyPrefix={zoneYamlKeyPrefix}
          />
        </div>
        <div className="max-w-xs hidden">
          <Switch checked={snap} label="Snap to edges" labelPosition="after" onChange={handleChangeSnap} />
        </div>
      </div>

      
    </div>
  );
}

function maskYamlKeyPrefix() {
  return '    - ';
}

function zoneYamlKeyPrefix(_points, key) {
  return `  ${key}:
  region_sets: `;
}

function objectYamlKeyPrefix() {
  return '        - ';
}

const MaskInset = 0;

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

function EditableMask({ onChange, points, scale, snap, width, height, setError }) {
  const boundingRef = useRef(null);

  const handleMovePoint = useCallback(
    (index, newX, newY) => {
      if (newX < 0 && newY < 0) {
        return;
      }
      const x = boundedSize(newX / scale, width, snap);
      const y = boundedSize(newY / scale, height, snap);

      const newPoints = [...points];
      newPoints[index] = [x, y];
      onChange(newPoints);
    },
    [height, width, onChange, scale, points, snap]
  );

  // Add a new point between the closest two other points
  const handleAddPoint = useCallback(
    (event) => {
      if (!points) {
        setError('You must choose an item to edit or add a new item before adding a point.');
        return
      }
      
      // const {}
      const { nativeEvent:{offsetX, offsetY} } = event;
      const scaledX = boundedSize((offsetX - MaskInset) / scale, width, snap);
      const scaledY = boundedSize((offsetY - MaskInset) / scale, height, snap);
      const newPoint = [scaledX, scaledY];
      

      const { index } = points.reduce(
        (result, point, i) => {
          const nextPoint = points.length === i + 1 ? points[0] : points[i + 1];
          const distance0 = Math.sqrt(Math.pow(point[0] - newPoint[0], 2) + Math.pow(point[1] - newPoint[1], 2));
          const distance1 = Math.sqrt(Math.pow(point[0] - nextPoint[0], 2) + Math.pow(point[1] - nextPoint[1], 2));
          const distance = distance0 + distance1;
          return distance < result.distance ? { distance, index: i } : result;
        },
        { distance: Infinity, index: -1 }
      );
      const newPoints = [...points];
      if (newPoints.length >= 4){
        setError('One danger zone can only have four points');
        return
      }else {
        newPoints.splice(index, 0, newPoint);
        onChange(newPoints);
      }
      
    },
    [height, width, scale, points, onChange, snap, setError]
  );

  const handleRemovePoint = useCallback(
    (index) => {
      const newPoints = [...points];
      newPoints.splice(index, 1);
      onChange(newPoints);
    },
    [points, onChange]
  );

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
              onMove={handleMovePoint}
              onRemove={handleRemovePoint}
              x={x + MaskInset}
              y={y + MaskInset}
            />
          ))}
      <div className="absolute inset-0 right-0 bottom-0" onClick={handleAddPoint} ref={boundingRef} />
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
            <polyline points={polylinePointsToPolyline(scaledPoints)} fill="rgba(0,98,65,0.3)"/>
          </g>
        )}
      </svg>
    </div>
  );
}

function MaskValues({
  isMulti = false,
  editing,
  title,
  onAdd,
  onSave,
  onCreate,
  onEdit,
  onRemove,
  onReset,
  points,
  yamlPrefix,
  yamlKeyPrefix,
}) {
  const [showButtons, setShowButtons] = useState(false);

  const handleMousein = useCallback(() => {
    setShowButtons(true);
  }, [setShowButtons]);

  const handleMouseout = useCallback(
    (event) => {
      const el = event.toElement || event.relatedTarget;
      if (!el || el.parentNode === event.target) {
        return;
      }
      setShowButtons(false);
    },
    [setShowButtons]
  );

  const handleEdit = useCallback(
    (event) => {
      const { key, subkey } = event.target.dataset;
      onEdit(key, subkey);
    },
    [onEdit]
  );

  const handleRemove = useCallback(
    (event) => {
      const { key, subkey } = event.target.dataset;
      onRemove(key, subkey);
    },
    [onRemove]
  );

  const handleAdd = useCallback(
    (event) => {
      const { key } = event.target.dataset;
      onAdd(key);
    },
    [onAdd]
  );

  return (
    <div className="overflow-hidden" onMouseOver={handleMousein} onMouseOut={handleMouseout}>
      <div className="flex space-x-4">
        <Button onClick={onCreate}>Add</Button>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
      <pre className="relative overflow-auto font-mono text-gray-900 min-h-18 p-2">
        {yamlPrefix}
        {Object.keys(points).map((mainkey) => {
          if (isMulti) {
            return (
              <div key={mainkey}>
                {`    ${mainkey}:\n      mask:\n`}
                {onAdd && showButtons ? (
                  <Button className="absolute -mt-12 right-0 font-sans" data-key={mainkey} onClick={handleAdd}>
                    {`Add to ${mainkey}`}
                  </Button>
                ) : null}
                {points[mainkey].map((item, subkey) => (
                  <Item
                    key={subkey}
                    mainkey={mainkey}
                    subkey={subkey}
                    editing={editing}
                    handleEdit={handleEdit}
                    handleRemove={handleRemove}
                    points={item}
                    showButtons={showButtons}
                    yamlKeyPrefix={yamlKeyPrefix}
                  />
                ))}
              </div>
            );
          }
          return (
            <Item
              key={mainkey}
              mainkey={mainkey}
              editing={editing}
              handleAdd={onAdd ? handleAdd : undefined}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
              points={points[mainkey]}
              showButtons={showButtons}
              yamlKeyPrefix={yamlKeyPrefix}
            />
          );
        })}
      </pre>
    </div>
  );
}

function Item({ mainkey, subkey, editing, handleEdit, points, showButtons, _handleAdd, handleRemove, yamlKeyPrefix }) {
  return (
    <span
      data-key={mainkey}
      data-subkey={subkey}
      className={`block hover:text-blue-400 cursor-pointer relative ${
        editing.key === mainkey && editing.subkey === subkey ? 'text-blue-800 dark:text-blue-600' : ''
      }`}
      onClick={handleEdit}
      title="Click to edit"
    >
      {/* ${yamlKeyPrefix(points, mainkey, subkey)} */`${polylinePointsToPolyline(points)}`}
      {showButtons ? (
        <Button
          className="absolute bg-red-500 top-0 right-0 hover:bg-red-700"
          color="red"
          data-key={mainkey}
          data-subkey={subkey}
          onClick={handleRemove}
        >
          Remove
        </Button>
      ) : null}
    </span>
  );
}

function getPolylinePoints(polyline) {
  console.log('getPolylinePoints')
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
function PolyPoint({ boundingRef, index, x, y, onMove, onRemove }) {
  const [hidden, setHidden] = useState(false);

  const handleDragOver = useCallback(
    (event) => {
      if (
        !boundingRef.current ||
        (event.target !== boundingRef.current && !boundingRef.current.contains(event.target))
      ) {
        return;
      }
      onMove(index, event.layerX - PolyPointRadius * 2, event.layerY - PolyPointRadius * 2);
    },
    [onMove, index, boundingRef]
  );

  const handleDragStart = useCallback(() => {
    boundingRef.current && boundingRef.current.addEventListener('dragover', handleDragOver, false);
    setHidden(true);
  }, [setHidden, boundingRef, handleDragOver]);

  const handleDragEnd = useCallback(() => {
    boundingRef.current && boundingRef.current.removeEventListener('dragover', handleDragOver);
    setHidden(false);
  }, [setHidden, boundingRef, handleDragOver]);

  const handleRightClick = useCallback(
    (event) => {
      event.preventDefault();
      onRemove(index);
    },
    [onRemove, index]
  );

  const handleClick = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  return (
    <div
      // className={`${hidden ? 'opacity-0' : ''} bg-zinc-900 rounded-full absolute z-50`}
      className={` bg-sky-700 opacity-70 rounded-full absolute z-50`}

      style={{
        top: `${y - PolyPointRadius}px`, 
        left: `${x - PolyPointRadius}px`, 
        width: '20px', 
        height: '20px',
      }}
      draggable
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
}
