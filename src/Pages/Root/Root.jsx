import React from 'react'
import { Navbar } from '../../Component/Navbar/Navbar'

import { Outlet } from 'react-router'
import { UndeerSide } from '../../Component/UndeerSide/UndeerSide'

export const Root = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <UndeerSide></UndeerSide>

    </div>
  )
}
