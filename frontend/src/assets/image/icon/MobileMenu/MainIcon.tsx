import React from 'react';

interface MainIconProps {
  className: string;
}
const MainIcon: React.FC<MainIconProps> = ({ className }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_739_576)">
        <path
          d="M8.49162 0.531375C8.18356 0.535765 7.88335 0.62921 7.62722 0.800435L1.24205 5.05721C1.02382 5.20271 0.844795 5.39974 0.72082 5.63088C0.596845 5.86202 0.531736 6.12015 0.53125 6.38243V14.896C0.53125 15.7724 1.25209 16.4933 2.12754 16.4933H6.38432V11.7044C6.38432 11.1151 6.85919 10.6402 7.44851 10.6402H9.5769C10.1662 10.6402 10.6411 11.1151 10.6411 11.7044V16.4933H14.8979C15.7733 16.4933 16.4942 15.7724 16.4942 14.897V6.38444C16.4942 6.12164 16.4293 5.86291 16.3053 5.6312C16.1813 5.3995 16.002 5.20199 15.7834 5.05621L9.3982 0.799432C9.13029 0.620788 8.81461 0.527345 8.49263 0.531375H8.49162Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_739_576">
          <rect width="17" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MainIcon;
