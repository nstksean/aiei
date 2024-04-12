import DefaultLayout from "../layout/DefaultLayout";
import ScenariosSelect from "../components/Scenarios/ScenariosSelect";
import ScenarioCard from "../components/Scenarios/ScenarioCard";
import { scenariosColumn,Scenarios } from "../components/Scenarios/ScenariosSelect";
import { useState,useEffect } from 'react';
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";


export default function SelectScenarios(){

  const [scenarioDatas, setScenarioDatas] = useState<Scenarios>([
    {
      id: "0",
      title: "First Scenario",
      introduction: "This is First Scenario",
    },
    {
      id: "1",
      title: "Second Scenario",
      introduction: "This is Second Scenario",
    },
    {
      id: "2",
      title: "Third Scenario",
      introduction: "This is F Scenario",
    },
    {
      id: "3",
      title: "Fourth Scenario",
      introduction: "This is Fourth Scenario",
    },
    {
      id: "4",
      title: "Fifth Scenario",
      introduction: "This is Fifth Scenario",
    },
    {
      id: "5",
      title: "Sixth Scenario",
      introduction: "This is sixth Scenario",
    },{
      id: "1",
      title: "Second Scenario",
      introduction: "This is Second Scenario",
    },
    {
      id: "2",
      title: "Third Scenario",
      introduction: "This is F Scenario",
    },
    {
      id: "3",
      title: "Fourth Scenario",
      introduction: "This is Fourth Scenario",
    },
    {
      id: "4",
      title: "Fifth Scenario",
      introduction: "This is Fifth Scenario",
    },
    {
      id: "5",
      title: "Sixth Scenario",
      introduction: "This is sixth Scenario",
    },{
      id: "1",
      title: "Second Scenario",
      introduction: "This is Second Scenario",
    },
    {
      id: "2",
      title: "Third Scenario",
      introduction: "This is F Scenario",
    },
    {
      id: "3",
      title: "Fourth Scenario",
      introduction: "This is Fourth Scenario",
    },
    {
      id: "4",
      title: "Fifth Scenario",
      introduction: "This is Fifth Scenario",
    },
    {
      id: "5",
      title: "Sixth Scenario",
      introduction: "This is sixth Scenario",
    },{
      id: "1",
      title: "Second Scenario",
      introduction: "This is Second Scenario",
    },
    {
      id: "2",
      title: "Third Scenario",
      introduction: "This is F Scenario",
    },
    {
      id: "3",
      title: "Fourth Scenario",
      introduction: "This is Fourth Scenario",
    },
    {
      id: "4",
      title: "Fifth Scenario",
      introduction: "This is Fifth Scenario",
    },
    {
      id: "5",
      title: "Sixth Scenario",
      introduction: "This is sixth Scenario",
    },{
      id: "1",
      title: "Second Scenario",
      introduction: "This is Second Scenario",
    },
    {
      id: "2",
      title: "Third Scenario",
      introduction: "This is F Scenario",
    },
    {
      id: "3",
      title: "Fourth Scenario",
      introduction: "This is Fourth Scenario",
    },
    {
      id: "4",
      title: "Fifth Scenario",
      introduction: "This is Fifth Scenario",
    },
    {
      id: "5",
      title: "Sixth Scenario",
      introduction: "This is sixth Scenario",
    },{
      id: "1",
      title: "Second Scenario",
      introduction: "This is Second Scenario",
    },
    {
      id: "2",
      title: "Third Scenario",
      introduction: "This is F Scenario",
    },
    {
      id: "3",
      title: "Fourth Scenario",
      introduction: "This is Fourth Scenario",
    },
    {
      id: "4",
      title: "Fifth Scenario",
      introduction: "This is Fifth Scenario",
    },
    {
      id: "5",
      title: "Sixth Scenario",
      introduction: "This is sixth Scenario",
    },
    
  ]
  );
  const [chosenRow,setChosenRow]= useState({})

  return(
  <DefaultLayout>
    <Breadcrumb pageName="Select Scenario"/>
    <div className="flex gap-5 p-0 h-[81vh] w-svh">
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