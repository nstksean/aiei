import {useEffect,useState}from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

import useNewTask from "../../stores/useNewTask"



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
    console.log('gatherTaskConfig',newTaskConfig)
    setTaskConfig_scenario(newTaskConfig)
    return updateStore(newTaskConfig)
    };

  function onNextClick(){
    ()=>handleNextClick()
  }
  
  function onLogClick(){
    console.log('log',newTaskConfig,newTaskConfigStore)
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
      <div className="border border-stroke basis-3/5 h-full bg-slate-50 shadow-default rounded-md max-h-[740px] min-h-[360px] flex flex-col justify-between px-5 pt-2">
        {/* Scenario intro */}
        <div className="flex flex-col text-clip">
          <p className="text-xs text-blue-600 font-medium">Scenario ID：{scenarioId}</p>
          <p className="text-2xl text-blue-600 font-medium">{scenarioTitle}</p>
          <p className="text-base text-blue-600 font-medium">
            introduction：
          </p>
          <p className="text-base text-blue-600 font-medium">
            {scenarioIntro}
          </p>
        </div>
        {/* nn and event */}
        <div className=" rounded-md overflow-y-auto max-h-[580px] min-h-96 flex gap-2 ">
          <div className="basis-1/2 shadow-default bg-white p-2 flex flex-col overflow-y-auto">
            <p className="text-base text-blue-600 font-medium bg-white mb-1 shadow-default">Pipeline Information</p>

            <p className="text-base text-zinc-700 font-bold bg-white">NN：</p>
            <p className="text-base text-zinc-700 bg-white">{scenarioNN}</p>
          </div>
          <div className="basis-1/2  shadow-default bg-white p-2 flex flex-col overflow-y-auto">
            <p className="text-base text-blue-600 font-medium bg-white mb-1 shadow-default">Event:</p>
            
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
        <div className="flex flex-row-reverse min-h-10 pb-2 px-2">
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

