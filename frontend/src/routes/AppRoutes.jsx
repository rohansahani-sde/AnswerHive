import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from '../utils/Protected'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import QuestionsList from '../pages/QuestionsList'
import QuestionDetails from '../pages/QuestionDetails'
import CreateQuestion from '../pages/CreateQuestion'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MainLayout from '../components/MainLayout'
import Myquestions from '../pages/Myquestions'
import Notifications from '../components/Notifications'
import PublicRoute from './PublicRoute'
import SearchQuestions from '../pages/SearchQuestions'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    {/* <Navbar /> */}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={ <PublicRoute > <Login /> </PublicRoute>} />
        <Route path="/signup" element={ <PublicRoute > <Register /> </PublicRoute> } />

        {/* Protected layout with Sidebar */}
        <Route element={<Protected><MainLayout /></Protected>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ask" element={<CreateQuestion />} />
          <Route path="/questions" element={<QuestionsList />} />
          <Route path="/questions/:id" element={<QuestionDetails />} />
          <Route path="/questions/me" element={<Myquestions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<SearchQuestions />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
// <BrowserRouter>
//   <Routes>
//     <Route element={<Protected><Sidebar /></Protected>}></Route>
//     <Route path="/login" element={ <Protected> <Login /> </Protected> } />
//     <Route path="/register" element={<Protected> <Register /> </Protected>} />
//     <Route path="/dashboard" element={<Dashboard />} />
//     <Route path="/ask" element={<CreateQuestion />} />
//     <Route path="/questions" element={<QuestionsList />} />
//     <Route path="/questions/:id" element={<QuestionDetails />} />
//   </Routes>
// </BrowserRouter>
