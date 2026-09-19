import { createBrowserRouter } from "react-router";
import MainLayout from "./Components/Layout/MainLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Admin from "./Pages/Admin";
import VideoService from "./Pages/VideoService";
import OrderProcess from "./Components/ServiceDetails/OrderProcess";
import DigitalServices from "./Components/ServiceDetails/DigitalServices";
import WebsiteService from "./Components/ServiceDetails/WebsiteService";
import AIandN8nPage from "./Components/ServiceDetails/AIandN8nPage";
import VirtualAssistantServices from "./Components/ServiceDetails/VirtualAssistantServices";
import IotService from "./Components/ServiceDetails/IotService";
import Academy from "./Components/ServiceDetails/Academy";
import FullPackageSolutions from "./Components/ServiceDetails/FullPackageSolutions";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import TermsConditionsPage from "./Pages/TermsConditionsPage";
import CookiesPolicyPage from "./Pages/CookiesPolicyPage";
import PortfolioPage from "./Pages/PortfolioPage";




const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout/>,
    children:[
        {
              path: "/",
              element:<Home/> 
        },
        {
          path: "/about",
              element:<About/> 
        },
        {
          path: "/service",
              element:<Services/> 
        },
        {
          path: "/contact",
              element:<Contact/> 
        },
        {
          path: "/admin",
              element:<Admin/> 
        },
            {
          path: "/videoservice",
              element:<VideoService/>
        },
         {
          path: "/order",
              element:<OrderProcess/>
        },
        {
          path: "/digital",
              element:<DigitalServices/>
        },
        {
          path: "/web",
              element:<WebsiteService/>
        },
         {
          path: "/ai",
              element:<AIandN8nPage/>
        },
         {
          path: "/virtual",
              element:<VirtualAssistantServices/>
        },
        {
          path: "/iot",
              element:<IotService/>
        },
        {
          path: "/academy",
              element:<Academy/>
        },
          {
          path: "/Allpackage",
              element:<FullPackageSolutions/>
        },
         {
          path: "/privacy",
              element:<PrivacyPolicyPage/>
        },
         {
          path: "/terms",
              element:<TermsConditionsPage/>
        },
         {
          path: "/cookies",
              element:<CookiesPolicyPage/>
        },
         {
          path: "/portfolio",
              element:<PortfolioPage/>
        },


    ]
  },
]);
export default router;