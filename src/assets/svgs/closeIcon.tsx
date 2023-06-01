import React from 'react';

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15">
      <path fill="url(#pattern0)" d="M0 0H15V15H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox">
          <use transform="scale(.00195)" xlinkHref="#image0_31_8108"></use>
        </pattern>
        <image
          id="image0_31_8108"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"></image>
      </defs>
    </svg>
  );
}

export default CloseIcon;
