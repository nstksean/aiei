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

const taskDetailObj = (taskContent) => {
  console.log('taskDetailObj',taskContent)
  return {
    name: taskContent.name,
    user_note: taskContent.user_note,
    schedule_config: taskContent.schedule_config,
    inference_config: taskContent.inference_config
  }
}

const configTaskDetail = (newTask,taskContent)=> {
  const detail = taskDetailObj(taskContent)
  console.log('configTaskDetail',detail)
  return detail
}

const useNewTask = create((set)=>({
  newTaskConfig : {},
  configScenario(taskContent){
    set((state)=> ({
      ...state,
      newTaskConfig : configScenario(state.newTaskConfig,taskContent)
    }));
  },
  configTaskDetail(taskContent){
    set((state)=> ({
      ...state,
      newTaskConfig : {
        ...state.newTaskConfig,  // 保留先前的 newTaskConfig 值
        ...configTaskDetail(state.newTaskConfig, taskContent)  // 更新 newTaskConfig
      }
    }));
  },
  resetNewTaskConfig(){ 
    set(()=>({ newTaskConfig:{} }));
  },
}));

export default useNewTask;