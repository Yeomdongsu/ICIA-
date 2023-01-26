package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.Reservations;
import com.finalproject.wedding.service.HomeService;
import com.finalproject.wedding.service.MemberService;
import com.finalproject.wedding.service.PaymentService;
import com.finalproject.wedding.service.ReservationService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class ReservationController {
    @Autowired
    private HomeService hServ;

    @Autowired
    private MemberService mServ;

    @Autowired
    private PaymentService paySev;

    @Autowired
    private ReservationService resSev;

    // 예약 입력
    @PostMapping("resInsert")
    public String resInsert(@RequestPart(value = "data") List<Reservations> res,
                            @RequestParam(value = "idx") int idx,
                            @RequestParam(value = "type") String type,
                            HttpSession session){
        log.info("resInsert()");
        return resSev.insertRes(res,idx ,type, session);
    }

    // 예약 목록 전체 조회
    @PostMapping("resSearchAll")
    public List<Reservations> resSearchAll() {
        log.info("resSearchAll()");
        return resSev.searchAllRes();
    }

    // 예약 목록 특정 타입별 조회
    @PostMapping("resSearch")
    public List<Reservations> resSearh(@RequestParam(value = "type")String type,
                                       @RequestParam(value = "data")String str){
        log.info("resSearch()");
        return resSev.searchRes(type, str);
    }

    // 예약 취소
    @PostMapping("resCancel")
    public String resCancel(@RequestPart(value = "data")Reservations res){
        log.info("resCancel()");
        return resSev.cancelRes(res);
    }
}
