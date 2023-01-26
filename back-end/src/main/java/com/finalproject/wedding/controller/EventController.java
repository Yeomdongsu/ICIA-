package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.Event;
import com.finalproject.wedding.entity.Member;
import com.finalproject.wedding.service.EventService;
import com.finalproject.wedding.service.HomeService;
import com.finalproject.wedding.service.MemberService;
import com.finalproject.wedding.service.PaymentService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class EventController {
    @Autowired
    private HomeService hServ;

    @Autowired
    private MemberService mServ;

    @Autowired
    private PaymentService paySev;

    @Autowired
    private EventService eServ;

    // 로그인 확인
    public String checkLogin(HttpSession session){
        log.info("checkLogin()");
        Member m = (Member) session.getAttribute("member");
        if(m.getGrade().equals("admin"))
            return "admin";
        return "user";
    }

    // 이벤트 리스트
    @GetMapping("event")
    public List<Event> event(){
        log.info("event()");
        List<Event> eList;
        eList =eServ.eventList();
        return eList;
    }

    // 이벤트 페이징
    @GetMapping ("eventPage")
    public Map<String, Object> eventPage(@RequestParam Integer pageNum){
        log.info("getList()");
        return eServ.eventPage(pageNum);
    }

    @GetMapping("eventGet")
    public  List<Event> eventGet(){
        log.info("eventGet()");
        return eServ.eventGet();
    }
    // 이벤트 상세 조회
    @GetMapping("eventDetail")
    public Event eventDetail(@RequestPart(value = "data")Event event){
        log.info("eventDetail()");
        Event e = eServ.searchEvent(event);
        return e;
    }

    // 이벤트 추가
    @GetMapping("insertEvent")
    public String insertEvent(@RequestPart(value = "data")Event event,
                              @RequestPart(value = "files", required = false) List<MultipartFile> files,
                              HttpSession session){
        log.info("insertEvent()");
        if(checkLogin(session).equals("admin"))
            return eServ.inputEvent(event, files, session);
        return "fail";
    }

    // 이벤트 업데이트
    @GetMapping("updateEvent")
    public String updateEvent(@RequestPart(value = "data") Event event,
                              @RequestPart(value = "files", required = false) List<MultipartFile> files,
                              HttpSession session){
        log.info("updateEvent()");
        if(checkLogin(session).equals("admin"))
            return eServ.updateEvent(event, files, session);
        return "fail";
    }

    // 이벤트 삭제
    @GetMapping("deleteEvent")
    public String deleteEvent(@RequestPart(value = "data") Event event, HttpSession session){
        if(checkLogin(session).equals("admin"))
            return eServ.deleteEvent(event, session);
        return "fail";
    }
}
