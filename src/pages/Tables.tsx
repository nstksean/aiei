import TailBreadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { DataTable } from '../components/DateTable/data-table';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';
import { InterenceJob, columns } from '../components/DateTable/colums';
import { useState,useEffect } from 'react';
import useSWR from 'swr';
import useNewTask from '../stores/useNewTask'
import useEditTask from '../stores/useEditTask';


const Tables = () => {
  const [tableDatas, setTableDatas] = useState<InterenceJob>([]);
  const newTaskConfigStore = useNewTask()
  const editTaskStore = useEditTask()
  const {data : inference_job} = useSWR('inference_job')

  
  useEffect(() => {
    newTaskConfigStore.resetNewTaskConfig()
    editTaskStore.resetEditTaskStore()
    console.log(editTaskStore.editTaskConfig)
  }, []);

  useEffect(() => {
    setTableDatas(inference_job);
  }, []);

  return (
    <DefaultLayout>
      <h2 className="text-title-md2 mb-6 font-semibold text-black dark:text-white">
        Task
      </h2>
      <div className="flex flex-col gap-10">
        <DataTable 
        columns={columns} 
        data={tableDatas} 
        setTableDatas={setTableDatas}/>
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
