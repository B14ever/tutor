import React,{useContext,createContext,useState} from 'react'
const FormContext = createContext()
const Form = ({children}) => {
    const [FormStage,SetFormStage] = useState(0)
  return (
    <FormContext.Provider value={{FormStage,SetFormStage}}>
    {children}
   </FormContext.Provider>
  )
}
export const useFormContext = () => useContext(FormContext)
export default Form