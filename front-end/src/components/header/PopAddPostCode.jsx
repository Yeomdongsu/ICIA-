import React, { useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import JoinModal from './JoinModal';
 
const PopAddPostCode = ( {props, setA, onClose}) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data);
        console.log(fullAddress);
        console.log(data.zonecode);
        setA(fullAddress);
        onClose();
    }
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "100px",
        left: "300px",
        width: "600px",
        height: "600px",
        padding: "7px",
        zIndex: "10000",
      };
    const closeStyle = {
        display: "block",
        position: "absolute",
        top: "77px",
        left: "307px",
        width: "587px",
        height: "30px",
        padding: "7px",
        zIndex: "10000",
        fontWeight:"bolder",
        backgroundColor:"lightGray"
      };
 
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <div  style={closeStyle}>
            <div type='button' style={{float:"right", lineHeight:"12px",cursor: "pointer"}} onClick={onClose} className='postCode_btn'>✖️</div>
            </div>
        </div>
    )
}
 
export default PopAddPostCode;