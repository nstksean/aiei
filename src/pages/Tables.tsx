import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { DataTable } from '../components/DateTable/data-table';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';
import { Payment, columns } from '../components/DateTable/colums';
import { useState } from 'react';


const Tables = () => {
  const [tableDatas, setTableDatas] = useState<Payment>([
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    }
  ]
  );

  return (
    <DefaultLayout>
      <h2 className="text-title-md2 mb-6 font-semibold text-black dark:text-white">
        Task
      </h2>
      <div className="flex flex-col gap-10">
        <DataTable columns={columns} data={tableDatas} />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
