import React from 'react';
import { Navbar } from '../../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import { UndeerSide } from '../../Component/UndeerSide/UndeerSide';

export const Root = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <Navbar />

      <main style={{
        flex: 1,
        width: '100%',
        overflow: 'visible', // Ensures content isn't clipped
        position: 'relative' // For any absolute positioned children
      }}>
        <Outlet />
      </main>

      <UndeerSide style={{
        width: '100%',
        flexShrink: 0 // Prevents footer from shrinking
      }} />
    </div>
  );
}