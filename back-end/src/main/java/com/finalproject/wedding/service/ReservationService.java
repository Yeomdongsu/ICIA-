package com.finalproject.wedding.service;

import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
@Log
public class ReservationService {
    @Autowired
    private MemberRepository mRepo;
    @Autowired
    private BoardRepository bRepo;
    @Autowired
    private CommentRepository cRepo;
    @Autowired
    private DeclareRepository desRepo;
    @Autowired
    private DibRepository dibRepo;
    @Autowired
    private EventRepository eveRepo;
    @Autowired
    private FilesRepository fRepo;
    @Autowired
    private HoneyMoonRepository hmRepo;
    @Autowired
    private PlannerRepository planRepo;
    @Autowired
    private ReservationRepository resRepo;
    @Autowired
    private SDMRepository sdmRepo;
    @Autowired
    private WeddingCompRepository wcRepo;
    @Autowired
    private WeddingHoleRepository whRepo;

    @Autowired
    private FilesRepository bfRepo; // 파일 DB 처리용

    // 예약 입력(삭제 예정)
    public String insertRes(List<Reservations> res, int idx,
                            String type, HttpSession session) {
        log.info("insertRes()");
        Member member = (Member) session.getAttribute("member");
        String msg = "fail";
        try{
            for(Reservations r : res) {
                switch (type) {
                    case "허니문":
                        r.setRhidx(idx);
                        break;
                    case "플래너":
                        r.setRpidx(idx);
                        break;
                    case "예식홀":
                        r.setRwhidx(idx);
                        break;
                    case "스드메":
                        r.setRsidx(idx);
                        break;
                }

                r.setRmid(member.getMpid());
                resRepo.save(r);
            }
            msg = "ok";
            log.info("입력 완료");
        }catch (Exception e){
            e.printStackTrace();
            log.info("입력 실패");
        }
        return msg;
    }

    // 예약 목록 모두 조회
    public List<Reservations> searchAllRes() {
        log.info("searchAllRes()");
        List<Reservations> res = new ArrayList<>();
        try{
            res = (List<Reservations>) resRepo.findAll();
            log.info("탐색 완료");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return res;
    }

    // 예약 조건 조회
    public List<Reservations> searchRes(String type, String str) {
        log.info("searchRes()");
        List<Reservations> res = new ArrayList<>();
        List<HoneyMoon> hm = new ArrayList<>();
        List<SDM> sdm = new ArrayList<>();
        List<WeddingHall> wh = new ArrayList<>();
        List<Planner> pl = new ArrayList<>();
        Reservations r = new Reservations();

        try{
            switch (type){
                case "카테고리":
                    res = resRepo.findByRtypeContaining(str);
                    break;
                case "예약자":
                    res = resRepo.findByRmidContaining(str);
                    break;
                case "업체명":
                    sdm = sdmRepo.findByScompContaining(str);
                    hm = hmRepo.findByHbrandContaining(str);
                    wh = whRepo.findByWhnameContaining(str);
                    pl = planRepo.findByPnameContaining(str);

                    for(SDM s : sdm){
                        r = resRepo.findByRsidx(s.getSidx());
                        if(!r.getRmid().isEmpty())
                            res.add(r);
                    }

                    for(HoneyMoon h : hm){
                        r = resRepo.findByRhidx(h.getHidx());
                        if(!r.getRmid().isEmpty())
                            res.add(r);
                    }

                    for(WeddingHall w : wh){
                        r = resRepo.findByRwhidx(w.getWhidx());
                        if(!r.getRmid().isEmpty())
                            res.add(r);
                    }

                    for(Planner p : pl){
                        r = resRepo.findByRpidx(p.getPidx());
                        if(!r.getRmid().isEmpty())
                            res.add(r);
                    }
                    break;
                default:
                    res = (List<Reservations>) resRepo.findAll();
                    break;
            }
            log.info("탐색 완료");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return res;
    }

    // 예약 상태 취소 변경 기능
    public String cancelRes(Reservations res) {
        log.info("cancelRes()");
        String msg = "fail";
        try{
            res.setRstatus("예약 취소");
            resRepo.save(res);
            log.info("업데이트 완료");
            msg = "ok";
        }catch (Exception e){
            e.printStackTrace();
            log.info("업데이트 실패");
        }
        return msg;
    }
}
