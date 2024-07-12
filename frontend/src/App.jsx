import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <div className='p-5'>
        <Outlet />
      </div>
    </>
  )
}

export default App