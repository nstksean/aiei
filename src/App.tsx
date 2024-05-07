import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import NoFound from './pages/NoFound';
import SelectScenarios from './pages/SelectScenarios';
import DataFetch from './pages/dataFetch';
import NewTask from'./pages/NewTask'
import TaskInfo from './pages/TaskInfo'
import StreamVideo from './pages/StreamVideo';
import EditTask from './pages/EditTask';
import Region from './pages/Region';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Task | AiEi" />
              <Tables />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path='/selectscenarios'
          element={
            <>
            <PageTitle title="Select Scenarios"/>
            <SelectScenarios/>
            </>
          }
        />
        <Route
          path='/datafetch'
          element={
            <>
            <PageTitle title="DataFetch"/>
            <DataFetch/>
            </>
          }
        />
        <Route
          path='/newtask'
          element={
            <>
            <PageTitle title="NewTask"/>
            <NewTask/>
            </>
        }>
        </Route>
        <Route 
            path='/editTask/:taskId' 
            element = {
              <>
              <PageTitle title="EditTask"/>
              <EditTask/>
              </>
            }>
          </Route>
        <Route
          path='/tables/editTask/:taskId' 
          element = {
            <>
            <PageTitle title="EditTask"/>
            <EditTask/>
            </>
          }>
        </Route>
        <Route
          path='/taskinfo/:taskId' 
          element={
            <>
            <PageTitle title="TaskInfo"/>
            <TaskInfo/>
            </>}
        />
        <Route
          path='/tables/taskinfo/:taskId' 
          element={
            <>
            <PageTitle title="TaskInfo"/>
            <TaskInfo/>
            </>}
        />
        <Route
          path='/region' 
          element={
            <>
            <PageTitle title="TaskInfo"/>
            <Region/>
            </>}
        />
        <Route
          path='*'
          element={
            <>
            <PageTitle title="Not Found"/>
            <NoFound/>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
