package com.finalproject.wedding.service;

import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.repository.*;
import lombok.extern.java.Log;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Pair;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.*;

@Service
@Log
public class HomeService {

    // Repository 선언

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

    // 모아보기 전체 기능
    // 허니문 전체 검색
    public List<HoneyMoon> searchHoneyMoonAll() {
        log.info("searchHoneyMoonAll()");
        List<HoneyMoon> hmList = new ArrayList<>();
        try{

            hmList = hmRepo.findByHlocation();
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return hmList;
    }

    // 플래너 전체 검색
    public List<Planner> searchPlanerAll() {
        log.info("searchPlanerAll()");
        List<Planner> pList = new ArrayList<>();
        try{
            pList = (List<Planner>) planRepo.findAll();
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return pList;
    }

    // 웨딩홀 전체 검색
    public List<WeddingHall> searchWeddingHallAll() {
        log.info("searchWeddingHallAll()");
        List<WeddingHall> whList = new ArrayList<>();

        try{
            whList = (List<WeddingHall>) whRepo.findAll();
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return whList;
    }

    // 예식장 전체 검색 - 윤희
    public List<WeddingComp> searchWeddingCompAll() {
        log.info("searchWeddingCompAll()");
        List<WeddingComp> wcList= new ArrayList<>();
        try{
            wcList=(List<WeddingComp>) wcRepo.findAll();
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return wcList;
    }

    // 스드메 전체 검색
    public List<SDM> searchSdmAll() {
        log.info("searchSdmAll()");
        List<SDM> sList = new ArrayList<>();

        try{
            sList = (List<SDM>) sdmRepo.findAll();
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return sList;
    }

    // 모아보기-허니문
    public HoneyMoon searchHoneyMoon(HoneyMoon honeymoon) {
        log.info("searchHoneyMoon-controller()");
        HoneyMoon hm = new HoneyMoon();
        try{
            hm = hmRepo.findByHidx(honeymoon.getHidx());
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return hm;
    }
    // 모아보기-플래너
    public Planner searchPlanner(Planner planner) {
        log.info("searchPlanner-controller()");
        Planner pl = new Planner();

        try{
            pl = planRepo.findByPidx(planner.getPidx());
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return pl;
    }

    // 모아보기-스드메
    public SDM searchSdm(SDM s) {
        log.info("searchSdm-controller()");
        SDM sd2 = new SDM();

        try{
            sd2 = sdmRepo.findBySidx(s.getSidx());
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return sd2;
    }

    // 모아보기-웨딩홀
    public WeddingHall searchWeddingHall(WeddingHall weddinghall) {
        log.info("searchWeddingHall-controller()");
        WeddingHall hall = new WeddingHall();
        try{
            hall = whRepo.findByWhidx(weddinghall.getWhidx());
            log.info("탐색 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("탐색 실패");
        }
        return hall;
    }

    public String localFileSave(List<MultipartFile> files,HttpSession session) throws IOException {
        String realPath = session.getServletContext().getRealPath("/");
        realPath += "upload/";
        log.info("realPath: " + realPath);
        File folder = new File(realPath);
        if (folder.isDirectory() == false) {
            folder.mkdir();
        }
        String orname="";
        for (MultipartFile mf : files) {
            // 중복파일저장을 위해서 밀리초를 이름에 붙여줌
            orname = System.currentTimeMillis() + mf.getOriginalFilename();
            if (orname.equals("")) {
                break;
            }
            File file = new File(realPath + orname);
            mf.transferTo(file);
        }
        log.info("로컬에 파일저장완료");
        // 각 회사(브랜드)별 대표사진은 하나이므로 따로 파일테이블과의 연결 없음
        return orname;
    }
    public String insertWeddingCompBr(JSONObject obj, List<MultipartFile> files, HttpSession session) {
        log.info("insert예식장");
        WeddingComp wcomp = new WeddingComp();
        log.info(obj.toString());
        String oriname="";
        try {
            // wcomp에 세팅
            wcomp.setWname(obj.getString("name"));
            wcomp.setWlocation(obj.getString("location"));
            wcomp.setWlocation2(obj.getString("location2"));
            wcomp.setWphone(obj.getString("phone"));
            log.info("파일을 저장중");
            try {
                oriname = localFileSave(files, session);
            }catch (Exception e) {
                e.printStackTrace();
            }
            wcomp.setWimg(oriname);
            log.info("로컬에 파일저장완료");
            wcRepo.save(wcomp);
            log.info("데이터베이스 저장완료");
            // 각 회사(브랜드)별 대표사진은 하나이므로 따로 파일테이블과의 연결 없음
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }

    public String insertSdmBr(JSONObject obj, List<MultipartFile> files, HttpSession session) {
        log.info("insert스드메");
        SDM sdm = new SDM();
        log.info(obj.toString());
        String oriname="";
        try {
            // sdm에 세팅
            sdm.setScomp(obj.getString("name"));
            sdm.setSlocation(obj.getString("location"));
            sdm.setSlocation2(obj.getString("location2"));
            sdm.setSphone(obj.getString("phone"));
            log.info("파일을 저장중");
            try {
                oriname = localFileSave(files, session);
            }catch (Exception e) {
                e.printStackTrace();
            }
            sdm.setSimg(oriname);
            log.info("로컬에 파일저장완료");
            sdmRepo.save(sdm);
            log.info("데이터베이스 저장완료");
            // 각 회사(브랜드)별 대표사진은 하나이므로 따로 파일테이블과의 연결 없음
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }

    public String insertPlannerBr(JSONObject obj, List<MultipartFile> files, HttpSession session) {
        log.info("insert플래너");
        Planner planner = new Planner();
        log.info(obj.toString());
        String oriname="";
        try {
            // planner에 세팅
            planner.setPname(obj.getString("name"));
            planner.setPphone(obj.getString("phone"));
            log.info("파일을 저장중");
            try {
                oriname = localFileSave(files, session);
            }catch (Exception e) {
                e.printStackTrace();
            }
            planner.setPimg(oriname);
            log.info("로컬에 파일저장완료");
            planRepo.save(planner);
            log.info("데이터베이스 저장완료");
            // 각 회사(브랜드)별 대표사진은 하나이므로 따로 파일테이블과의 연결 없음
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }

    // 여행사
    public String insertHoneymoonBr(JSONObject obj, List<MultipartFile> files, HttpSession session) {
        log.info("insert허니문");
        HoneyMoon honeyMoon = new HoneyMoon();
        log.info(obj.toString());
        String oriname="";
        try {
            // honeyMoon에 세팅
            honeyMoon.setHbrand(obj.getString("name"));
            honeyMoon.setHphone(obj.getString("phone"));
            log.info("파일을 저장중");
            try {
                oriname = localFileSave(files, session);
            }catch (Exception e) {
                e.printStackTrace();
            }
            honeyMoon.setHimg(oriname);
            log.info("로컬에 파일저장완료");
            hmRepo.save(honeyMoon);
            log.info("데이터베이스 저장완료");
            // 각 회사(브랜드)별 대표사진은 하나이므로 따로 파일테이블과의 연결 없음
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }

    // 랭킹
    public List<Integer> rankWh() {
        log.info("rankWh()");
        List<WeddingHall> wh;
        Map<String, Integer> rank = new HashMap<>();

        // Map의 키값을 기준으로 리스트 형성
        List<Integer> rankList = new ArrayList<>(rank.values());
        try{
            wh = (List<WeddingHall>) whRepo.findAll();

            for(WeddingHall w : wh){
                int num = resRepo.countByRwhidx(w.getWhidx());
                String name = w.getWhname();
                rank.put(name, num);
            }

            // 정렬
            //keyList.sort((s1, s2) -> s1.compareTo(s2));
            rankList.sort(Integer::compareTo);
            log.info("조회 성공");
        }catch (Exception e){
            e.printStackTrace();
            log.info("조회 실패");
        }
        return rankList;
    }

    public Map<String, Object> searchWeddingCompAllPage(Integer pageNum) {
        log.info("searchWeddingCcomAllPage");
        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 5;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.ASC, "widx");

        Page<WeddingComp> result = wcRepo.findByWidxGreaterThan(0, pb);
        List<WeddingComp> weddingComps = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("wcList", weddingComps);
        res.put("pageNum", pageNum);
        res.put("totalPage", totalPage);

        log.info("" + result.getContent());

        return res;
    }

    public Map<String, Object> searchWeddingHallAllPage(Integer pageNum){
        log.info("searchWeddingHallAllPage");
        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 5;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.ASC,"whidx");
        Page<WeddingHall> result = whRepo.findByWhidxGreaterThan(0, pb);
        List<WeddingHall> whList = result.getContent();

        for(WeddingHall wh:whList){
            WeddingComp wc = wcRepo.findByWidx(wh.getWhwcidx());
            wh.setWhwc(wc);
        }

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();

        res.put("whList", whList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);

        return res;
    }


    public Map<String, Object> searchSdmAllPage(Integer pageNum, String no) {
        log.info("searchSdmAllPage");
        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 5;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.ASC, "sidx");
        Page<SDM> result = null;
        if (no == null) {
            result = sdmRepo.findBySstrIsNull(pb);
        }
        else{
            result= sdmRepo.findBySstr(pb);
        }
        List<SDM> sList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("sList", sList);
        res.put("pageNum", pageNum);
        res.put("totalPage", totalPage);

        log.info("" + result.getContent());
        return res;
    }

    public Map<String, Object> searchPlannerAllPage(Integer pageNum, String no) {
        log.info("searchPlannerAllPage");
        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 5;

        Page<Planner> result = null;
        Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.ASC, "pidx");
        if(no==null){
            result = planRepo.findByPidxGreaterThan(0,pb);
        }
        else{
            result = planRepo.findByPstr(pb);
        }
        List<Planner> pList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("pList", pList);
        res.put("pageNum", pageNum);
        res.put("totalPage", totalPage);

        log.info("" + result.getContent());
        return res;
    }

    public Map<String, Object> searchHoneyMoonAllPage(Integer pageNum,String no) {
        log.info("searchHoneyMoonAllPage");
        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 5;
        Page<HoneyMoon> result = null;
        Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.ASC, "hidx");
        if(no==null){
            result = hmRepo.findByHstrIsNull(pb);
        }
        else{
            result = hmRepo.findByHstr(pb);
        }
        List<HoneyMoon> hList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("hList", hList);
        res.put("pageNum", pageNum);
        res.put("totalPage", totalPage);

        log.info("" + result.getContent());
        return res;
    }

    public WeddingComp searchWCname(String wname, String wphone) {
        log.info("searchWCname");
        log.info(wname);
        log.info(wphone);
        WeddingComp wc = new WeddingComp();
        try {
            wc = wcRepo.findByWnameAndWphone(wname, wphone);
            log.info(wc.toString());
        }catch (Exception e){
            e.printStackTrace();
            wc = null;
        }
        return wc;
    }

    public String weddingHallWr(WeddingHall wh, List<MultipartFile> files, HttpSession session) {
        log.info("weddingHallWr");
        String str = "";
        try{
            whRepo.save(wh);
            log.info("whidx : "+wh.getWhidx());
            if(files!=null){
                log.info("파일저장중");
                fileUpload(files, session, wh.getWhidx(), "예식장");
                List<Files> f = fRepo.findByFwhidx(wh.getWhidx());
                log.info(f.toString());
                int i=0;
                for(Files ff:f){
                    if(i==0){
                        log.info("저장 이름"+ff.getFsysname());
                        wh.setWhimg2(ff.getFsysname());
                        i++;
                    }
                }
                whRepo.save(wh);
                str = "ok";
                log.info("파일저장완료");
            }else{
                log.info("파일 없음");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return str;
    }

    private void fileUpload(List<MultipartFile> files, HttpSession session, int idx, String type) throws IOException {
        log.info("파일업로딩중");
        String realPath = session.getServletContext().getRealPath("/");
        realPath += "upload/";
        File folder = new File(realPath);
        if(folder.isDirectory()==false){
            folder.mkdir();
        }
        log.info(files.toString());
        log.info("type : " + type);
        for(MultipartFile mf : files){
            String oriname = mf.getOriginalFilename();
            if(oriname.equals("")){
                return;
            }
            Files f = new Files();
            switch (type) {
                case "예식장":
                    WeddingHall wh = whRepo.findByWhidx(idx);
                    log.info(""+wh.getWhidx());
                    f.setFwhidx(wh.getWhidx());
                    break;
                case "스드메":
                    SDM sdm = sdmRepo.findBySidx(idx);
                    f.setFsidx(sdm.getSidx());
                    break;
                case "플래너":
                    Planner planner = planRepo.findByPidx(idx);
                    f.setFpid(planner.getPidx());
                    break;
                case "허니문":
                    HoneyMoon honey = hmRepo.findByHidx(idx);
                    f.setFhid(honey.getHidx());
                    break;
            }
            f.setForiname(oriname);
            String sysname = System.currentTimeMillis() + oriname.substring(oriname.lastIndexOf("."));
            f.setFsysname(sysname);
            f.setFtype(type);

            File file = new File(realPath + sysname);

            // 파일 저장(upload 폴더)
            mf.transferTo(file);
            fRepo.save(f);
        }
    }

    public SDM searchSdmComp(String scomp, String sphone) {
        log.info("searchSdmComp");
        SDM sdm = new SDM();
        
        try{
            sdm = sdmRepo.findByScompAndSphoneAndSstr(scomp, sphone, null);
            log.info(sdm.toString());
        }catch (Exception e){
            e.printStackTrace();
            sdm=null;
        }
        return sdm;
    }

    public String sdmDetailWr(SDM sdm, List<MultipartFile> files, HttpSession session) {
        log.info("sdmDetailWr");
        String str = "";
        try{
            sdmRepo.save(sdm);
            log.info("sidx : " + sdm.getSidx());
            if(files!=null){
                log.info("파일저장중");
                fileUpload(files, session, sdm.getSidx(), "스드메");
                int i=0;
                List<Files> f = fRepo.findByFsidx(sdm.getSidx());
                for(Files ff:f){
                    if(i==0){
                        log.info("저장 이름"+ff.getFsysname());
                        sdm.setSimg2(ff.getFsysname());
                        i++;
                    }
                }
                sdmRepo.save(sdm);
                log.info("파일저장완료");
                str = "ok";
            }else{
                log.info("파일 없음");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return str;
    }

    public Planner searchPlanname(String pname, String pphone) {
        log.info("searchPlanname");
        Planner plan = new Planner();
        try {
            plan = planRepo.findByPnameAndPphone(pname, pphone);
            log.info(plan.toString());
        }catch (Exception e){
            e.printStackTrace();
            plan = null;
        }
        return plan;
    }

    public String plannerDetailWr(Planner plan, List<MultipartFile> files, HttpSession session) {
        log.info("plannerDetailWr");
        String str = "";
        try{
            planRepo.save(plan);
            log.info("pidx : " + plan.getPidx());
            if(files!=null){
                log.info("파일저장중");
                fileUpload(files, session, plan.getPidx(), "플래너");
                log.info("파일저장완료");
            }else{
                log.info("파일 없음");
            }
            str = "ok";
        }catch (Exception e){
            e.printStackTrace();
        }
        return str;
    }

    public HoneyMoon searchHoneyBrand(String hbrand, String hphone) {
        log.info("searchHoneyBrand");
        HoneyMoon hm = new HoneyMoon();
        log.info("hb"+ hbrand);
        log.info("hp" + hphone);
        try{
            hm = hmRepo.findByHbrandAndHphoneAndHstr(hbrand, hphone, null);
            log.info(hm.toString());
        }catch (Exception e){
            e.printStackTrace();
            hm=null;
        }
        return hm;
    }

    public String honeyDetailWr(HoneyMoon hm, List<MultipartFile> files, HttpSession session) {
        log.info("honeyDetailWr");
        String str = "";
        try{
            hmRepo.save(hm);
            log.info("hidx : " + hm.getHidx());
            if(files!=null){
                log.info("파일저장중");
                fileUpload(files, session, hm.getHidx(), "허니문");
                log.info("파일저장완료");
                List<Files> f = fRepo.findByFhid(hm.getHidx());
                int i=0;
                for(Files ff:f){
                    if(i==0){
                        log.info("저장 이름"+ff.getFsysname());
                        hm.setHimg2(ff.getFsysname());
                        i++;
                    }
                }
                hmRepo.save(hm);
                str = "ok";
            }else{
                log.info("파일 없음");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return str;
    }

    public Map<String, Object> getBbibAll(Integer pageNum) {
        log.info("getBbibAll");
        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 5;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC,"decidx");
        Page<Declares> result = desRepo.findByDecidxGreaterThan(0,pb);
        List<Declares> dList = result.getContent();
        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("totalPage",totalPage);
        res.put("pageNum",pageNum);
        res.put("dList", dList);
        log.info(""+result.getContent());
        return res;
    }

    public String eventWr(Event event, List<MultipartFile> files, HttpSession session) {
        log.info("eventWr");
        String str="";
        String oriname="";
        try{
            log.info("eidx : " + event.getEidx());
            try {
                oriname = localFileSave(files, session);
            }catch (Exception e) {
                e.printStackTrace();
            }
            event.setEimg(oriname);
            eveRepo.save(event);
            return "ok";
        }catch (Exception e){
            e.printStackTrace();
            return "fail";
        }

    }

    public Map<String, Object> getReservAll(Integer pageNum) {
        log.info("getReservAll");

        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 10;
        Map<String, Object> res = new HashMap<>();

        Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC,"ridx");
        Page<Reservations> result = resRepo.findByRidxGreaterThan(0, pb);
        List<Reservations> rList = result.getContent();

        int totalPage = result.getTotalPages();

        res.put("totalPage",totalPage);
        res.put("pageNum",pageNum);
        res.put("rList",rList);

        return res;
    }
}
