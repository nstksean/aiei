import * as React from "react"
import {useState,useEffect} from 'react';

import { Calendar, CalendarRange, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSWR from "swr"
import Flatpickr from "react-flatpickr";
import { format } from 'date-fns';

import SelectGroupOne from '../components/Forms/SelectGroup/SelectGroupOne';
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
import {DatePickerDemo} from '../components/Forms/DatePicker/DayPickerCn'
import { Button } from '../components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '../components/ui/textarea';
import { AspectRatio } from '../components/ui/aspect-ratio';



const NewTask = () => {
  const [isSchedule,setIsSchedule] = useState(false)

  const [scheduleDates, setScheduleDates] = React.useState<Date>([])
  const [inputValue, setInputValue] = React.useState<Date>([])
  const [bookDays, setBookDays] = React.useState<String>([])
  const weekDaysAndAll = ['All','Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.']

  const [cameraDatas, setCameraDatas] = React.useState<Camera>([]);

  const {data : camera} = useSWR('camera')
  console.log(camera)
  React.useEffect(() => {
      setCameraDatas(camera);
  }, [cameraDatas]);  


  function onReset(){
    setScheduleDates([])
    setInputValue([])
    setBookDays([])
    e.preventDefault()
  }

  function onAddTimeRange(e){
    e.preventDefault()
    if(inputValue.length === 0) return alert("date Can't be null")
    let newDates = [...scheduleDates,inputValue];
    setScheduleDates(newDates)
    console.log('setScheduleDates',scheduleDates)
    setInputValue('')
    let flatDate = scheduleDates.flat()
    let formatDate = []
    flatDate.forEach((date)=>{
      formatDate.push(format(date,"yyyy-MM-dd"))
    })
    // scheduleDates.value
    setBookDays(formatDate)
  }


  return (
    <NoSideBarLayout>
      <TailBreadcrumbSecondary pageName='New Task' fontPageName='Select Scenarions'/>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-5 bg-red-200">
          {/* <!-- main task Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white" htmlFor='taskName'>
                    Task Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      id='taskName'
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label htmlFor='location' className="mb-2.5 block text-black dark:text-white">
                    Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter task location"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      id='location'
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white" htmlFor='userNote'>
                      User Note
                    </label>
                    <Textarea 
                    className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary'
                    placeholder="Type your user note here." 
                    id="userNote" 
                    maxLength={255}
                    />

                  </div>
                  <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Schedule
                  </label>
                <div className=' w-full text-center flex'>
                  <Flatpickr
                  className={'w-2/4 min-w-52 border '+`${scheduleDates.length>0 ? 'hidden':''}`}
                  value={inputValue}
                  placeholder={'  Select a range of date'}
                  disabled={scheduleDates.length>0 ? 'disabled':''}
                  options={{
                    minDate:'today',
                    maxDate:'2024-12-12',
                    dateFormat: "Y-m-d",
                    mode: "range",
                    disable: bookDays,
                    onChange: function(selectedDates, dateStr, instance) {
                      setInputValue(selectedDates)
                    },
                  }}
                  />
                  <ul className={'inline-block w-2/4 min-w-52 '+`${scheduleDates.length>0 ? '':'hidden'}`}>
                  {scheduleDates.map((todo, index) => (
                    <li className='mt-2' key={index}>
                      {format(todo[0],"yyyy-MM-dd")}
                      ~
                      {format(todo[1],"yyyy-MM-dd")}
                      </li>
                  ))}
                  </ul> 
                  <Button 
                  className='w-12 py-2 px-2 mx-2 lg:px-4 xl:px-4' 
                  variant=''
                  onClick={onAddTimeRange}
                  >set</Button>
                  <Button 
                  className='w-12 py-2 px-2 mx-2 lg:px-4 xl:px-4' 
                  variant=''
                  onClick={onReset}
                  >reset</Button>
                </div>
                {/* schedule tab */}
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
              </div>
            </form>
          </div>

          {/* <!-- schedule Form --> */}
          <div className="rounded-sm border border-stroke bg-yellow-200 shadow-default dark:border-strokedark dark:bg-boxdark">
            <CameraSelect 
            columns={cameraColumn} 
            data={cameraDatas}/>
          </div>
        </div>

        <div className="flex flex-col gap-5 bg-blue-200">
          {/* <!-- schedule Form --> */}
          <div className="rounded-sm border border-stroke bg-green-100 shadow-default dark:border-strokedark dark:bg-boxdark">
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

          {/* <!-- Sign Up Form --> */}
          <div className="rounded-sm border border-stroke bg-indigo-100 shadow-default dark:border-strokedark dark:bg-boxdark">
            
          </div>
        </div>
      </div>
    </NoSideBarLayout>
  );
};

export default NewTask;
