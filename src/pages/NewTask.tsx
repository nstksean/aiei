import * as React from "react"
import {useState,useEffect,useRef} from 'react';

import { Ghost, Home, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSWR from "swr"
import Flatpickr from "react-flatpickr";
import { format } from 'date-fns';
import { any, z,ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { NavLink,useNavigate } from "react-router-dom";
import useNewTask from "../stores/useNewTask"
import axios from "axios";


import CameraSelect,{ cameraColumn, Cameras} from '../components/Camera/CameraSelect';
import TailBreadcrumbSecondary from '../components/Breadcrumbs/BreadcrumbSecondary';
import SelectGroupLocation from '../components/Forms/SelectGroup/SelectGroupLocation';
import NoSideBarLayout from '../layout/NoSideBarLayout';



import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from '../components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '../components/ui/textarea';
import { AspectRatio } from '../components/ui/aspect-ratio';

/* type NewTaskForm = {
  taskName:string;
  location:string;
  userNote:string
  // schedule:array;
  // cameraCheckbox:array;
  // scenarioCheckbox:array;
  // scenarioEventCheckbox:array;
} */



const NewTask = () => {
  /* state for task info */
  const [isSchedule,setIsSchedule] = useState(false)

  const [scheduleDates, setScheduleDates] = React.useState<Date>([])
  const [scheduleFrom, setScheduleFrom] = React.useState<Date>([])
  const [scheduleTo, setScheduleTo] = React.useState<Date>([])
  const [scheduleDateForVal, setScheduleDateForVal] = React.useState<Date>([])

  const [disableDays,setDisableDays] = useState<Array>([])

  const [bookDays, setBookDays] = React.useState<String>([])

  const weekDaysAndAll = ['All','Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.']

  const [cameraDatas, setCameraDatas] = React.useState<Camera>([]);
  const [chosenCamera,setChosenCamera]= React.useState({})

  const [taskDetail, setTaskDetail] = useState({})
  const [allowConfirm, setAllowConfirm] = useState(false)

  const {data : camera} = useSWR('camera')
  
  React.useEffect(() => {
      setCameraDatas(camera);
  }, [cameraDatas]); 

  function onReset(e){
    e.preventDefault()
    setScheduleFrom('')
    setScheduleTo('')
    setScheduleDates([])
    setBookDays([])
    setScheduleDateForVal([])
  }

  function onAddTimeRange(e){
    e.preventDefault()
    let timeFrom = scheduleFrom
    let timeTo = scheduleTo
    let timeRange = ''
    let timeDisable = ''
    let timeConcat = scheduleFrom.concat(scheduleTo)
    // console.log('timeFrom',timeFrom,'timeTo','timeRange',timeRange,'timeConcat',timeConcat)
    if (timeFrom.length>0 && timeTo.length>0){
      timeRange = [scheduleFrom[0],scheduleTo[0]]
      timeDisable = {from:scheduleFrom[0],to:scheduleTo[0]}
    }
    if( timeConcat.length === 0) {
      alert("Have to select at least one date") 
      return
    }else if(timeConcat.length === 2){
      setScheduleDates([timeRange,...scheduleDates])
      setBookDays([timeDisable,...bookDays])
      setScheduleDateForVal([...timeConcat,...scheduleDateForVal])
      setScheduleFrom('')
      setScheduleTo('')
    }
  }

  async function fetchCameraData(){
    try {
      const response = await fetch(
        "http://10.10.80.228:8043/api/camera",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return setCameraDatas(data);
    } catch (error) {
      console.error(`Could not get data: ${error}`);
    }
  }

  function deleteScheduleItem(dateId){
    setScheduleFrom('')
    setScheduleTo('')
    const datesAfterFilter = scheduleDates.filter((date)=>date !== dateId)
    let dayDisable = {}
    if (dateId.length>1 ){
      dayDisable = {from:dateId[0],to:dateId[1]}
    } else if(dateId.length === 1){
      dayDisable = dateId
    }
    const dayAfterFilter = bookDays.filter((day)=>{
      return JSON.stringify(day) !== JSON.stringify(dayDisable)
    })
    setScheduleDates(datesAfterFilter)
    setBookDays(dayAfterFilter)
  }

  const {configTaskDetail } = useNewTask();
  const newTaskConfigStore = useNewTask();

  React.useEffect(() => {
    console.log(newTaskConfigStore)
  }, [newTaskConfigStore.newTaskConfig]); 

  


 /*  const validationSchema: ZodType<Form> = z.object({
    taskName:z.string().min(1),
    location:z.string().min(1),
    userNote:z.string().min(1).max(255),
  })

  const {
    register,
    handleSubmit,
    formState : { errors },
  } =useForm<From>({
    resolver: zodResolver(validationSchema),
  }); */

  const [taskName,setTaskName] = useState<string>('')
  const [location,setLocation] = useState<string>('')
  const [userNote,setUserNote] = useState<string>('')



  
  // console.log('logErrors',errors) 
  function gatherTaskDetail(e){
    e.preventDefault()
    let storeData = newTaskConfigStore.newTaskConfig
    const newTaskDetailConfig = {
      scenario_id :storeData.scenario_id,
      event_type_config:storeData.event_type_config,
      name: taskName,
      user_note: userNote,
      schedule_config: scheduleDates,
      inference_config:{
        location:location,
        camera: chosenCamera.id
      }
    }
    console.log('gd',newTaskDetailConfig,newTaskConfigStore.newTaskConfig)
    setTaskDetail(newTaskDetailConfig)
    return updateStore(newTaskDetailConfig)
  };

  function updateStore(taskDetail){
    console.log('updateStore',taskDetail)
    if (taskDetail.name === null){
      console.log('no data')
      return checkTaskDetail(taskDetail)
    }else if (taskDetail.name !== null){
      newTaskConfigStore.configTaskDetail(taskDetail)
      console.log('set data')
      return checkTaskDetail(taskDetail)
    }
  }

  function checkTaskDetail(taskDetail){
    if (taskDetail.scenario_id !== null && taskDetail.name.length >0 ){
      setAllowConfirm(true)
      console.log('check_PASS')
    }else{
      setAllowConfirm(false) 
      console.log('check_FAIL')
    }
  }
  function onCancelClick(){
  }

  /* button component */
  function CancelButton(
    handleCancelClick
  ){
    const navigate = useNavigate()
    function handleCancelClick() {
      navigate("/Tables")
    }
    return(
      <Button 
      onClick={handleCancelClick}
      className={"m-4 bg-primary"}
      >
        Back to Tables
      </Button>
    );
  }
  /* button component */
  const onSubmit = (e) =>{
    const postInferenceJobUrl = 'http://10.10.80.228:8043/api/inference_job';
    const taskBody = newTaskConfigStore.newTaskConfig
    const taskBodyJson = JSON.stringify(taskBody)
    axios.post(postInferenceJobUrl,taskBodyJson , { 
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(function (response) {
      console.log(response.status)
      if(Number(response.status) == 201){
        alert("success")
      }else{
        console.log('fail',response.status)

      }
    })
    .catch(function (error) {
      console.log(error);
    });
    e.preventDefault() 
  }
  return (
    <NoSideBarLayout>
      <TailBreadcrumbSecondary pageName='New Task' fontPageName='Select Scenarions'/>
      <form /* action='/Tables' onSubmit={onSubmit} */>
      <div className="grid grid-cols-1 gap-5 mb-5 sm:grid-cols-2">
        <div className="flex flex-col gap-5">
          {/* <!-- main task Form --> */}
          <div className="rounded-sm border border-stroke bg-slate-50 shadow-default overflow-y-scroll h-95 dark:border-strokedark dark:bg-boxdark">
              <div className="p-4">
                <div className="mb-4 flex flex-col gap-4">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white" htmlFor='taskName'>
                    Task Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke py-3 px-5 text-black outline-none transition bg-white focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      id='taskName'
                      onInput={(e)=>(setTaskName(e.target.value))}
                      // {...register('taskName')}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label htmlFor='location' className="mb-2.5 block text-black dark:text-white">
                    Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter task location"
                      className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      id='location'
                      onInput={(e)=>(setLocation(e.target.value))}
                      // {...register('location')}
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white" htmlFor='userNote'>
                      User Note
                    </label>
                    <Textarea 
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary'
                    placeholder="Type your user note here." 
                    id="userNote" 
                    maxLength={255}
                    onInput={(e)=>(setUserNote(e.target.value))}
                    // {...register('userNote')}
                    />
                  </div>
                  
                </div>
              </div>
          </div>

          {/* <!-- schedule Form --> */}
          <div className="rounded-sm border h-[470px] border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
            <CameraSelect 
            columns={cameraColumn} 
            data={cameraDatas} 
            fetchCameraData={fetchCameraData}
            choseCamera = {setChosenCamera}/>
          </div> 
        </div>

        <div className="flex flex-col gap-5 ">
          {/* <!-- schedule Form --> */}
          <div className="rounded-sm border h-95 border-stroke shadow-default flex flex-col dark:border-strokedark dark:bg-boxdark">
            <div className="p-4">
            <label className="mb-2.5 block text-black dark:text-white">
              Schedule
            </label>
          <div className=' w-full text-center flex-col '>
            {/* date picker */}
            <div className={"flex my-2  justify-event "}>
              <label className='mx-4' htmlFor="scheduleFrom">From:</label>
              <Flatpickr
                className={'w-2/4 min-w-32 border pl-4'}
                value={scheduleFrom}
                placeholder={'Select a date'}
                options={{
                  enableTime: true,
                  altInput:true,
                  altFormat:'Y-m-d',
                  maxTime: "00:00",
                  minDate:'today',
                  maxDate:'2024-12-12',
                  dateFormat: "Z",
                  mode: "single",
                  disable: bookDays,
                  onChange: function(selectedDates, dateStr, instance) {
                    setScheduleFrom(selectedDates)
                  },
                  onOpen:function(){
                    scheduleFrom? setScheduleFrom('') : false
                  }
                  }}
                />
                <label className='mx-4' htmlFor="scheduleFrom">00:00</label>
            </div>
            {/* date picker */}
            <div className={"flex my-2  justify-event "}>
              <label className='mx-4 ' htmlFor="scheduleTo">To:</label>
              <Flatpickr
                id='scheduleTo'
                className={'w-2/4 min-w-32 border ml-5 pl-4'}
                value={scheduleTo}
                placeholder={'Select a date'}
                options={{
                  enableTime: true,
                  altInput:true,
                  altFormat:'Y-m-d',
                  minTime: "23:59",
                  minDate:'today',
                  maxDate:'2024-12-12',
                  dateFormat: "Z",
                  mode: "single",
                  disable: bookDays,
                  onChange: function(selectedDates, dateStr, instance) {
                    setScheduleTo(selectedDates)
                  },
                  onOpen:function(){
                    scheduleTo? setScheduleTo('') : false
                  }
                }}
                />
              <label className='mx-4 ' htmlFor="scheduleTo">23:59</label>
            </div>
            <div className="w-11/12 mx-auto flex">Schedules:</div>
            <ul className={'flex-col h-40 min-w-52 overflow-y-scroll w-4/5 bg-green-50 mx-auto'}>
            {scheduleDates.map((date) => (
              <li className='mt-2 w-fullf flex text-center align-middle justify-center' key={date}>
                <p>{`${format(date[0],'yyyy/MM/dd')+'-'+format(date[1],'yyyy/MM/dd')}`}</p>
                <Button variant='outline' size="icon" className="w-6 h-6 ml-1" onClick={()=>deleteScheduleItem(date)}>
                  <X className="p-0" />
                </Button>
              </li>
            ))}
            </ul>
            <div className={"flex my-2  justify-event "}>
              <Button 
                className='w-12 py-2 px-2 mx-2 lg:px-4 xl:px-4' 
                variant=''
                onClick={onAddTimeRange}
                >set</Button>
                <Button 
                className='w-12 py-2 px-2 mx-2 lg:px-4 xl:px-4' 
                variant=''
                onClick={(e)=>onReset(e)}
                >reset
                </Button>
            </div>
          </div>
            
          <div className='py-3 hidden'>
            <label
              htmlFor="toggle1"
              className="flex cursor-pointer select-none items-center"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggle1"
                  className="sr-only"
                  onChange={() => {
                    setIsSchedule(!isSchedule);
                  }}
                />
                <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                <div
                  className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                    !isSchedule && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
                  }`}
                ></div>
              </div>
                  <p className='px-2'>Is task schedule？</p>
            </label>
            {/* time picker */}
            <div className={'grid grid-cols-3 gap-2 my-2 ease-in-out duration-500 overflow-hidden '+`${isSchedule && 'h-0'}`}>
              {
                weekDaysAndAll.map((weekDay)=>(
                  <div key={weekDay} className='inline-block'>
                    <Checkbox id={weekDay} className='mx-1'/>
                    <label
                    htmlFor={weekDay}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      { weekDay}
                    </label>
                  </div>
                ))
              }
              
            
            </div>
          </div>

          </div>
          </div>
          <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Video
              </h3>
            </div>
            <div className='w-full'>
              <AspectRatio ratio={16/9} className='bg-slate-500'>
              </AspectRatio>
            </div>
          </div>
            <div className="flex justify-between">
              <Button 
              className="m-4 bg-primary"
              onClick={(e)=>gatherTaskDetail(e)}
              type="button"
              >Config</Button>
              <Button 
              className="m-4 bg-primary"
              disabled={!allowConfirm}
              onClick={(e)=>onSubmit(e)}
              type="submit"
              >Submit</Button>
              <CancelButton handleCancelClick={onCancelClick}></CancelButton>
            </div>
        </div>
      </div>
      </form>
      
    </NoSideBarLayout>
  );
};

export default NewTask;
