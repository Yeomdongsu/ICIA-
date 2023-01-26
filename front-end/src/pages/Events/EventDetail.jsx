import { useParams } from "react-router"
import { Link } from "react-router-dom"
import styled from "styled-components"
import FlexBox from "../../components/common/FlexBox"
import Stack from "../../components/common/Stack"
import Typhography from "../../components/common/Typhography"
import Wrapper from "../../components/common/Wrapper"
import Footer from "../../components/footer/Footer"
import Button from "../../components/form/Button"
import Header from "../../components/header/Header"
import { getEventById } from "../../data/events"
import EstimateBanner from '../../components/estimate/EstimateBanner'

const EventButton = styled(Button)`
    padding-left: 20px;
    padding-right: 20px;
`

export default (params) => {
    const { id } = useParams()
    const event = getEventById(Number(id))
    console.log(id, event)

    return <div>
        <Header />
        <EstimateBanner text='Event' />
        <Wrapper style={{ padding: '120px 0 200px' }}>
            <Stack division>
            <Typhography size='xl' font='medium'>{event.title}</Typhography>
            <FlexBox gap={50} align="flex-end" style={{ width: '100%', paddingBottom: '100px', textAlign: 'center'  }}>
                <img src={event.image} style={{ width: '40%' }} />
                <Typhography size="md" font='medium'>{event.content}</Typhography>
            </FlexBox>
            <FlexBox style={{ width: '100%' }} justify="space-between">
            <FlexBox gap={10}>
                <EventButton>수정</EventButton>
                <EventButton>삭제</EventButton>
            </FlexBox>
            <Link to="/event"><EventButton>목록</EventButton></Link>
            </FlexBox>
            </Stack>
        </Wrapper>
        <Footer />
    </div>
}