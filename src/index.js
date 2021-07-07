import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import APP from './App';
import reportWebVitals from './reportWebVitals';
import data from "./data"

const countryList = data.sort((a, b) => {
  const areaA = a.area;
  const areaB = b.area;

  if (areaA < areaB)
    return -1
  else if (areaA > areaB)
    return 1
  return 0
})
const areaList = [...new Set(
  data.map(ele => {
    return ele.area;
  })
)
];

ReactDOM.render(
  <APP countryList={countryList} areaList={areaList}/>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
