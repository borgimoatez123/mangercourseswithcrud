import React from 'react'
import"../App.css"
import { IoCloseOutline } from "react-icons/io5";
export default function Form({handleOnchange,handleSubmit,HandleClose,rest}) {
  return (
       <div className="addcontaier">

    <form onSubmit={handleSubmit}>
    <div className='close-btn' onClick={HandleClose}><IoCloseOutline /></div>
      <label >courses name</label>
      <input type="text" id="coursesname"  name="coursesname" onChange={handleOnchange} value={rest.coursesname}/>
      <label >price</label>
      <input type="text" id="price"  name="price"onChange={handleOnchange}value={rest.price}/>
      <button className="btn"> submit </button>
    </form>
    </div>
  )
}
