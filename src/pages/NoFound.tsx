import TailBreadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const NoFound = () => {
  return (
    <DefaultLayout>
      <TailBreadcrumb pageName="No Found" />
      <div className="flex flex-col gap-10">
        <h1>
            404 No Found
        </h1>
      </div>
    </DefaultLayout>
  );
};

export default NoFound;