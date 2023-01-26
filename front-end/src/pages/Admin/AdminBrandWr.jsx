import axios from 'axios'
import { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/form/Button'
import Header from '../../components/header/Header'
import Section from '../../components/main/Section'
import styled from 'styled-components'
import { formItemStyle } from '../../style/theme'
import Arrow from '../../assets/images/select/select-arrow.png'
import '../../components/community/BoardEtc/CommuBoardWr.scss'
import PopAddPostCode from '../../components/header/PopAddPostCode'
import PopAddDom from '../../components/header/PopAddDom'

const Sel = styled.select`
  border: 0;
  font-size: ${props => props.theme.fontSize.md};
  ${formItemStyle};
  appearance: none;
  background: #fff url(${Arrow}) no-repeat right 15px center;
  background-size: 10px;
  width: 100px;
`

const AdminBrandWr = () => {
  const nav = useNavigate()

  const [fileImage, setFileImage] = useState('')
  const [a, setA] = useState('')

  const op = useLocation()
  console.log(op.state?.selectOption)
  let opt = op.state?.selectOption
  console.log(opt)

  const [data, setData] = useState({
    name: '',
    location: '',
    location2: '',
    phone: '',
    type: opt,
  })

  let formData = new FormData()
  const { name, location, location2, phone, type } = data

  // input value 값을 변경
  const onChange = useCallback(
    e => {
      let loca = a
      let dataObj = {
        ...data,
        [e.target.name]: e.target.value,
        location: loca,
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
        .post('/brWriteProc', formData, {
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

  const options = [
    {
      value: 'weddingComp',
      label: '예식장',
    },
    {
      value: 'sdm',
      label: '스드메',
    },
    {
      value: 'planner',
      label: '플래너',
    },
    {
      value: 'honeymoon',
      label: '허니문',
    },
  ]

  // 파일 선택 시 폼데이터에 파일 목록 추가
  // 미리보기로 설정하기
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

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true)
  }

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false)
  }

  return (
    <div>
      <Header />
      <Section>
        <h1 style={{ margin: 'auto' }}>업체 등록</h1>
        <div className="Main">
          <form onSubmit={onSub} className="Content">
            <div>
              <Sel name="type" onChange={onChange} defaultValue={opt}>
                {options.map((item, idx) => (
                  <option value={item.value} onChange={onChange}>
                    {item.label}
                  </option>
                ))}
              </Sel>
            </div>
            <table style={{ width: '100%', margin: 'auto' }}>
              <tr>
                <th>업체 명</th>
                <td>
                  <input
                    type="text"
                    style={{ width: '100%' }}
                    className="Input"
                    name="name"
                    onChange={onChange}
                    placeholder="업체 명을 입력하세요"
                    autoFocus
                  ></input>
                </td>
              </tr>
              {type == 'weddingComp' || type == 'sdm' ? (
                <>
                  <tr>
                    <th>주소</th>
                    <td>
                      <input
                        className="Input"
                        style={{ width: '100%' }}
                        type="text"
                        value={a}
                        name="location"
                        readOnly
                        required
                        placeholder="주소를 입력하세요."
                        onClick={() => openPostCode()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>상세 주소</th>
                    <td>
                      <input
                        className="Input"
                        style={{ width: '100%' }}
                        type="text"
                        name="location2"
                        required
                        placeholder="상세주소를 입력하세요."
                        onChange={onChange}
                      />
                    </td>
                  </tr>
                </>
              ) : null}
              <tr>
                <th>연락처</th>
                <td>
                  <input
                    type="text"
                    className="Input"
                    style={{ width: '100%' }}
                    name="phone"
                    onChange={onChange}
                    maxLength={11}
                    placeholder="01012341234"
                  ></input>
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
      {/* 클릭 시 팝업 생성 */}
      {/* 팝업 생성 기준 div */}
      <div id="popupDom">
        {isPopupOpen && (
          <PopAddDom>
            <PopAddPostCode onClose={closePostCode} setA={setA} />
          </PopAddDom>
        )}
      </div>
    </div>
  )
}

export default AdminBrandWr
