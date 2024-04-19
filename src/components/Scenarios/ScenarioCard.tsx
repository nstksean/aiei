import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"



export default function ScenarioCard({
  chosenRow
}){

let scenarioId = chosenRow?.id? chosenRow.id : " "
let scenarioTitle = chosenRow?.caption? chosenRow.caption : "Select A Scenario on The Left"
let scenarioIntro = chosenRow?.description? chosenRow.description : " "
let scenarioNN = chosenRow?.nn_arch? chosenRow?.nn_arch : ''
    return(
        <div className="basis-3/5 h-full bg-slate-50 shadow-default rounded-md max-h-[740px] min-h-[360px] flex flex-col justify-between px-5 pt-2">
          {/* Scenario intro */}
          <div className="flex flex-col text-clip">
            <p className="text-xs text-blue-600 font-medium">Scenario ID：{scenarioId}</p>
            <p className="text-2xl text-blue-600 font-medium">{scenarioTitle}</p>
            <p className="text-base text-blue-600 font-medium">
              introduction：
            </p>
            <p className="text-base text-blue-600 font-medium">
              {scenarioIntro}
            </p>
          </div>
          {/* nn and event */}
          <div className=" rounded-md overflow-y-auto max-h-[580px] min-h-96 flex gap-2 ">
            <div className="basis-1/2 shadow-default bg-white p-2 flex flex-col overflow-y-auto">
              <p className="text-base text-blue-600 font-medium bg-white mb-1 shadow-default">Pipeline Information</p>

              <p className="text-base text-zinc-700 font-bold bg-white">NN：</p>
              <p className="text-base text-zinc-700 bg-white">{scenarioNN}</p>
            </div>
            <div className="basis-1/2  shadow-default bg-white p-2 flex flex-col overflow-y-auto">
              <p className="text-base text-blue-600 font-medium bg-white mb-1 shadow-default">Event:</p>
              
                {/* Event container */}
                <div className="flex flex-col gap-2 bg-white shadow-default">
                  {/* single event */}
                  <div className="flex space-x-2 p-2">
                    <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Event
                      </label>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          {/* next button */}
          <div className="flex flex-row-reverse min-h-10 pb-2 px-2">
            <button
            to="#"
            className="inline-flex items-center justify-center rounded-md bg-meta-3 py-2 px-2 text-center font-medium text-white hover:bg-opacity-80 lg:px-4 xl:px-4 2xl:px-6"
            >
            Next
            </button>
          </div>
        </div>
    );
};

