import React from 'react';

const MyComponent = () => {
  return (
    <div>
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="" />
            </svg>
          </div>
          <p className="text-[#111418] text-base font-normal leading-normal flex-1 truncate">Profile</p>
        </div>
        <div className="shrink-0">
          <div className="text-[#111418] flex size-7 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div>
        <div className="flex gap-2 border-t border-[#f0f2f4] bg-white px-4 pb-3 pt-2">
          <a className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#111418]" href="#">
            <div className="text-[#111418] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="" />
              </svg>
            </div>
            <p className="text-[#111418] text-xs font-medium leading-normal tracking-[0.015em]">Logs</p>
          </a>

          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-[#617189]" href="#">
            <div className="text-[#617189] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="" />
              </svg>
            </div>
            <p className="text-[#617189] text-xs font-medium leading-normal tracking-[0.015em]">Reports</p>
          </a>

          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-[#617189]" href="#">
            <div className="text-[#617189] flex h-8 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="" />
              </svg>
            </div>
            <p className="text-[#617189] text-xs font-medium leading-normal tracking-[0.015em]">Profile</p>
          </a>
        </div>
        <div className="h-5 bg-white"></div>
      </div>
    </div>
  );
};

export default MyComponent;
