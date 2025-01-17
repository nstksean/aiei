import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface SecondaryBreadcrumbProps {
  pageName: string;
  fontPageName: string
}
const TailBreadcrumbSecondary = ({ pageName,fontPageName }: SecondaryBreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              <Home className='w-5 h-5'/>
            </Link>
          </li>
          <li>
            <svg fill="#64748b" height="14px" width="14px" version="1.1" id="next_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 55.752 55.752" xmlSpace="preserve">
                <g><path d="M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912C44.605,26.413,44.086,24.993,43.006,23.916z"/></g>
              </svg>
          </li>
            <li className="font-medium text-primary">{fontPageName}</li>
          <li>
            <svg fill="#64748b" height="14px" width="14px" version="1.1" id="next_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 55.752 55.752" xmlSpace="preserve">
                <g><path d="M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912C44.605,26.413,44.086,24.993,43.006,23.916z"/></g>
              </svg>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default TailBreadcrumbSecondary;
