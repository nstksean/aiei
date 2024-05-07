import {create} from 'zustand'

const editTaskDetail = (oldState,taskAfterEdit) =>{
    const config = taskAfterEdit
    console.log('editTaskDetail',config,oldState,taskAfterEdit)
    return config
}

const useEditTask = create((set)=>({
    editTaskConfig : {},
    editTaskDetail(taskContent){
      set((state)=> ({
        ...state,
        editTaskConfig : editTaskDetail(state.editTaskConfig, taskContent) 
      }));
    },
    resetEditTaskStore(){ 
      set(()=>({ editTaskConfig:{} }));
    },
  }));
  
  export default useEditTask;