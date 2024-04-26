import DefaultLayout from "../layout/DefaultLayout";
import ScenariosSelect from "../components/Scenarios/ScenariosSelect";
import ScenarioCard from "../components/Scenarios/ScenarioCard";
import { scenariosColumn,Scenarios } from "../components/Scenarios/ScenariosSelect";
import TailBreadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useState,useEffect } from 'react';
import useSWR from "swr";


export default function SelectScenarios(){
  const [scenarioDatas, setScenarioDatas] = useState<Scenarios>([]);
  const [chosenRow,setChosenRow]= useState({})

  const {data : scenario} = useSWR('scenario')

  useEffect(() => {
    setScenarioDatas(scenario);
  }, [scenarioDatas]);
  

  return(
  <DefaultLayout>
    <TailBreadcrumb pageName="Select Scenario"/>
    <div className="gap-5 p-0 h-[81vh] w-svh grid grid-cols-1 sm:grid-cols-2">
        <ScenariosSelect 
        columns={scenariosColumn} 
        data={scenarioDatas}
        setChosenRow = {setChosenRow}
        setScenarioDatas={setScenarioDatas}
        />
        <ScenarioCard 
        chosenRow = {chosenRow}
        />
    </div>
  </DefaultLayout>
  );
}