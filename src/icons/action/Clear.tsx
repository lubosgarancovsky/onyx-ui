import * as React from "react";
import type { SVGProps } from "react";
const SvgClear = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h32v32H0z" />
      <path
        fill="currentColor"
        d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0m3.536 11.05L16 14.586l-3.536-3.536-1.414 1.414L14.586 16l-3.536 3.536 1.414 1.414L16 17.414l3.536 3.536 1.414-1.414L17.414 16l3.536-3.536z"
      />
    </g>
  </svg>
);
export default SvgClear;
