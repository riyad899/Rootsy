import React from 'react';
import { Navbar } from '../../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import { UndeerSide } from '../../Component/UndeerSide/UndeerSide';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}