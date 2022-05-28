import React, { useState, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'

interface InputFields{
    placeholder: string;
    value: any;
    change(e:any):void;
  }

  const FieldInput: React.FC<InputFields> = ({
    placeholder,
    value,
    change}) =>{
    // console.log(`props ${JSON.stringify(props)}`);
    return(
      placeholder==""?<></>:<Input placeholder={`${placeholder}`} onChange={(e)=>{change(e.target.value)}} value={value}></Input>
    )
  }


  const Input = styled.input`
  padding: 10px;
  background-color: #eee;
  border: 1px solid black;
  margin: 10px;
  width: 250px;
  border-radius: 3px;
`
export default FieldInput