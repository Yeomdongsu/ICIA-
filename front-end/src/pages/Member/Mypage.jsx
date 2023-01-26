import Stack from '../../components/common/Stack'
import Input from '../../components/form/Input'
import TextArea from '../../components/form/TextArea'
import InputGroup from '../../components/form/InputGroup'
import Button from '../../components/form/Button'
import FlexBox from '../../components/common/FlexBox'
import useAuth from '../../hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Mypage = () => {
  const nav = useNavigate();
  const id = sessionStorage.getItem("mid");
  console.log(id)

 

  useEffect(() => {

    if(id === null || id === ""){
        alert("로그인 후 가능한 기능입니다");
        nav("/");
        // return;
    }
  });
  

  const modify= () => {
    nav('/member/edit')
  }
  
  const { userInfo } = useAuth()

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }
  const remove=() => {
    // console.log(remove);
    let confirm = window.confirm('회원 탈퇴하시겠습니까?');
    if(confirm === true) {
      axios
      .post('/resignMy', userInfo)
      .then(res => {
        console.log(res);
  
        if(res.data === 'Ok'){
          window.alert('정상적으로 탈퇴되었습니다.');
          sessionStorage.removeItem("mid");
          sessionStorage.removeItem("grade");
          nav('/');
        }else {
          window.alert('탈퇴에 실패하였습니다.');
        }
      })
      .catch((err) => console.log(err));
    } else {
      window.alert('취소되었습니다.');
    }
  
  }

  return (
    <form style={{margin:'0 auto' ,width: '70%' }} onSubmit={onSubmitHandler}>
      <Stack style={{ width: '100%' }}>
        <InputGroup label="아이디">
          <Input style={{border: 0}} type="text" value={userInfo.mid} readOnly />
        </InputGroup>
        <InputGroup label="성함">
          <Input style={{border: 0}} type="text" value={userInfo.mname} readOnly />
        </InputGroup>
        <InputGroup label="이메일">
          <Input style={{border: 0}} type="text" value={userInfo.memail} readOnly/>
        </InputGroup>
        <InputGroup label="연락처">
          <Input style={{border: 0}} type="text" value={userInfo.mphone} readOnly />
        </InputGroup>
        <InputGroup label="주소">
          <Input style={{border: 0}} type="text" value={userInfo.maddr} readOnly />
        </InputGroup>
        <InputGroup label="상세주소">
          <Input style={{border: 0}} type="text" value={userInfo.mdaddr} readOnly />
        </InputGroup>
        <FlexBox gap={30} style={{ width: '500px', margin: '0 auto' }}>
          <Button onClick={modify} style={{ flex: 1 }}>수정하기</Button>
          <Button onClick={remove} style={{ flex: 1 }}>탈퇴하기</Button>
        </FlexBox>
      </Stack>
    </form>
  )
}
export default Mypage;
