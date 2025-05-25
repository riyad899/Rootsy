import React from 'react';

import { Root } from '../Pages/Root/Root';
import { Error } from '../Pages/ErrorPage/Error';
import { Home } from '../Pages/Home/Home';
import { createBrowserRouter } from 'react-router';
import { Login } from '../Component/login/Login';
import { Registration } from '../Component/Registration/Registration';
import { ShareTips } from '../Component/ShareTips/ShareTips';
import { Mytips } from '../Component/MyTips/Mytips';
import GardenersGrid from '../Component/BrowsGurdernes/GardenersGrid';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <Error />,
        children: [
            {
                index: true,
                path:"/",
                Component: Home

            },
            {
                index: true,
                path:"/",
                Component: Home

            },
             {
                index: true,
                path:"/login",
                Component: Login

            },
             {
                index: true,
                path:"/signup",
                Component: Registration

            },
             {
                index: true,
                path:"/share-tip",
                Component: ShareTips

            },
              {
                index: true,
                path:"/my-tips",
                Component: Mytips

            },
              {
                index: true,
                path:"/explore",
                Component: GardenersGrid

            },

        ]
    },
]);
