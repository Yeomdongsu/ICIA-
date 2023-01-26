import { useEffect, useState } from 'react'
import { MapMarker, Map, CustomOverlayMap } from 'react-kakao-maps-sdk'
import jerry from '../company/jerry.gif'
import Section from '../main/Section'
import info1 from './회사 인포.png'
import info2 from './회사인포 2.png'

const CompMap = () => {
  const { kakao } = window

  const geocoder = new kakao.maps.services.Geocoder()

  const [mapCenter, setMapCenter] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871, lng: 127.02474726 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
    level: 3,
  })

  useEffect(() => {
    // 주소 검색
    geocoder.addressSearch('학익동 663-1번지', function(result, status) {
      // 성공적으로 탐색
      if (status === kakao.maps.services.Status.OK) {
        let coords = result[0]
        setMapCenter({
          // 지도의 초기 위치
          center: { lat: coords.y, lng: coords.x },
          // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
          isPanto: true,
          level: 3,
        })
      }
    })
  }, [])

  const [isTY, setIsTY] = useState(false)

  return (
    <Section>
      {/* <MarkerWithCustomOverlayStyle /> */}
      <div>
        <img src={info1} style={{ width: '100%' }}></img>
      </div>
      <div>
        <img src={info2} style={{ width: '100%' }}></img>
      </div>
      <br />
      <h1 style={{ margin: 'auto' }}>찾아오시는 길</h1>
      <br />
      <Map // 지도 표시 컨테이너
        center={mapCenter.center}
        isPanto={mapCenter.isPanto}
        level={mapCenter.level}
        style={{ width: '100%', height: '500px', zIndex: '0' }}
      >
        <MapMarker position={mapCenter.center}>
          {/* <div style={{ color: 'blue' }}>여기에요 살려줘요</div> */}
        </MapMarker>
        <CustomOverlayMap
          position={mapCenter.center}
          yAnchor={2} // 마커와의 간격 조정
        >
          <div
            className="customoverlay"
            style={{ padding: '10px', background: '#4f4f4f', borderRadius: '50px' }}
            onClick={() => setIsTY(true)}
          >
            <div style={{ color: 'white' }}>여기에요</div>
          </div>
          {isTY && (
            <CustomOverlayMap position={mapCenter.center}>
              <div>
                <img src={jerry} width={200} height={200} onClick={() => setIsTY(false)} />
              </div>
            </CustomOverlayMap>
          )}
        </CustomOverlayMap>
      </Map>
    </Section>
  )
}

export default CompMap
