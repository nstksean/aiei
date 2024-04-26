import * as React from "react"
import {useState,useEffect,useRef} from 'react';

import { Link } from 'react-router-dom';
import useSWR from "swr"

import TailBreadcrumb from '../components/Breadcrumbs/Breadcrumb';
import NoSideBarLayout from '../layout/NoSideBarLayout';

import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';
import EventList, { eventListColumn } from "../components/TaskInfo/EventList";

const TaskInfo = ()=>{
  const [taskInfos, setTaskInfos] = useState<Scenarios>([]);
  const { data:inferenceJobs }=useSWR('inference_job')
  useEffect(() => {
    setTaskInfos(inferenceJobs);
  }, [taskInfos]); 
  console.log(taskInfos)

  return (
    <NoSideBarLayout>
      <TailBreadcrumb pageName='Task Information'/>
      <div className="gap-5 overflow-y-scroll grid grid-cols-1 sm:grid-cols-3">
        <div className=" h-full bg-white px-5 py-2 shadow-default rounded-md overflow-hidden border border-stroke col-span-1 sm:col-span-2">

          <div className='w-full max-h-[500px] min-h-[300px]'>
              <AspectRatio ratio={16/9} className='bg-slate-500 max-h-[500px] min-h-[300px]'>
              </AspectRatio>
          </div>
          <div className="flex max-h-[50svh] min-h-[300px] my-5 gap-2">
            <div className="w-1/3 border flex-col  border-stroke">
              <p className="font-medium text-black p-2 border-b text-primary">Task Information</p>
              <ul>

              </ul>
            </div>
            <div className="w-1/3 border border-stroke">
              <p className="font-medium text-black p-2 border-b text-primary">Camera Information</p>
              <ul>
                
              </ul>
            </div>
            <div className="w-1/3 border border-stroke">
              <p className="font-medium text-black p-2 border-b text-primary">Schedule Information</p>
              <ul>
                
              </ul>
            </div>
          </div>
        </div>
        <div className=" h-full bg-white px-5 py-2 shadow-default rounded-md overflow-hidden border border-stroke col-span-1 sm:col-span-1">
          <EventList
          data={taskInfos}
          columns={eventListColumn}
          ></EventList>
        </div>
      </div>
    </NoSideBarLayout>
)};
export default TaskInfo;
