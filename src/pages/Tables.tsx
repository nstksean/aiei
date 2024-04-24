import TailBreadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { DataTable } from '../components/DateTable/data-table';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';
import { InterenceJob, columns } from '../components/DateTable/colums';
import { useState,useEffect } from 'react';
import useSWR from 'swr';


const Tables = () => {
  const [tableDatas, setTableDatas] = useState<InterenceJob>([]);

  const {data : inference_job} = useSWR('inference_job')
  console.log(inference_job)
  useEffect(() => {
    setTableDatas(inference_job);
  }, [tableDatas]);

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
