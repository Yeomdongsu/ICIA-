import React, { useEffect } from "react";
import styled from "styled-components";
import EstiBannerImage from '../../pages/Events/EventImage/EventImage3.jpg'


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  z-index: 1001;
`;

const ModalContent = styled.div`
  width: 30vw;
  height: 35vw;
  margin: 0 100%;
  margin-bottom: 10px;
  border-radius: 10px;
  background-image: url(${(props)=>(props.eData ? "upload/"+props.eData : "upload/"+props.eData)});
  background-size: 30vw 35vw;
  background-repeat: no-repeat;
  background-position: center center;
`;

const ModalCloseWrapper = styled.div`
    width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 100%;

  p, label {
    cursor: pointer;
    color: white;
  },

  input {
    margin-right:5px
  }
`;

const EventModal = ({closeModal, closeModalUntilExpires, eData}) => {
  console.log(eData[0]);
  return (
    <Container>
      <ModalBackground />
      <ModalContainer>
        <ModalContent eData={eData[0]?.eimg}>
        </ModalContent>
        <ModalCloseWrapper>
          <label><input type={"checkBox"} onClick={closeModalUntilExpires}/>오늘 하루 더 이상 보지 않기</label>
          <p onClick={closeModal}>닫기 x</p>
        </ModalCloseWrapper>
      </ModalContainer>
    </Container>
  );
}

export default EventModal;