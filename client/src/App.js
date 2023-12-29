import './App.css';

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { useEffect, useState } from 'react';
import Form from './components/Form';
import axios from"axios"
axios.defaults.baseURL="http://localhost:8080/"
function App() {
  const [addSection,setAddSection]=useState(false)
  const [editSection,setEditSection]=useState(false)
  const [formData,setFormData]=useState({
    coursesname:"",
    price:"",
  })
  const [formDataEdit,setFormDataEdit]=useState({
    coursesname:"",
    price:"",
   _id:""
  })
  const[dataList,setDataList]=useState([])
  const handleOnchange=(e)=>{
    const {value,name}=e.target
    setFormData((preve)=>{
return{
  ...preve,
  [name]:value
}
    })
  }
  const handleSubmit=async(e)=>{
e.preventDefault()
const data=await axios.post("/create",formData)
if(data.data.success){
  setAddSection(false)
  getFetchData()
  alert(data.data.message)
}
  }
  const getFetchData=async()=>{
    const data=await axios.get("/")
    console.log(data)
if(data.data.success){
  setDataList(data.data.data)


}
  }
  useEffect(()=>{
    getFetchData();
  },[])
const handeleDelete=async(id)=>{
  const data=await axios.delete("/delete/"+id)

if(data.data.success){
  getFetchData()
  alert(data.data.message)
}
}
const handeleUpdate=async(e)=>{
e.preventDefault()
const data= await axios.put('/update',formDataEdit)
if(data.data.success){
  getFetchData()
  alert(data.data.message)
  setEditSection(false)
}
}
const handleEditOnchange= async(e)=>{
  const {value,name}=e.target
  setFormDataEdit((preve)=>{
return{
...preve,
[name]:value
}
  })
}
const handeleEdit=(el)=>{
    setFormDataEdit(el)
    setEditSection(true)
}
  return (
 <>

 <div className="contaier">
  <button className="btn" onClick={()=>setAddSection(true)}>  Add news course</button>
  { addSection && (
<Form
  handleOnchange={handleOnchange}
  handleSubmit={handleSubmit}
  HandleClose ={()=>setAddSection(false)}
  rest={FormData}
/>
  )}
  {
    editSection &&(
      <Form
  handleOnchange={handleEditOnchange}
  handleSubmit={handeleUpdate}
  HandleClose ={()=>setEditSection(false)}
  rest={formDataEdit}
/>
  )}
<div className='tablecontainer'>
  <table>
    <thead>
      <tr>
        <th>Couse name</th>
        <th>price</th>
        <th> Edit + delete </th>
      </tr>
    </thead>
    <tbody>
      
      {dataList.map((el)=>{
return(
  <tr>
    <td>{el.coursesname}</td>
    <td>{el.price}</td>
    <td>
      <button className='btn-edit' onClick={()=>handeleEdit(el)}>Edit <FaRegEdit /> </button>
      <button className='btn-delete' onClick={()=>handeleDelete(el._id)}>delete <MdDeleteForever /> </button>
    </td>
  </tr>
)
      })}
    </tbody>
  </table>
</div>
 </div>
 </>
  );
}

export default App;
