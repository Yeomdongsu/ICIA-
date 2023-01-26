import React, { useState } from 'react'
import JoinModal from './JoinModal.jsx'

const ModalJoin = (props) => {
  // 모달창 노출 여부 state
  //   const [modalOpen, setModalOpen] = useState(false)

  // 모달창 노출
  //   const showModal = () => {
  //     setModalOpen(true)
  //     document.body.style.cssText = `
  //         position: fixed;
  //         top: -${window.scrollY}px;
  //         overflow-y: scroll;
  //         width: 100%;`
  //   }

  // const [mymodal, setMymodal] = useState(false);
  return (
    <div>
      {props.mymodal ? <JoinModal mymodal={props.mymodal} setMymodal={props.setMymodal} />:null}
    </div>
  )
}

export default ModalJoin;
