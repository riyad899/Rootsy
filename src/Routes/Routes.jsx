import React from 'react';

import { Root } from '../Pages/Root/Root';
import { Error } from '../Pages/ErrorPage/Error';
import { Home } from '../Pages/Home/Home';
import { createBrowserRouter } from 'react-router';

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

            }

        ]
    },
]);
