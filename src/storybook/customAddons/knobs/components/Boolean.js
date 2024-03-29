
// @flow
import React from 'react'
// import styled from 'styled-components'
import Switch from 'react-switch'

type Props = {
  value: string,
  onChange: (val:string) => mixed
}

export default function Text ({value, onChange}) {
  return (
    <Switch checked={value} onChange={onChange}/>
  )
}

// const Wrapper = styled.div`
//   width: 100%;
//   > input {
//     width: 100%;
//     padding: 8px;
//     border: 2px solid grey;
//     border-radius: 5px;
//     &:focus {
//       border: 2px solid #1EA7FD;
//     }
//   }
// `