import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes'
import Header from './components/module/Header/Header';

function App() {
  const router = useRoutes(routes)
  return (
    <>
    <Header/>
    {router}
    </>
  )
}

export default App