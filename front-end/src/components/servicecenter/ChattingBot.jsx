import React from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import jb from "./jb.jpeg"

const ChattingBot = ({img, setImg}) => {
    const steps = [
        {
            id: '0', 
            message : '안녕하세요 회원님💙 Wedding Dive 챗봇입니다.',
            trigger: '1',
        },
        {
            id: '1',
            message : '준비가 되셨다면 시작버튼을 눌러 주세요.',
            trigger: '2',
            // end:true
        },
        {
            id: '2',
            options: [
              { value: 1, label: '시작하기', trigger: '3' }
            ],
        },
        {
            id: '3',
            options : [
                { value: 1, label: '자주 묻는 질문', trigger: '4'},
                { value: 2, label: '정배 왕자의 하루💕', trigger: '98'},
            ]
        },
        {
            id: '4',
            options : [
                {value: 1, label: '왜 Wedding Dive인가요? 💕', trigger:'5'},
                {value: 2, label: '예식 사진촬영시 친구는 몇명이 적당한가요? 💕', trigger: '6'},
                {value: 3, label: '드레스를 잘 고르는 법이 있나요? 💕', trigger: '7'},
                {value: 4, label: '신혼여행 준비는 언제쯤 하는 게 좋나요? 💕', trigger: '10'},
                {value: 5, label: '신랑님 체크사항 💕', trigger:'12'},
                {value: 6, label: '신부님 체크사항 💕', trigger:'17'},
                {value: 7, label: '차은우 전화번호 💕', trigger:'18'},
                {value: 8, label: '추가 다른 문의는❔💕', trigger:'19'}
            ]
        },
        {
            id: '5',
            message : '결혼하고 싶은 우리 모두의\n소망을 담아 만들었습니다.',
            trigger:'99'
        },
        {
            id: '6',
            message : '적게는 18명에서 많게는\n25명까지 줄을 섭니다.',
            trigger:'99'
        },
        {
            id: '7',
            message : '기본적으로 드레스를 결정하실 때엔 신부님 체형의 단점은 커버해주고 장점은 부각시켜 주는 드레스를 선택해야 합니다.\n\n 하체에 콤플렉스가 있는 신부님의 경우 허리라인은 살려주고 하체 라인이 돋보이지 않게 가려줄 A라인이나 벨라인 드레스가 어울리며\n\n키가 크고 골반이 있으신 분들은 머메이드 라인이 어울립니다.',
            trigger: '99',
        },
        {
            id:'10',
            message : '보통 허니문을 예약하시는 평균적인 시기는 출발 6개월 전이지만 예식 날짜와 예식장 결정이 되시면 바로 준비하셔야 합니다.\n\n 왜냐!! 허니문 비용을 가장 효과적으로 줄일 수 있는 방법이 바로 항공권이기 때문이에요.',
            trigger: '99',
        },
        {
            id:'12',
            message:'- 구두 색깔과 같은 목이 긴 양말 착용\n\n- 식장에 디피해 놓을 액자를 받지 못하였다면 예식 당일 반드시 수령\n\n- 웨딩카와 웨딩카에 장식이 되어있는지 체크\n\n- 주례자와 사회자 도착 여부 확인\n\n- 여행가방과 지갑 등을 미리 식구나 친구에게 부탁하여 웨딩카에 넣어 두었는지 확인',
            trigger:'99',
        },
        {
            id:'17',
            message:'- 충분한 휴식, 숙면, 신부님을 도와줄 친구 섭외',
            trigger:'99',
        },
        {
            id:'18',
            message:'010 - 4063 - 6618입니다.', 
            trigger:'99',
        },
        {
            id:'19',
            message:'자세한 1:1 문의는 아래 링크를 클릭하세요!',
            trigger:'20',
        },
        {   
            id:'20',
            component : (
                <a href="/ServiceCenter" style={{color:'white', marginLeft:'5px', fontSize:'17px'}}>1:1 문의하러 가기</a>
            ),
            trigger: '99',
        },
        
        {
            id: '98',
            message : '기상 - 식사 - 학원 -\n편의점 - 족발 - 식사입니다.',
            trigger:'jb'
        },
        {
            id: 'jb',
            component : (
                <img src={jb} style={{width:"280px", height:"300px"}}/>
            ),
            trigger:'99'
        },
        {
            id: '99',
            options: [
            { value: 1, label: '처음으로', trigger: '3'},
            { value: 2, label: '종료하기', trigger: '100'},
            ]
        },
        {
            id: '100',
            message : '감사합니다.\n좋은 하루 되세요 :)',
            end : true
        },
    ]

    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        // headerBgColor: '#EF6C00',
        headerBgColor : '#F7ECEC',
        // FontWeight : '200',
        // headerFontColor: '#fff',
        headerFontColor : 'black',
        headerFontSize: '15px',
        // botBubbleColor: '#EF6C00',
        botBubbleColor : '#EBF7FF',
        botFontColor: '#black',
        userBubbleColor: 'white',
        userFontColor: 'black',
    };
    const st = {
        position : 'fixed',
        bottom : "90px", right : "80px",
        whiteSpace: "pre-line"
    }
    const xbtn = {
        position : 'fixed', 
        bottom : '568px', 
        right :'100px', 
        color :'black',
        zIndex : '1000',
        cursor : 'pointer',
    }
    return (
        <>
        <h3 style={xbtn} onClick={() => setImg(!img)}>✖</h3>
        <ThemeProvider theme={theme} >
            <ChatBot steps={steps} 
            headerTitle="Wedding Dive 채팅봇"
            placeholder="채팅이 불가능한 채널입니다."
            botDelay={500} userDelay={500} style={st}
            // 인풋 검색창 스타일
            // inputStyle={{position : "fixed", bottom : "0"}}
            // 봇 아바타 스타일
            avatarStyle={{width : '46px', background:'#EBF7FF'}} 
            // avatarStyle={{width : '180px', height:'180px'}} 
            // 선택 버튼 스타일
            bubbleOptionStyle={{width : '330px', background : '#F7ECEC', color:'black'}} 
            contentStyle={{width:"415px"}} 
            customStyle={{background:"#DB8383", width:"338px", }}
            />
        </ThemeProvider>

        </>
    );    
}

export default ChattingBot;