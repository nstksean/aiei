import {create} from 'zustand'

const scenarioObj =(taskContent)=> {
  console.log('scenarioObj',taskContent)
  return {
  scenario_id:taskContent.scenario_id,
  event_type_config:taskContent.event_type_config
  }
}


const configScenario = (newTask,taskContent) =>{
  const config = scenarioObj(taskContent)
  console.log('configScenario',config)
  return config
}

const useNewTask = create((set)=>({
  newTaskConfig : {},
  configScenario(taskContent){
    set((state)=> ({
      ...state,
      newTaskConfig : configScenario(state.newTaskConfig,taskContent)
    }));
  },
}));

export default useNewTask;