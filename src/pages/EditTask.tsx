import * as React from "react"
import {useState,useEffect,useRef} from 'react';

import { Ghost, Home, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import useSWR from "swr"
import Flatpickr from "react-flatpickr";
import { format } from 'date-fns';
import { NavLink,useNavigate } from "react-router-dom";
import useEditTask from "../stores/useEditTask"
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


const EditTask = () => {
  /* state for task info */
  const urlParams  = useParams()
  const id = urlParams.taskId
  const {data:taskInfoById,error,isLoading} = useSWR('/inference_job/'+`${id}`)

  useEffect(() => {
    if(!isLoading){
      const locationCheck = taskInfoById.inference_config.location || '';
      const scheduleCheck = taskInfoById.schedule_config || [];
      
      setTaskName(taskInfoById.name)
      setLocation(locationCheck)
      setUserNote(taskInfoById.user_note)
      setScheduleDates(scheduleCheck)

      const formattedScheduleToDisable = scheduleCheck.map((item)=>{
        return{
          from:item[0],
          to:item[1]
        }
      })
      setBookDays(...bookDays,formattedScheduleToDisable)
    }
  }, [taskInfoById])
  
  const [scheduleDates, setScheduleDates] = React.useState<Date>([])
  const [scheduleFrom, setScheduleFrom] = React.useState<Date>([])
  const [scheduleTo, setScheduleTo] = React.useState<Date>([])
  const [scheduleDateForVal, setScheduleDateForVal] = React.useState<Date>([])

  const [bookDays, setBookDays] = React.useState<String>([])

  const [cameraDatas, setCameraDatas] = React.useState<Camera>([]);
  const [chosenCamera,setChosenCamera]= React.useState({})

  const [taskDetail, setTaskDetail] = useState({})

  const [allowConfirm, setAllowConfirm] = useState(false)

  const [taskName,setTaskName] = useState<string>('')
  const [location,setLocation] = useState<string>('')
  const [userNote,setUserNote] = useState<string>('')

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
  
  const editStore = useEditTask()

  /*put schema {
    "name": "string",
    "user_note": "string",
    "schedule_config": "string",
    "event_type_config": "string",
    "inference_config": "string"
  } */
  function gatherTaskDetail(e){
    e.preventDefault()
    const taskAfterEdit = {
      name: taskName,
      user_note: userNote,
      schedule_config: scheduleDates,
      event_type_config:[{
          "description": "this is first eventtype",
          "id": 1,
          "name": "First EventType"
        }],
      inference_config:{
        location:location,
        camera: '1'
      }
    }
    const taskAfterEditJson = JSON.stringify(taskAfterEdit)
    return updateStoreCheckSubmit(taskAfterEdit)
  };

  function updateStoreCheckSubmit(taskDetail){
    if (String(taskDetail.name) === '' 
    || String(taskDetail.user_note) === '' 
    || String(taskDetail.schedule_config) === '' 
    || String(taskDetail.inference_config.location) === ''
    || String(chosenCamera) === '' ){
      console.log('wrong data')
      setAllowConfirm(false)
    }else if (String(taskDetail.name).length > 0 
    || String(taskDetail.user_note).length > 0 
    || String(taskDetail.schedule_config).length > 0
    || String(taskDetail.inference_config.location).length > 0 
    || String(chosenCamera).length >0 ){
      editStore.editTaskDetail(taskDetail)
      setAllowConfirm(true)
      console.log('set data')
    }
  }

  /* button component */
  function CancelButton(
    handleCancelClick
  ){
    const navigate = useNavigate()
    function handleCancelClick() {
      navigate("/")
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
     
    const InferenceJobUrl = 'http://10.10.80.228:8043/api/inference_job/';
    const InferenceWithIdUrl = InferenceJobUrl+`${id}`
    const taskBody = editStore.editTaskConfig
    const taskBodyJson = JSON.stringify(taskBody)
    axios.put(InferenceWithIdUrl,taskBodyJson , { 
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(function (response) {
      console.log(response.status)
    })
    .catch(function (error) {
      console.log(error);
    });
    e.preventDefault()
  }

  return (
    <NoSideBarLayout>
      <TailBreadcrumbSecondary pageName='Edit Task' fontPageName='Select Scenarios'/>
      <form action='/' /* onSubmit={onSubmit} */>
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
                      value={taskName}
                      onInput={(e)=>(setTaskName(e.target.value))}
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
                      value={location}
                      onInput={(e)=>(setLocation(e.target.value))}
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
                    value={userNote}
                    onInput={(e)=>(setUserNote(e.target.value))}
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
                    setScheduleFrom(selectedDates);
                    instance.close();
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
                    setScheduleTo(selectedDates);
                    instance.close();
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
            {(scheduleDates.length >0) ?
            scheduleDates?.map((date) => (
              <li className='mt-2 w-fullf flex text-center align-middle justify-center' key={date}>
                <p>{`${format(date[0],'yyyy/MM/dd')+'-'+format(date[1],'yyyy/MM/dd')}`}</p>
                <Button variant='outline' size="icon" className="w-6 h-6 ml-1" onClick={()=>deleteScheduleItem(date)}>
                  <X className="p-0" />
                </Button>
              </li>
            )) :
            'No Schedule Yet.'
          }
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
                >
                  <NavLink to={id ? `/taskinfo/${id}` : '/'}>
                  Submit
                  </NavLink>
              </Button>
              <CancelButton handleCancelClick={()=>(navToTable())}></CancelButton>
            </div>
        </div>
      </div>
      </form>
      
    </NoSideBarLayout>
  );
};

export default EditTask;
