import React from 'react'
import LoginBox from './LoginBox';
import logo from '../../src/img/tarkov_logo.png'


//로그인 페이지 컴포넌트
function Login(){
  const container:React.CSSProperties={
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'100vw',
    height:'100vh'
  }

  return(
    <div style={container}>
      <img src={logo}></img>
      <LoginBox></LoginBox>

    </div>
  )

}

export default Login;

