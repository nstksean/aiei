import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import useSWR from 'swr'
import axios from 'axios'
import { useState,useEffect } from 'react';

export default function DataFetch(){
    /* demo useSWR */
    const {data : scenario} = useSWR('scenario')
    console.log('SWR',scenario)

    /* demo use axios */
    const [axiosData,setAxiosData]= useState('')

    useEffect(() => {
        axios.get('scenario').then((response) => {
            setAxiosData(response.data);
        });
      }, []);
      axiosData? console.log(axiosData) : console.log('null')
    

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Fetch" />
      <div className="flex flex-col gap-10">
        <h2>Basic Data Loading</h2>
        <p>use id: {}</p>
      </div>
    </DefaultLayout>
  );
};
