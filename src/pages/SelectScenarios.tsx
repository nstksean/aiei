import DefaultLayout from "../layout/DefaultLayout";
import ScenariosSelect from "../components/Scenarios/ScenariosSelect";
import ScenarioCard from "../components/Scenarios/ScenarioCard";
import { scenariosColumn,Scenarios } from "../components/Scenarios/ScenariosSelect";
import { useState,useEffect } from 'react';
import TailBreadcrumb from "../components/Breadcrumbs/Breadcrumb";
import useSWR from "swr";


export default function SelectScenarios(){
  const [scenarioDatas, setScenarioDatas] = useState<Scenarios>([
    // {
    //   id: "0",
    //   caption: "First Scenario",
    //   description: "This is First Scenario",
    // },
    // {
    //   id: "1",
    //   caption: "Second Scenario",
    //   description: "This is Second Scenario",
    // },
    // {
    //   id: "2",
    //   caption: "Third Scenario",
    //   description: "This is F Scenario",
    // },
    // {
    //   id: "3",
    //   caption: "Fourth Scenario",
    //   description: "This is Fourth Scenario",
    // },
    // {
    //   id: "4",
    //   caption: "Fifth Scenario",
    //   description: "This is Fifth Scenario",
    // },
    // {
    //   id: "5",
    //   caption: "Sixth Scenario",
    //   description: "This is sixth Scenario",
    // },{
    //   id: "1",
    //   caption: "Second Scenario",
    //   description: "This is Second Scenario",
    // },
    // {
    //   id: "2",
    //   caption: "Third Scenario",
    //   description: "This is F Scenario",
    // },
    // {
    //   id: "3",
    //   caption: "Fourth Scenario",
    //   description: "This is Fourth Scenario",
    // },
    // {
    //   id: "4",
    //   caption: "Fifth Scenario",
    //   description: "This is Fifth Scenario",
    // },
    // {
    //   id: "5",
    //   caption: "Sixth Scenario",
    //   description: "This is sixth Scenario",
    // },{
    //   id: "1",
    //   caption: "Second Scenario",
    //   description: "This is Second Scenario",
    // },
    // {
    //   id: "2",
    //   caption: "Third Scenario",
    //   description: "This is F Scenario",
    // },
    // {
    //   id: "3",
    //   caption: "Fourth Scenario",
    //   description: "This is Fourth Scenario",
    // },
    // {
    //   id: "4",
    //   caption: "Fifth Scenario",
    //   description: "This is Fifth Scenario",
    // },
    // {
    //   id: "5",
    //   caption: "Sixth Scenario",
    //   description: "This is sixth Scenario",
    // },{
    //   id: "1",
    //   caption: "Second Scenario",
    //   description: "This is Second Scenario",
    // },
    // {
    //   id: "2",
    //   caption: "Third Scenario",
    //   description: "This is F Scenario",
    // },
    // {
    //   id: "3",
    //   caption: "Fourth Scenario",
    //   description: "This is Fourth Scenario",
    // },
    // {
    //   id: "4",
    //   caption: "Fifth Scenario",
    //   description: "This is Fifth Scenario",
    // },
    // {
    //   id: "5",
    //   caption: "Sixth Scenario",
    //   description: "This is sixth Scenario",
    // },{
    //   id: "1",
    //   caption: "Second Scenario",
    //   description: "This is Second Scenario",
    // },
    // {
    //   id: "2",
    //   caption: "Third Scenario",
    //   description: "This is F Scenario",
    // },
    // {
    //   id: "3",
    //   caption: "Fourth Scenario",
    //   description: "This is Fourth Scenario",
    // },
    // {
    //   id: "4",
    //   caption: "Fifth Scenario",
    //   description: "This is Fifth Scenario",
    // },
    // {
    //   id: "5",
    //   caption: "Sixth Scenario",
    //   description: "This is sixth Scenario",
    // },{
    //   id: "1",
    //   caption: "Second Scenario",
    //   description: "This is Second Scenario",
    // },
    // {
    //   id: "2",
    //   caption: "Third Scenario",
    //   description: "This is F Scenario",
    // },
    // {
    //   id: "3",
    //   caption: "Fourth Scenario",
    //   description: "This is Fourth Scenario",
    // },
    // {
    //   id: "4",
    //   caption: "Fifth Scenario",
    //   description: "This is Fifth Scenario",
    // },
    // {
    //   id: "5",
    //   caption: "Sixth Scenario",
    //   description: "This is sixth Scenario",
    // },
    
  ]
  );
  const [chosenRow,setChosenRow]= useState({})

  const {data : scenario} = useSWR('scenario')
  console.log(scenario)
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
        />
        <ScenarioCard 
        chosenRow = {chosenRow}
        />
    </div>
  </DefaultLayout>
  );
}