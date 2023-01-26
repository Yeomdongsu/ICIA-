package com.finalproject.wedding.service;

import com.finalproject.wedding.entity.Event;
import com.finalproject.wedding.entity.Files;
import com.finalproject.wedding.entity.Member;
import com.finalproject.wedding.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Log
public class EventService {
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

    // 이벤트 전체 리스트 검색
    public List<Event> eventList() {
        log.info("searchEventList()");
        List<Event> eList = new ArrayList<>();
        try {
            eList = (List<Event>) eveRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return eList;
    }

    // 이벤트 페이징 처리
    @GetMapping("evnetPage")
    public Map<String, Object> eventPage(Integer pageNum) {
        log.info("evnetPage()");

        if (pageNum == null) {
            pageNum = 1;
        }
        int listCnt = 10;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC, "eidx");
        Page<Event> result = eveRepo.findByEidxGreaterThan(0, pb);
        List<Event> eveList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("eveList", eveList);

        return res;
    }

    // 단일 이벤트 검색
    public Event searchEvent(Event event) {
        log.info("searchEvent()");
        Event eve = new Event();
        try {
            eve = eveRepo.findByEidx(event.getEidx());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return eve;
    }

    // 이벤트 입력
    public String inputEvent(Event event, List<MultipartFile> files, HttpSession session) {
        log.info("inputEvent()");
        String msg = "fail";
        try {
            eveRepo.save(event);
            if (files != null) {
                log.info("files not null");
                fileUpload(files, session, event.getEidx());
                log.info("files not null and fileUploading");
            } else {
                log.info("Not Files");
            }
            log.info("입력 성공");
            msg = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            log.info("입력 실패");
        }
        return msg;
    }

    // 이벤트 파일 업로드
    public void fileUpload(List<MultipartFile> files, HttpSession session, int idx)
            throws Exception {
        log.info("fileUpload()");
        // 파일 저장 위치 지정. session을 활용
        String realPath = session.getServletContext().getRealPath("/");
        log.info("realPath : " + realPath);
        // 파일 업로드용 폴더를 자동으로 생성하도록 처리
        // 업로드용 폴더 : upload
        realPath += "upload/";
        File folder = new File(realPath);
        if (folder.isDirectory() == false) { // 폴더가 없을 경우 실행
            folder.mkdir(); // 폴더 생성 메소드
        }
        for (MultipartFile mf : files) {
            String orname = mf.getOriginalFilename(); // 업로드 파일명 가져오기
            if (orname.equals("")) {
                // 업로드할 파일이 없음
                return; // 저장처리 중지
            }

            // 파일 정보를 저장(to filetbl)
            Files ef = new Files();
            Event event = eveRepo.findByEidx(idx);
            ef.setFid(event.getEidx()); // 뮨제 생기면 여기임
            ef.setForiname(orname);
            String sysname = System.currentTimeMillis() +
                    orname.substring(orname.lastIndexOf("."));
            ef.setFsysname(sysname);
            ef.setFtype("Event");

            // 업로드하는 파일을 upload 폴더에 저장
            File file = new File(realPath + sysname);

            // 파일 저장(upload 폴더)
            mf.transferTo(file);

            // 파일 정보를 DB에 저장
            bfRepo.save(ef);
        }
    }


    // 이벤트 업데이트
    public String updateEvent(Event event, List<MultipartFile> files, HttpSession session) {
        log.info("updateEvent()");
        String msg = "fail";
        Member test = (Member) session.getAttribute("member");

        if (test.getGrade().equals("admin")) {
            try {
                eveRepo.save(event);
                if (files != null) {
                    log.info("files not null");
                    fileUpload(files, session, event.getEidx());
                    log.info("files not null and fileUploading");
                } else {
                    log.info("파일이 없어요");
                }
                log.info("수정 완료");
                msg = "ok";
            } catch (Exception e) {
                e.printStackTrace();
                log.info("수정 실패");
            }
        } else {
            log.info("관리자만 사용가능한 기능");
        }
        return msg;
    }

    // 이벤트 삭제
    @Transactional
    public String deleteEvent(Event event, HttpSession session) {
        log.info("deleteEvent()");
        String msg = "fail";
        Member test = (Member) session.getAttribute("member");

        String realPath = session.getServletContext().getRealPath("/");
        realPath += "upload/";

        List<Files> efList = fRepo.findByFid(event.getEidx());

        if (test.getGrade().equals("admin")) {
            try {
                for (Files f : efList) {
                    realPath += f.getFsysname();
                    File file = new File(realPath);

                    if (file.exists())
                        file.delete();

                    fRepo.deleteByFid(event.getEidx());
                    eveRepo.delete(event);
                    log.info("삭제 완료");
                    msg = "ok";
                }
            } catch (Exception e) {
                e.printStackTrace();
                log.info("삭제 실패");
            }
        } else {
            log.info("관리자만 사용가능한 기능");
        }
        return msg;
    }

    public List<Event> eventGet() {
        List<Event> eList = new ArrayList<>();
        try {
            eList=(List<Event>)eveRepo.findAll();
        }catch (Exception e){
            e.printStackTrace();
        }
        return eList;
    }
}