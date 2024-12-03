// //import React from "react";

import { useRoutes } from "react-router-dom";  
import HomeTemplate from "../Templates/HomeTemplate/HomeTemplate.jsx";  
import HomePage from "../component/HomePage/HomePage.jsx";  
import StatisticalPage from "../component/StatisticalPage/StatisticalPage.jsx";  


const useRouterCustome = () => {  
  const router = useRoutes([  
    {  
      path: "/",   
      element: <HomeTemplate />,  
      children: [  
        {  
          index: true,  
          element: <HomePage />, 
        },  
      ],  
    },  
    {  
      path: "/statistical",   
      element: <HomeTemplate />,  
      children: [  
        {  
          index: true,  
          element: <StatisticalPage />,   
        },  
      ],  
    },  
   
  ]);  
  return router;  
};  

export default useRouterCustome;