import * as React from 'react';
const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={15}
    height={17}
    fill="none">
    <path fill="url(#a)" d="M0 0h15v14.1H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b" transform="scale(.02 .02128)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAvCAYAAAChd5n0AAAC70lEQVRogdWawVXbQBCG/1GeJN/idGAqyHKwdXUqiDqIUkGggkAFMRWEVBDTARwRB9YVBCrAusVynicH5PeEnxCzyw4k/3u+yN6dGebb1cw8CIpaX5nphvETAAj4kEys1bIVaW0MABvGNwBDAEMGvmvaIq2N+dqM6jV+tZ8lMfZo395o2FPLyOoPcsmzUFILhBifJM+C2dPYtAurrbTwUslIH0JaeKkE0oeQFl7B0erDaisNvIJnRIKOBl7BA5Ggo4FXULQkWG0VGq+gGXFBJjReQQNxQSY0XsHQcsFqq5B4BcuIDyoh8aK6NMWG8ZUIo1CbvqSYcfMmwmdaleYO9z3D/6xlxIzqtb14rhhYRBEhZ8btazvjKwYu0hg5AQBfm2G9xgzQ6xdUxDhOM3sE7Fy/q0uTg3AK4O2rOCYUM24jQt4eZjy4ftPMzpMYhoGLl3dPrB9pArM7kXn0hfj7yhzQ/RTkX1EFRpFmdt71Ze+bvS6NYcYpCO91fJOpOdBFXxUgKlHq0swY+BLONQe1DnSfxLVWMzWc44Uugq4D3SdxrRWP7XkSYwTGmb97YnUe6D55Vb91aQoGZgifnYqAg2RiT10XepfxGjUaM24Gmd3zWetVxq8uTQ6FQpMIo/WVmfqs9etHSG+Gu2EUPut8G6uPnuvU9nYORAurloaNDSe5Z0QRq+fY8EFLEytvG06B1KUp4I5V1Xxc5IyXUyDMjilnnCUxRl4VgSNe4hdi00XeCX9eMeFoMLaz9sOmNTiCrCJYNnOvpcSgOCPrtfAvxFgQMN0NAgAGYzsjYArGQrDTUGwTDoFIsCLgJM1sb7GXTKxNM2sIOAlhs2X7aQmwqiJCHo/tudQwIGsNkhjvJHiJMtKb4uZAuwYByFoDKV6iQB5JccWEwzSzufRAdon27TLNbM6EQ3Rc01K8RGitSsMPd8eCCEXo/y15bEaQTuyTfsoy0hoPSQ60r7ouguCjqbo0RV0aE3TTfnumqSRE+gvXP0GVa4RQdAAAAABJRU5ErkJggg=="
        id="b"
        width={50}
        height={47}
      />
    </defs>
  </svg>
);
export default Star;
