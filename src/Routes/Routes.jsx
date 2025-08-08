import React from 'react';
import { createBrowserRouter } from 'react-router-dom'; // Note: Fixed import from 'react-router'
import { Root } from '../Pages/Root/Root';
import { Error } from '../Pages/ErrorPage/Error';
import { Home } from '../Pages/Home/Home';
import { Login } from '../Component/login/Login';
import { Registration } from '../Component/Registration/Registration';
import { ShareTips } from '../Component/ShareTips/ShareTips';
import { Mytips } from '../Component/MyTips/Mytips';
import GardenersGrid from '../Component/BrowsGurdernes/GardenersGrid';
import { Alltips } from '../Component/AllTips/Alltips';
import { SingleTip } from '../Component/MyTips/SingleTip';

import { Sellplants } from '../Component/BuyAndSell/Sellplants';
import Buyplants from '../Component/BuyAndSell/Buyplants';
import { Cart } from '../Component/Cart/Cart';
import { MyProfile } from '../Component/MyProfile/MyProfile';
import { Dashboard } from '../Component/Dashboard/Dashboard';
import { GardeningCalendar } from '../Component/GardeningCalender/GardeningCalendar';
import { Messages } from '../Component/Messages/Messages';
import { Settings } from '../Component/Settings/Settings';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />, // Changed from Component to element
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home /> // Changed from Component to element
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Registration />
            },
            {
                path: "/share-tip",
                element: <ShareTips />
            },
            {
                path: "/my-tips",
                element: <Mytips />
            },
            {
                path: "/explore",
                element: <GardenersGrid />
            },
            {
                path: "/tips",
                element: <Alltips />
            },
             {
                path: "/profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "/dashboard",
                element:<Dashboard></Dashboard>
            },
             {
                path: "/buy-plants",
                element: <Buyplants />
            },
            {
                path: "/sell-plants",
                element: <Sellplants />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/messages",
                element: <Messages />
            },
             {
                path: "/calender",
                element: <GardeningCalendar></GardeningCalendar>
            },
            {
                path: "/settings",
                element: <Settings />
            },
            {
                path: "/tips/:id", // Fixed the route parameter syntax
                element: <SingleTip />
            },

        ]
    },
]);