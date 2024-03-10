import React from "react";
import axios from "axios";

const CompanyList = async() => {

  const { data } = await axios.get(`http://localhost:6969/api/v1/jobs/get-jobs`, {
    withCredentials: true,
});
  console.log(data);
  
  return (<div className="container py-20">CompanyList</div>);
};

export default CompanyList;
