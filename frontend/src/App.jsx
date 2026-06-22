import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMeThunk } from './store/slice/authSlice'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  const dispatch = useDispatch()

  // console.log("App: rendering component");

  useEffect(() => {
    // console.log("App: useEffect triggered, dispatching getMeThunk");
    dispatch(getMeThunk())
  }, [dispatch])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
