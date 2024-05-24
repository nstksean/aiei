import {useEffect,useState}from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

import useNewTask from "../../stores/useNewTask"

const NNCard = ()=>{
  return(
  <div className=" block rounded-lg bg-white  text-surface shadow-secondary-2 overflow-auto">
    <div className="text-base  text-primary font-medium" >
      <h2 className="text-lg text-zinc-500 font-semibold py-1">{'Inputs ：'}</h2>
      <p>{'Image, name: '}<br/>
        <code className="">
          <span className=" bg-slate-100  text-red-500"> {' image '} </span>
          </code><br/>
          {', shape: '} 
        <code className=" ">
          <span className=" bg-slate-100  text-red-500">{' 1, '}</span> 
          <span className=" bg-slate-100  text-red-500">{'3,'}</span> 
          <span className=" bg-slate-100  text-red-500">{' 720, '}</span> 
          <span className=" bg-slate-100  text-red-500">{' 1280 '}</span>
          </code><br/>
          {' in the format '} 
        <code className=" ">
          <span className=" bg-slate-100  text-red-500">{' B, '}</span> 
          <span className=" bg-slate-100  text-red-500">{' C, '}</span> 
          <span className=" bg-slate-100  text-red-500">{' H, '}</span> 
          <span className=" bg-slate-100  text-red-500">{' W '}</span>
        </code>
        {' , where: '}
      </p>
      <ul className=" ">
      <li><p><code className=" "><span className=" bg-slate-100  text-red-500">{' B '}</span></code>{' - batch size'}</p></li>
      <li><p><code className=" "><span className=" bg-slate-100  text-red-500">{' C '}</span></code>{' - number of channels'}</p></li>
      <li><p><code className=" "><span className=" bg-slate-100  text-red-500">{' H '}</span></code>{' - image height'}</p></li>
      <li><p><code className=" "><span className=" bg-slate-100  text-red-500">{' W '}</span></code>{' - image width'}</p></li>
      </ul>
      <p>{'Expected color order is '}
        <code className=" ">
          <span className="bg-slate-100  text-red-500 ">{' BGR '}</span>
        </code>.
      </p>
    </div>
    <div className="text-base  text-primary font-medium ">
      <h2 className="text-lg text-zinc-500 font-semibold py-1">{'Outputs ：'}</h2>
      <ol className="pb-2">
      <li><p >{'The'} 
        <code className=" "><span className=" bg-slate-100  text-red-500 ">{' boxes '}</span></code>
        {' is a blob with the shape '}
        <code className="">
          <span className="bg-slate-100  text-red-500  ">{' 100, '}</span> 
          <span className=" bg-slate-100  text-red-500 ">{' 5 '}</span>
        </code>
        {' in the format '}
        <code className=" ">
          <span className=" bg-slate-100  text-red-500 ">{' N, '}</span> 
          <span className="bg-slate-100  text-red-500  ">{' 5 '}</span></code>
        {', where '}
        <code className=" ">
          <span className=" bg-slate-100  text-red-500 ">{' N '}</span>
        </code> 
        {'is the number of detected bounding boxes.'}<br/>
        {'For each detection, the description has the format:'}
          <code className="  "><span className=" bg-slate-100  text-red-500">{'[ x_min '}</span></code>{', '} 
          <code className="  "><span className=" bg-slate-100  text-red-500">{' y_min '}</span></code>{', '}
          <code className="  "><span className=" bg-slate-100  text-red-500">{' x_max '}</span></code>{', '}
          <code className="  "><span className=" bg-slate-100  text-red-500">{' y_max '}</span></code>{', '}
          <code className="  "><span className=" bg-slate-100  text-red-500">{' conf ]'}</span></code>
          {', where:'}</p>
      <ul className=" ">
      <li><p>(<code className="  "><span className=" bg-slate-100  text-red-500">{' x_min '}</span></code>{', '}
              <code className="  "><span className=" bg-slate-100  text-red-500">{' y_min '}</span></code>)
              {' - coordinates of the top left bounding box corner'}
      </p></li>
      <li><p>(<code className="  "><span className=" bg-slate-100  text-red-500">{' x_max '}</span></code>{', '}
      <code className="  "><span className=" bg-slate-100  text-red-500">{' y_max '}</span></code>) 
      {' - coordinates of the bottom right bounding box corner.'}
      </p></li>
      <li><p><code className="  "><span className=" bg-slate-100  text-red-500">{' conf '}</span></code>{' - confidence for the  dicted className'}</p></li>
      </ul>
      </li>
      <li><p>{'The'} 
        <code className="  "><span className=" bg-slate-100 text-red-500">{' labels '}</span></code>
        {' is a blob with the shape '}
        <code className="  "><span className=" bg-slate-100  text-red-500">{' 100 '}</span></code> 
        {' in the format '}
        <code className="  "><span className=" bg-slate-100  text-red-500">{' N '}</span></code>
        {', where '}
        <code className="  "><span className="bg-slate-100  text-red-500 ">{' N '}</span></code> 
        {'is the number of detected bounding boxes. In case of person detection, it is equal to '}
        <code className="  "><span className=" bg-slate-100  text-red-500">{' 1 '}</span></code> 
        {'for each detected box with person in it and '}
        <code className="  "><span className=" bg-slate-100  text-red-500">{' 0 '}</span></code> 
        {'for the background.'}
      </p></li>
      </ol>
    </div>
  </div>

)}

export default function ScenarioCard({
  chosenRow,
}) {
  const { newTaskConfig,configScenario } = useNewTask();
  const newTaskConfigStore = useNewTask();

  const [chosenScenario, setChosenScenario] = useState({})
  const [taskConfig_scenario, setTaskConfig_scenario] = useState({
    scenario_id: null,
    event_type_config: null
  })
  const [allowNext, setAllowNext] = useState(false)

  useEffect(() => {
    setChosenScenario(chosenRow)
    return()=>console.log(chosenScenario)
  }, [chosenRow])

  let scenarioId = chosenScenario?.id ? chosenScenario.id : " "
  let scenarioTitle = chosenScenario?.caption ? chosenScenario.caption : "Select A Scenario on The Left"
  let scenarioIntro = chosenScenario?.description ? chosenScenario.description : " "
  let scenarioNN = chosenScenario?.nn_arch ? chosenScenario.nn_arch : ''
  let eventTypes = chosenScenario?.event_type ? chosenScenario.event_type : []

  function gatherTaskConfig(){
    const newTaskConfig = {
      scenario_id:chosenScenario?.id ? chosenScenario.id : null,
      event_type_config:chosenScenario?.event_type ? chosenScenario.event_type : []
    }
    setTaskConfig_scenario(newTaskConfig)
    return updateStore(newTaskConfig)
    };

  function onNextClick(){
    ()=>handleNextClick()
  }

  function updateStore(newTaskConfig){
    if (newTaskConfig.scenario_id === null){
      console.log('no data')
      return
    }else if (Number.isInteger(newTaskConfig.scenario_id)){
      newTaskConfigStore.configScenario(newTaskConfig)
      console.log('set data')
    }
  }

  function checkTaskConfig(){
    if (taskConfig_scenario.scenario_id !== null && taskConfig_scenario.event_type_config.length >0 ){
      setAllowNext(true)
      console.log('check_PASS')
    }else{
      setAllowNext(false) 
      console.log('check_FAIL')
    }
  }

  useEffect(() => {
    checkTaskConfig()
  }, [taskConfig_scenario,allowNext])

  /* button component */
  function NextButton(
    disabled={allowNext},
    handleNextClick
  ){
    const navigate = useNavigate()
    function handleNextClick() {
      navigate("/newtask");
    }
    return(
      <Button 
            onClick={handleNextClick}
            className={"inline-flex items-center justify-center rounded-md bg-meta-3 py-2 px-2 text-center font-medium text-white hover:bg-opacity-80 lg:px-4 xl:px-4 2xl:px-6"}
            disabled = {!allowNext}
            >Next
      </Button>
    );
  }
  /* button component */

    return(
      <div className="border border-stroke overflow-y-auto basis-3/5 h-full bg-slate-50 shadow-default rounded-md max-h-[740px] min-h-[360px] flex flex-col justify-between px-5 pt-2">
        {/* Scenario intro */}
        <div className="flex flex-col text-clip">
          <p className="text-base  text-sky-700 font-medium my-1">Scenario ID：{scenarioId}</p>
          <p className="text-2xl  text-primary font-medium my-1">{scenarioTitle}</p>
          <p className="text-base  text-primary font-medium my-1">
            introduction：
          </p>
          <p className="text-base  text-zinc-700 font-medium mt-1" >
            {scenarioIntro}
          </p>
        </div>
        {/* nn and event */}
        <div className=" rounded-md overflow-y-auto max-h-[580px] min-h-96 flex gap-2 my-2">
          <div className="basis-2/3 shadow-default bg-white p-2 flex flex-col overflow-y-auto">
            <p className="text-base  text-sky-700 font-medium bg-white mb-1 shadow-default">Pipeline Information</p>
            <p className="text-base text-zinc-700 font-bold bg-white py-1">NN：{scenarioNN}</p>
            {scenarioNN? <NNCard/> : ''}
          </div>
          <div className="basis-1/3  shadow-default bg-white p-2 flex flex-col overflow-y-auto">
            <p className="text-base  text-sky-700 font-medium bg-white mb-1 shadow-default">Event:</p>
            
              {/* Event container */}
              <div className="flex flex-col gap-2 bg-white shadow-default">
                {/* single event */}
                  { (eventTypes === undefined || eventTypes?.length === 0 ) ? (
                    <div >{''}</div>
                    ) : (
                    eventTypes.map((eventType)=>(
                      <div className="flex space-x-2 p-2" key={eventType.id}>
                        <Checkbox id={eventType.id} />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={eventType.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {eventType.name}
                        </label>
                        </div>
                      </div>))
                    )}
              </div>
            </div>
        </div>
        {/* next button */}
        <div className="flex flex-row-reverse min-h-10 pb-2 px-2 my-2">
          <NextButton disabled={allowNext} handleNextClick={onNextClick}/>
          {/* test Zustand */}
          <Button 
          onClick={gatherTaskConfig}
          className=" mx-2 inline-flex items-center justify-center rounded-md bg-meta-3 py-2 px-2 text-center font-medium text-white hover:bg-opacity-80 lg:px-4 xl:px-4 2xl:px-6"
          >Config
          </Button>
        </div>
      </div>
    );
};

