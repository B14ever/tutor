import { useState } from 'react'
import { Route,Routes } from "react-router-dom"
import Home from './Component/Page/Home'
import Layout from './Component/UI/Layout'
import About from './Component/Page/About'
import Teachers from './Component/Page/Teachers'
import Login from './Component/Page/Login'
import SignUp from './Component/Page/SignUp'
import EmailVerification from './Component/Page/EmailVerification'
import RecoverPassword from './Component/Page/RecoverPassword'
import ForgetPassword from './Component/Page/ForgetPassword'
import ProtectedRoutes from './Component/Routes/ProtectedRoutes'
import Setting from './Component/Page/Setting'
import FindTeacher from './Component/Page/FindTeacher'
import './index.css'
function App() {
  return (
    <Routes>
       <Route path="/" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/forgetPassword" element={<ForgetPassword/>}/>
         <Route path="/findTeacher" element={<FindTeacher/>}/>
         <Route element={<ProtectedRoutes/>}>
          <Route path="/profile" element={<Teachers/>}/>
          <Route path="/emailverification" element={<EmailVerification/>}/>
          <Route path="/RecoverPassword" element={<RecoverPassword/>}/>
          <Route path="/setting" element={<Setting/>}/>
        </Route>
       </Route>
    </Routes>
  )
}

export default App
