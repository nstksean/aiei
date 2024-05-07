import * as React from "react"
import {useState,useEffect,useRef} from 'react';

import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import useSWR from "swr"
import {format, intervalToDuration } from 'date-fns'

import TailBreadcrumb from '../components/Breadcrumbs/Breadcrumb';
import NoSideBarLayout from '../layout/NoSideBarLayout';

import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';
import EventList, { eventListColumn } from "../components/TaskInfo/EventList";
import StreamVideo from "./StreamVideo";
import Loader from "../common/Loader";
import JSMpegPlayer from "../components/Videos/JSMpegPlayer";
  
const TaskDetailCard = (data) => {
  const [taskDetail, setTaskDetail] = useState('')  

  useEffect(() => {
    setTaskDetail(data.data)

  }, [taskDetail,data])
  
  
  return(
    <div className="w-1/3 block rounded-lg bg-white text-center text-surface shadow-secondary-2 overflow-auto">
      <div className="border-b-2 border-neutral-100 px-6 py-3 text-zinc-50 bg-primary font-semibold text-lg">
        Task Information
      </div>
      {<ul className="p-4 overflow-x-clip">
        <li className="mb-4">
          <p className="text-primary text-base font-medium leading-tight mb-1">Task Name </p>
          <p className="text-zinc-600 text-base">{taskDetail?.name}</p>
        </li>
        <li className="mb-4">
          <p className="text-primary text-base font-medium">Last Update </p>
          <p className="text-zinc-600 text-base">{String(taskDetail.last_edit_time).split('T',1)[0]}</p>
        </li>
        <li className="mb-4">
          <p className="text-primary text-base font-medium">Scenario </p>
          <p className="text-zinc-600 text-base">{taskDetail?.scenario?.caption}</p>
        </li>
        <li className="mb-4">
          <p className="text-primary text-base font-medium">Event Type </p>
          {taskDetail?.event_type_config?.map((type)=>(
          <div key={type.name}>
            <p className="text-zinc-600 text-base">{type.name}</p>
          </div>
          ))
          }
        </li>
      </ul>}
    </div>

)};

const CameraCard = (data) => {
  const [cameras, setCameras] = useState([])  
  useEffect(() => {
    setCameras(data.data.camera)
  }, [cameras,data])
  
  return(
    <div className="w-1/3 block rounded-lg bg-white text-center shadow-secondary-2 overflow-auto">
      <div className="border-b-2 border-neutral-100 p-3 bg-sky-700  text-lg text-zinc-50 font-semibold">Camera Information</div>
      {cameras.length >0 ? 
      cameras.map((camera)=>(
        <div key={camera.id} className="flex justify-center my-4 mx-2 overflow-hidden rounded-lg shadow min-h-[180px]">
          <div className="block rounded-lg  border-primary bg-white w-full">
            <div className="p-2 ">
              <div className="mb-2 pb-2 text-lg font-medium leading-tight text-sky-700 border-b-2 border-neutral-100">
                {camera.name}
              </div>
              <p className="text-sky-700 text-base font-medium leading-tight mb-1">Description </p>
              <p className="text-base text-zinc-600 ">
                {camera.description}
              </p>
              <p className="text-sky-700 text-base font-medium leading-tight mb-1">Location </p>
              <p className="text-base text-zinc-600 ">
                {camera.location}
              </p>
              <p className="text-sky-700 text-base font-medium leading-tight mb-1">Streaming </p>
              <p className="text-base text-zinc-600 ">
                {camera.RTSP}
              </p>
            </div>
          </div>
        </div>
      )) : <div>{'Pleas Bonding Camera First'}</div>
      }
      
    </div>

)};

const ScheduleCard = (data) => {
  const [schedules, setSchedules] = useState([])
  useEffect(() => {
    setSchedules(data.data.schedule_config)
  }, [schedules,data])
  
  return(
    <div className="w-1/3 block rounded-lg bg-white text-center shadow-secondary-2 overflow-auto">
      <div className="border-b-2 border-neutral-100 p-3 bg-p1805 font-semibold text-zinc-50 text-lg">Schedule Information</div>
      {schedules.length > 0 ?
      schedules?.map((schedule)=>(
        <div key={Math.random()} className="flex justify-center my-4 mx-2 overflow-hidden rounded-lg shadow ">
          <div className="block rounded-lg  border-primary bg-white w-full">
            <div className="p-2 ">
              <div className="mb-2 pb-2 text-base font-medium leading-tight text-p1805 border-b-2 border-neutral-100">
              Operation Time
              </div>
              <p className="text-p1805 text-lg font-medium leading-tight mb-1">
                {intervalToDuration({
                  start: new Date(schedule[0]),
                  end: new Date(schedule[1])}
                  ).days ? 
                  intervalToDuration({
                    start: new Date(schedule[0]),
                    end: new Date(schedule[1])}
                    ).days + ' Days ' : ''
                }
                {intervalToDuration({
                  start: new Date(schedule[0]),
                  end: new Date(schedule[1])}
                  ).hours ? 
                  intervalToDuration({
                    start: new Date(schedule[0]),
                    end: new Date(schedule[1])}
                    ).hours + 1 + ' hours ' : ''
                }
              </p>
              <p className="text-zinc-700 text-base font-medium leading-tight mb-1">{String(schedule[0]).split('T',1)[0] + ' ~ '+ String(schedule[1]).split('T',1)[0]}</p>
            </div>
          </div>
        </div>
      )) :
      <div className="flex justify-center h-2/3">
        <div className="text-zinc-700 m-auto">This Task Always Running</div>
      </div>
      }
      
    </div>

)};

const CardLoader = () => {  
  return(
    <div className="h-full w-full">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  )};


const TaskInfo = ()=>{
  const [taskInfos, setTaskInfos] = useState([]);
  const [taskDInfos, setTaskDInfos] = useState([]);
  const [ events, setEvents] = useState([]);
  
  const params = useParams()
  const id = params.taskId
  const { data:taskD, error, isLoading } = useSWR(`inference_job/${id}`)
  const {data:eventById,error:eventError,isLoading:eventIsLoading , mutate:eventListMutate} = useSWR(`event/get_by_inference_job/${id}`,{ refreshInterval: 5000 })
  const reloadCount = sessionStorage.getItem('reloadCount');
  
  useEffect(() => {
    if(reloadCount < 1) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
    return () => {
    }
  }, [])
  
    console.log('events',events)
  
  
  useEffect(() => {
    setEvents(eventById);    
    return ()=>{
    }
  }, [eventById]); 
  
  
  return (
    <NoSideBarLayout>
      <TailBreadcrumb pageName='Task Information'/>
      <div className="gap-5 overflow-y-scroll grid grid-cols-1 sm:grid-cols-3 ">
        <div className="bg-zinc-100 h-full bg-white p-5 shadow-default rounded-md overflow-hidden border border-stroke col-span-1 sm:col-span-2">

          <div className='w-full max-h-[500px] min-h-[300px]'>
              <AspectRatio ratio={16/9} className='bg-slate-500 max-h-[500px] min-h-[300px] flex justify-center rounded-md overflow-hidden'>
                <StreamVideo></StreamVideo>
              </AspectRatio>
          </div>
          
          <div className="flex max-h-[50svh] min-h-[300px] my-5 gap-2">
            {isLoading? <div className="w-1/3"><CardLoader/></div> : <TaskDetailCard data={taskD}/>}
            {isLoading? <div className="w-1/3"><CardLoader/></div> : <CameraCard data={taskD}/>}
            {isLoading? <div className="w-1/3"><CardLoader/></div> : <ScheduleCard data={taskD}/>}
          </div>
        </div>
        <div className=" h-full bg-white px-5 py-2 shadow-default rounded-md overflow-hidden border border-stroke col-span-1 sm:col-span-1">
          <EventList
          data={events}
          columns={eventListColumn}
          refresh = {eventListMutate}
          ></EventList>
        </div>
      </div>
    </NoSideBarLayout>
)};
export default TaskInfo;
