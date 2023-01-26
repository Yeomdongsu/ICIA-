import React, { useCallback, useState } from 'react'
import Header from '../../components/header/Header'
import Section from '../../components/main/Section'
import '../../components/community/BoardEtc/CommuBoardWr.scss'
import TextArea from '../../components/form/TextArea'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Button from '../../components/form/Button'

const AdminEventWr = () => {
  const nav = useNavigate()

  const [data, setData] = useState({
    etitle: '',
    etype: '',
    eprice: 0,
    estr: '',
    eimg: '',
  })
  const [fileImage, setFileImage] = useState('')
  let formData = new FormData()
  //   const { name, location, location2, phone, type } = data

  // input value 값을 변경
  const onChange = useCallback(
    e => {
      let dataObj = {
        ...data,
        [e.target.name]: e.target.value,
      }
      console.log(dataObj)
      setData(dataObj)
    },
    [data]
  )

  const onSub = useCallback(
    e => {
      e.preventDefault()
      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }))
      axios
        .post('/eventWr', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
          if (response.data === 'ok') {
            sessionStorage.setItem('selOp', data.type)
            nav('/admin/brandMag', { replace: true })
            alert('작성 성공')
          } else {
            alert('작성 실패')
            console.log(formData)
          }
        })
        .catch(error => console.log(error))
    },
    [data]
  )
  const onFileChange = useCallback(
    e => {
      const files = e.target.files
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
        setFileImage(URL.createObjectURL(e.target.files[0]))
        console.log(formData)
      }
    },
    [formData]
  )
  return (
    <>
      <Header />
      <Section>
        <h1 style={{ margin: 'auto' }}>이벤트 등록</h1>
        <div className="Main">
          <form onSubmit={onSub} className="Content">
            <table style={{ width: '100%', margin: 'auto' }}>
              <tr>
                <th>이벤트 명</th>
                <td>
                  <input
                    type="text"
                    style={{ width: '100%' }}
                    className="Input"
                    name="etitle"
                    onChange={onChange}
                    autoFocus
                  ></input>
                </td>
              </tr>
              <tr>
                <th>이벤트 적용 타입</th>
                <input
                  type="text"
                  style={{ width: '100%' }}
                  className="Input"
                  name="etype"
                  onChange={onChange}
                ></input>
              </tr>
              <tr>
                <th>이벤트 가격</th>
                <td>
                  <input
                    type="number"
                    style={{ width: '95%' }}
                    className="Input"
                    name="eprice"
                    onChange={onChange}
                  ></input>
                  &ensp;만원
                </td>
              </tr>
              <tr>
                <th>상세내용</th>
                <td>
                  <textarea
                    className="Input"
                    name="estr"
                    style={{ resize: 'none', height: '200px', width: '100%' }}
                    onChange={onChange}
                  />
                </td>
              </tr>
              <tr>
                <th>대표사진 등록</th>
                <td>
                  {fileImage && (
                    <div>
                      <img
                        alt="image"
                        src={fileImage}
                        style={{ width: '350px', height: '350px' }}
                      />
                    </div>
                  )}
                  <input
                    style={{ width: '100%', border: 'none' }}
                    className="Input"
                    type="file"
                    name="files"
                    accept="image/*"
                    onChange={onFileChange}
                  ></input>
                </td>
              </tr>
            </table>
            <div className="Buttons">
              <Button type="submit" style={{ marginRight: '10px' }}>
                작성하기
              </Button>
              <Button
                type="button"
                onClick={() => nav(-1)}
                style={{ backgroundColor: 'rgb(150,150,150)' }}
              >
                취소하기
              </Button>
            </div>
          </form>
        </div>
      </Section>
    </>
  )
}
export default AdminEventWr
