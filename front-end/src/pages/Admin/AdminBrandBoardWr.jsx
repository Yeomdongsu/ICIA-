import React, { useCallback, useRef, useState } from 'react'
import Header from '../../components/header/Header'
import Section from '../../components/main/Section'
import '../../components/community/BoardEtc/CommuBoardWr.scss'
import styled from 'styled-components'
import { formItemStyle } from '../../style/theme'
import Arrow from '../../assets/images/select/select-arrow.png'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/form/Button'
import axios from 'axios'
import Footer from '../../components/footer/Footer'

const Sel = styled.select`
  border: 0;
  font-size: ${props => props.theme.fontSize.md};
  ${formItemStyle};
  appearance: none;
  background: #fff url(${Arrow}) no-repeat right 15px center;
  background-size: 10px;
  width: 100px;
`

const AdminBrandBoardWr = () => {
  const nav = useNavigate()

  const [fileImage, setFileImage] = useState([])
  const op = useLocation()
  console.log('selectOption : ' + op.state?.selectOption)
  let opt = op.state?.selectOption
  console.log('op : ' + opt)

  let formData = new FormData()
  const [type, setType] = useState(opt)
  const [wc, setWc] = useState({
    widx: 0,
    wname: '',
    wlocation: '',
    wlocation2: '',
    wphone: '',
    wimg: '사진없음.png',
  })
  const [wh, setWh] = useState({
    whname: '',
    whamount: 0,
    whstr: '',
    bmin: 0,
    bmax: 0,
    bprice: 0,
    whkind: '일반',
    whprice: -1,
    whwcidx: wc.widx,
  })
  const [sdm, setSdm] = useState({
    scomp: '',
    sphone: '',
    slocation: '',
    slocation2: '',
    sprice: -1,
    sstr: '',
    simg: '사진없음.png',
  })
  const [plan, setPlan] = useState({
    pname: '',
    pphone: '',
    pprice: -1,
    pstr: '',
    pimg: '사진없음.png',
  })
  const [honey, setHoney] = useState({
    hbrand: '',
    hphone: '',
    harrival: '국내',
    hlocation: '',
    hcost: -1,
    hstr: '',
    himg: '사진없음.png',
  })
  const arrival = [
    { value: '국내', label: '국내' },
    { value: '해외', label: '해외' },
  ]
  const whtype = [
    { value: '일반', label: '일반' },
    { value: '전통혼례', label: '전통혼례' },
    { value: '호텔', label: '호텔' },
    { value: '하우스', label: '하우스' },
    { value: '교회', label: '교회' },
    { value: '성당', label: '성당' },
    { value: '야외', label: '야외' },
  ]
  const [data, setData] = useState({})
  // const { name, location, phone } = data
  const [wcchkOk, setWcchkOk] = useState(false)
  const [sdmchkOk, setSdmchkOk] = useState(false)
  const [planchkOk, setPlanchkOk] = useState(false)
  const [honeymoonchkOk, setHoneymoonchkOk] = useState(false)

  const options = [
    {
      value: 'weddingHall',
      label: '웨딩홀',
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

  const onchType = e => {
    setType(e.target.value)
    console.log(type)
    setData({})
    setFileImage([])
  }

  const onSub = useCallback(
    e => {
      e.preventDefault()
      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }))
      let fun
      switch (type) {
        case 'weddingHall':
          fun = 'weddingHallWr'
          break
        case 'sdm':
          fun = 'sdmDetailWr'
          break
        case 'planner':
          fun = 'plannerDetailWr'
          break
        case 'honeymoon':
          fun = 'honeyDetailWr'
          break
      }
      axios
        .post(`/${fun}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
          if (response.data === 'ok') {
            sessionStorage.setItem('selOp', data.type)
            nav(-1, { replace: true })
            alert('작성성공')
          } else {
            alert('작성실패')
            console.log(formData)
          }
        })
        .catch(error => console.log(error))
    },
    [data]
  )

  const imageInput = useRef()
  const onClickImg = () => {
    imageInput.current.click()
  }

  const onFileChange = useCallback(
    e => {
      const files = e.target.files
      console.log(files)
      const f = []
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
        f.push(URL.createObjectURL(e.target.files[i]))
        // setFileImage(URL.createObjectURL(e.target.files[i]))
        console.log(formData)
      }
      console.log(f)
      setFileImage(f)
    },
    [formData]
  )

  const onchWC = e => {
    let wcData = {
      ...wc,
      [e.target.name]: e.target.value,
    }
    console.log(wcData)
    setWc(wcData)
  }

  const wcChk = () => {
    axios
      .get('/searchWCname', { params: { wname: wc.wname, wphone: wc.wphone } })
      .then(response => {
        if (response.data === '') {
          alert('해당 예식장이 없습니다')
        } else {
          console.log(response.data)
          setWc(response.data)
          setWcchkOk(true)
          console.log(wcchkOk)
          let d = {
            ...wh,
            whwcidx: response.data.widx,
            whkind: '일반',
          }
          setWh(d)
          console.log(response.data.widx)
        }
      })
      .catch(error => console.log(error))
  }

  const onchWh = useCallback(
    e => {
      let dataObj = {
        ...wh,
        [e.target.name]: e.target.value,
      }
      console.log(dataObj)
      setWh(dataObj)
      setData(dataObj)
    },
    [wh]
  )

  const onchSDM = useCallback(
    e => {
      let sdmData = {
        ...sdm,
        [e.target.name]: e.target.value,
        sidx: 0,
      }
      console.log(sdmData)
      setSdm(sdmData)
      setData(sdmData)
    },
    [sdm]
  )

  const sdmChk = () => {
    axios
      .get('/searchSdmComp', { params: { scomp: sdm.scomp, sphone: sdm.sphone } })
      .then(response => {
        if (response.data === '') {
          alert('해당 업체가 없습니다')
        } else {
          console.log(response.data)
          setSdm(response.data)
          setSdmchkOk(true)
        }
      })
      .catch(error => console.log(error))
  }

  const onchPlan = useCallback(
    e => {
      let planData = {
        ...plan,
        [e.target.name]: e.target.value,
      }
      console.log(planData)
      setPlan(planData)
      setData(planData)
    },
    [plan]
  )

  const planChk = () => {
    axios
      .get('/searchPlanname', { params: { pname: plan.pname, pphone: plan.pphone } })
      .then(response => {
        if (response.data === '') {
          alert('해당 업체가 없습니다')
        } else {
          console.log(response.data)
          setPlan(response.data)
          setPlanchkOk(true)
        }
      })
      .catch(error => console.log(error))
  }

  const onchHM = useCallback(
    e => {
      let honeyData = {
        ...honey,
        [e.target.name]: e.target.value,
        hidx: 0,
      }
      console.log(honeyData)
      setHoney(honeyData)
      setData(honeyData)
    },
    [honey]
  )

  const honeymoonChk = () => {
    axios
      .get('/searchHoneyBrand', { params: { hbrand: honey.hbrand, hphone: honey.hphone } })
      .then(response => {
        if (response.data === '') {
          alert('해당 업체가 없습니다')
        } else {
          console.log(response.data)
          let h = response.data
          setHoney({
            ...h,
            harrival: '국내',
          })
          setHoneymoonchkOk(true)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Header />
      <Section>
        <h1 style={{ margin: 'auto' }}>업체 게시물 등록</h1>
        <div className="Main">
          <form onSubmit={onSub} className="Content">
            <Sel
              name="type"
              onChange={onchType}
              defaultValue={opt}
              style={{ width: '100%', textAlign: 'center' }}
            >
              {options.map((item, idx) => (
                <option value={item.value} onChange={onchType}>
                  {item.label}
                </option>
              ))}
            </Sel>
            <table style={{ width: '100%', margin: 'auto' }}>
              {type == 'weddingHall' ? (
                <>
                  <tr style={{ height: '100px' }}>
                    <th colSpan={3}>예식장 입력</th>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <th rowSpan={5} style={{ width: '300px', height: '300px' }}>
                      <img
                        alt="img"
                        style={{ width: '300px', height: '300px' }}
                        src={`/upload/${wc.wimg}`}
                      ></img>
                    </th>
                  </tr>
                  {wcchkOk == false ? (
                    <>
                      <tr>
                        <th>예식장 명</th>
                        <td>
                          <input
                            className="Input"
                            name="wname"
                            onChange={onchWC}
                            style={{ width: '97%' }}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>업체 연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="wphone"
                            maxLength={11}
                            placeholder="연락처를 입력해주세요"
                            style={{ width: '77%' }}
                            onChange={onchWC}
                            required
                          />
                          &emsp;
                          <Button type="button" onClick={wcChk}>
                            업체 조회
                          </Button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <th>예식장 명</th>
                        <td>
                          <input
                            className="Input"
                            name="wname"
                            value={wc.wname}
                            onChange={onchWC}
                            style={{ width: '97%', border: 'none' }}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>예식장 연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="wphone"
                            maxLength={11}
                            value={wc.wphone}
                            placeholder="연락처를 입력해주세요"
                            style={{ width: '97%', border: 'none' }}
                            onChange={onchWC}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>예식장 주소</th>
                        <td>
                          <input
                            className="Input"
                            maxLength={11}
                            value={wc.wlocation}
                            placeholder="연락처를 입력해주세요"
                            style={{ width: '97%', border: 'none' }}
                            onChange={onchWC}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>예식장 상세주소</th>
                        <td>
                          <input
                            className="Input"
                            name="wphone"
                            maxLength={11}
                            value={wc.wlocation2}
                            style={{ width: '97%', border: 'none' }}
                            onChange={onchWC}
                            readOnly
                          />
                        </td>
                      </tr>

                      <tr style={{ height: '80px' }}>
                        <th colSpan={3}>웨딩홀 입력</th>
                      </tr>
                      <tr>
                        <th>웨딩홀 명</th>
                        <td colSpan={2}>
                          <input
                            className="Input"
                            name="whname"
                            onChange={onchWh}
                            style={{ width: '100%' }}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>예식 유형</th>
                        <td colSpan={2}>
                          <Sel
                            name="whkind"
                            onChange={onchWh}
                            defaultValue={wh.whkind}
                            style={{ width: '100%', textAlign: 'center' }}
                          >
                            {whtype.map((item, idx) => (
                              <option value={item.value} onChange={onchWh}>
                                {item.label}
                              </option>
                            ))}
                          </Sel>
                        </td>
                      </tr>
                      <tr>
                        <th>예식홀 수용인원</th>
                        <td colSpan={2}>
                          <input
                            className="Input"
                            type="number"
                            name="whamount"
                            style={{ width: '96%' }}
                            onChange={onchWh}
                            required
                          />
                          &ensp;명
                        </td>
                      </tr>
                      <tr>
                        <th>피로연 가능 인원</th>
                        <td colSpan={2}>
                          <input
                            className="Input"
                            type="number"
                            name="bmin"
                            style={{ width: '45%' }}
                            onChange={onchWh}
                            required
                          />
                          &ensp;명&ensp;~&ensp;
                          <input
                            className="Input"
                            type="number"
                            name="bmax"
                            style={{ width: '45%' }}
                            onChange={onchWh}
                            required
                          />
                          &ensp; 명
                        </td>
                      </tr>
                      <tr>
                        <th>피로연 1인 식대</th>
                        <td colSpan={2}>
                          <input
                            className="Input"
                            type="number"
                            name="bprice"
                            style={{ width: '95%' }}
                            onChange={onchWh}
                            required
                          />
                          &ensp;만원
                        </td>
                      </tr>
                      <tr>
                        <th>웨딩홀 대관 비용</th>
                        <td colSpan={2}>
                          <input
                            className="Input"
                            type="number"
                            name="whprice"
                            onChange={onchWh}
                            style={{ width: '95%' }}
                            required
                          />
                          &ensp;만원
                        </td>
                      </tr>
                      <tr>
                        <th>상세 내용</th>
                        <td colSpan={2}>
                          <textarea
                            className="Input"
                            name="whstr"
                            style={{ resize: 'none', height: '100px', width: '100%' }}
                            onChange={onchWh}
                            required
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </>
              ) : null}
              {type == 'sdm' ? (
                <>
                  <tr>
                    <td></td>
                    <td></td>
                    <th rowSpan={6} style={{ width: '300px', height: '300px' }}>
                      <img
                        alt="img"
                        style={{ width: '300px', height: '300px' }}
                        src={`/upload/${sdm.simg}`}
                      ></img>
                    </th>
                  </tr>
                  {!sdmchkOk ? (
                    <>
                      <tr>
                        <th>
                          스튜디오/드레스/메이크업 <br />
                          업체 명
                        </th>
                        <td>
                          <input
                            className="Input"
                            name="scomp"
                            onChange={onchSDM}
                            style={{ width: '97%' }}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>업체 연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="sphone"
                            maxLength={11}
                            placeholder="연락처를 입력해주세요"
                            style={{ width: '77%' }}
                            onChange={onchSDM}
                            required
                          />
                          &emsp;
                          <Button type="button" onClick={sdmChk}>
                            업체 조회
                          </Button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <th>
                          스튜디오/드레스/메이크업 <br />
                          업체 명
                        </th>
                        <td>
                          <input
                            className="Input"
                            name="scomp"
                            value={sdm.scomp}
                            style={{ width: '97%', border: 'none' }}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>업체 연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="sphone"
                            maxLength={11}
                            placeholder="연락처를 입력해주세요"
                            value={sdm.sphone}
                            onChange={onchSDM}
                            readOnly
                            style={{ width: '97%', border: 'none' }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>위치</th>
                        <td>
                          <input
                            className="Input"
                            name="slocation"
                            value={sdm.slocation}
                            readOnly
                            style={{ width: '97%', border: 'none' }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>상세 위치</th>
                        <td>
                          <input
                            className="Input"
                            name="slocation2"
                            value={sdm.slocation2}
                            readOnly
                            style={{ width: '97%', border: 'none' }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>가격</th>
                        <td>
                          <input
                            className="Input"
                            type="number"
                            name="sprice"
                            style={{ width: '89%' }}
                            onChange={onchSDM}
                            required
                          />
                          &ensp;만원
                        </td>
                      </tr>
                      <tr>
                        <th>상세 내용</th>
                        <td colSpan={2}>
                          <textarea
                            className="Input"
                            name="sstr"
                            style={{ resize: 'none', height: '200px', width: '100%' }}
                            onChange={onchSDM}
                            required
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </>
              ) : null}
              {type == 'planner' ? (
                <>
                  <tr>
                    <td></td>
                    <td></td>
                    <th rowSpan={4} style={{ width: '300px', height: '300px' }}>
                      <img
                        alt="img"
                        style={{ width: '300px', height: '300px' }}
                        src={`/upload/${plan.pimg}`}
                      ></img>
                    </th>
                  </tr>
                  {!planchkOk ? (
                    <>
                      <tr>
                        <th>플래너 명</th>
                        <td>
                          <input
                            className="Input"
                            name="pname"
                            onChange={onchPlan}
                            style={{ width: '97%' }}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="pphone"
                            maxLength={11}
                            placeholder="연락처를 입력해주세요"
                            style={{ width: '77%' }}
                            onChange={onchPlan}
                            required
                          />
                          &emsp;
                          <Button type="button" onClick={planChk}>
                            플래너 조회
                          </Button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <th>플래너 명</th>
                        <td>
                          <input
                            className="Input"
                            name="pname"
                            onChange={onchPlan}
                            value={plan.pname}
                            style={{ width: '97%', border: 'none' }}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="pphone"
                            maxLength={11}
                            placeholder="연락처를 입력해주세요"
                            value={plan.pphone}
                            onChange={onchPlan}
                            readOnly
                            style={{ width: '97%', border: 'none' }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>가격</th>
                        <td>
                          <input
                            className="Input"
                            type="number"
                            name="pprice"
                            // value={plan.pprice}
                            style={{ width: '89%' }}
                            onChange={onchPlan}
                            required
                          />
                          &ensp;만원
                        </td>
                      </tr>
                      <tr>
                        <th>상세 내용</th>
                        <td colSpan={2}>
                          <textarea
                            className="Input"
                            name="pstr"
                            value={plan.pstr}
                            style={{ resize: 'none', height: '200px', width: '100%' }}
                            onChange={onchPlan}
                            required
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </>
              ) : null}
              {type == 'honeymoon' ? (
                <>
                  <tr>
                    <td></td>
                    <td></td>
                    <th rowSpan={6} style={{ width: '300px', height: '300px' }}>
                      <img
                        alt="img"
                        style={{ width: '300px', height: '300px' }}
                        src={`/upload/${honey.himg}`}
                      ></img>
                    </th>
                  </tr>
                  {!honeymoonchkOk ? (
                    <>
                      <tr>
                        <th>여행사 명</th>
                        <td>
                          <input
                            className="Input"
                            name="hbrand"
                            onChange={onchHM}
                            style={{ width: '97%' }}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="hphone"
                            maxLength={11}
                            placeholder="연락처를 입력해주세요"
                            style={{ width: '77%' }}
                            onChange={onchHM}
                            required
                          />
                          &emsp;
                          <Button type="button" onClick={honeymoonChk}>
                            여행사 조회
                          </Button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <th>여행사 명</th>
                        <td>
                          <input
                            className="Input"
                            name="hbrand"
                            onChange={onchHM}
                            value={honey.hbrand}
                            style={{ width: '97%', border: 'none' }}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>연락처</th>
                        <td>
                          <input
                            className="Input"
                            name="hphone"
                            maxLength={11}
                            placeholder="연락처를 입력해주세요"
                            value={honey.hphone}
                            onChange={onchHM}
                            readOnly
                            style={{ width: '97%', border: 'none' }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>국내/해외 구분</th>
                        <td>
                          <Sel
                            name="harrival"
                            onChange={onchHM}
                            style={{ width: '97%', textAlign: 'center' }}
                            defaultValue={honey.harrival}
                          >
                            {arrival.map(item => (
                              <option value={item.value} onChange={onchHM}>
                                {item.label}
                              </option>
                            ))}
                          </Sel>
                        </td>
                      </tr>
                      <tr>
                        <th>여행지</th>
                        <td>
                          <input
                            className="Input"
                            name="hlocation"
                            value={honey.hlocation}
                            style={{ width: '97%' }}
                            onChange={onchHM}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>가격</th>
                        <td>
                          <input
                            className="Input"
                            type="number"
                            name="hcost"
                            value={honey.hcost}
                            style={{ width: '89%' }}
                            onChange={onchHM}
                            required
                          />
                          &ensp;만원
                        </td>
                      </tr>
                      <tr>
                        <th>상세 내용</th>
                        <td colSpan={2}>
                          <textarea
                            className="Input"
                            name="hstr"
                            value={honey.hstr}
                            style={{ resize: 'none', height: '200px', width: '100%' }}
                            onChange={onchHM}
                            required
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </>
              ) : null}
              <tr>
                <th>관련 사진 자료</th>
                <td>
                  {fileImage && (
                    <div>
                      {fileImage.map(v => (
                        <div>
                          <img alt="image" src={v} style={{ width: '500px', height: '500px' }} />
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    type="file"
                    name="files"
                    multiple
                    className="Input"
                    ref={imageInput}
                    onChange={onFileChange}
                    style={{
                      display: 'none',
                    }}
                    required
                  />
                  <button type="button" className="filebtn" onClick={onClickImg}>
                    첨부하기
                  </button>
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
      <Footer />
    </>
  )
}

export default AdminBrandBoardWr
