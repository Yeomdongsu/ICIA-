import React, { useState } from 'react'
import JoinModal from './JoinModal.jsx'
import ModalBasic from './ModalBasic.jsx'

const Modal = ({...props}) => {
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

  return (
    <div>
      {props.opened && <ModalBasic setModalOpen={props.setModalOpened} sucLogin={props.sucLogin} sucLoginNaver={props.sucLoginNaver} sucLoginGoogle={props.sucLoginGoogle} />}
      {props.joinOpened && <JoinModal />}
  </div>
  )
}

export default Modal
