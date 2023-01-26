package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.service.BoardService;
import com.finalproject.wedding.service.HomeService;
import com.finalproject.wedding.service.MemberService;
import com.finalproject.wedding.service.PaymentService;
import lombok.extern.java.Log;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class HomeController {
    @Autowired
    private HomeService hServ;

    @Autowired
    private MemberService mServ;

    @Autowired
    private PaymentService paySev;

    // 모아보기 부분
    // 허니문 전부 가져오기
    @GetMapping("searchHoneyMoonAll")
    public List<HoneyMoon> searchHoneyMoonAll(){
        log.info("searchHoneyMoonAll()");
        List<HoneyMoon> hmall= hServ.searchHoneyMoonAll();

        return hmall;
    }

    @GetMapping("searchHoneyMoonAllPage")
    public Map<String, Object> searchHoneyMoonAllPage(@RequestParam Integer pageNum, HttpSession session, String no){
        log.info("searchHoneyMoonAllPage()");
        return hServ.searchHoneyMoonAllPage(pageNum,no);
    }

    // 플래너 전부 가져오기
    @GetMapping("searchPlannerAll")
    public List<Planner> searchPlannerAll(){
        log.info("searchPlannerAll()");
        List<Planner> plall= hServ.searchPlanerAll();

        return plall;
    }

    @GetMapping("searchPlannerAllPage")
    public Map<String, Object> searchPlannerAllPage(@RequestParam Integer pageNum, HttpSession session, String no){
        log.info("searchPlannerAllPage()");
        return hServ.searchPlannerAllPage(pageNum, no);
    }

    @GetMapping("searchSdmAll")
    public List<SDM> searchSdmAll(){
        log.info("searchSdmAll()");
        List<SDM> sdmall= hServ.searchSdmAll();

        return sdmall;
    }

    @GetMapping("searchSdmAllPage")
    public Map<String, Object> searchSdmAllPage(@RequestParam Integer pageNum, HttpSession session, String no){
        log.info("searchSdmAllPage()");
        return hServ.searchSdmAllPage(pageNum,no);
    }

    @GetMapping("searchWeddingHallAll")
    public List<WeddingHall> searchWeddingHallAll(){
        log.info("searchWeddingHallAll()");
        List<WeddingHall> whall= hServ.searchWeddingHallAll();

        return whall;
    }

    @GetMapping("searchWeddingHallAllPage")
    public Map<String, Object> searchWeddingHallAllPage(@RequestParam Integer pageNum, HttpSession session){
        log.info("searchWeddingHallAllPage()");
        return hServ.searchWeddingHallAllPage(pageNum);
    }

    @GetMapping("searchWeddingCompAll")
    public List<WeddingComp> searchWeddingCompAll(){
        log.info("searchWeddingCompAll()");
        List<WeddingComp> wcomp= hServ.searchWeddingCompAll();
        return wcomp;
    }

    @GetMapping("searchWeddingCompAllPage")
    public Map<String, Object> searchWeddingCompAllPage(@RequestParam Integer pageNum, HttpSession session){
        log.info("searchWeddingCompAllPage()");
        return  hServ.searchWeddingCompAllPage(pageNum);
    }

    //예식장 이름, 지역으로 검색
    @GetMapping("searchWCname")
    public WeddingComp searchWCname(@RequestParam String wname, @RequestParam String wphone){
        log.info("searchWCname()");
        return hServ.searchWCname(wname, wphone);
    }

    // 특정 허니문 탐색
    @GetMapping("searchHoneyMoon")
    public HoneyMoon searchHoneyMoon(@RequestPart(value ="data") HoneyMoon honeymoon){
        log.info("searchHoneyMoon()");
        HoneyMoon hm = hServ.searchHoneyMoon(honeymoon);
        return hm;
    }

    // 특정 플래너 탐색
    @GetMapping("searchPlanner")
    public Planner searchPlanner(@RequestPart(value= "data") Planner planner){
        log.info("searchPlanner()");
        Planner pl = hServ.searchPlanner(planner);
        return pl;
    }

    // 특정 스드메 탐색
    @GetMapping("searchSdm")
    public SDM searchSdm(@RequestPart(value = "data") SDM s){
        log.info("searchSdm()");
        SDM s2 = hServ.searchSdm(s);
        return s2;
    }

    // 특정 웨딩홀 탐색
    @GetMapping("searchWeddingHall")
    public WeddingHall searchWeddingHall(@RequestPart(value = "data") WeddingHall weddinghall){
        log.info("searchWeddingHall()");
        WeddingHall wh = hServ.searchWeddingHall(weddinghall);
        return wh;
    }

    // 관리자 - 업체 추가
    @PostMapping("brWriteProc")
    public String brWriteProc(@RequestPart(value = "data", required = true) String insertItmes,
                              @RequestPart(value = "files", required = false) List<MultipartFile> files,
                              HttpSession session) {
        String result = "";
        log.info("제출버튼을 눌렀습니다");
//        log.info(wcomp.getWname() + ", " + wcomp.getWlocation());
//        log.info("파일 사이즈" + files.size());
//        return hServ.insertWeddingComp(wcomp, files, session);
        log.info("string : " + insertItmes);
            // string으로 들어온 값을 JSON으로 변환, 아래 링크 참고
            // https://www.delftstack.com/ko/howto/java/java-convert-string-to-json-object/
        try {
            JSONObject obj = new JSONObject(insertItmes);
            log.info("obj : " + obj.toString());
            // JSONObject 에서 값 추출하기
            log.info(obj.getString("name"));
            switch (obj.getString("type")) {
                case "weddingComp":
                     result = hServ.insertWeddingCompBr(obj, files, session);
                     break;
                case "sdm":
                    result = hServ.insertSdmBr(obj, files, session);
                    break;
                case "planner":
                    result = hServ.insertPlannerBr(obj, files, session);
                    break;
                case "honeymoon":
                    result = hServ.insertHoneymoonBr(obj, files, session);
                    break;
            }
        }
        catch (JSONException e){
            log.info(e.toString());
        }
        return result;
    }

    @PostMapping("weddingHallWr")
    public String weddingHallWr(@RequestPart(value = "data", required = true) WeddingHall wh,
                               @RequestPart(value = "files", required = false) List<MultipartFile> files,
                               HttpSession session){
        log.info("weddingHallWr");
        log.info(wh.toString());
        return hServ.weddingHallWr(wh, files, session);
    }

    @GetMapping("searchSdmComp")
    public SDM searchSdmComp(@RequestParam String scomp, @RequestParam String sphone){
        log.info("searchSdmComp");
        return hServ.searchSdmComp(scomp, sphone);
    }
    @PostMapping("sdmDetailWr")
    public String sdmDetailWr(@RequestPart(value = "data", required = true) SDM sdm,
                              @RequestPart(value = "files", required = false) List<MultipartFile> files,
                              HttpSession session){
        log.info("sdmDetailWr");
        log.info(sdm.toString());
        return hServ.sdmDetailWr(sdm, files, session);
    }

    @GetMapping("searchPlanname")
    public Planner searchPlanname(@RequestParam String pname, @RequestParam String pphone){
        log.info("searchPlanname");
        return hServ.searchPlanname(pname, pphone);
    }

    @PostMapping("plannerDetailWr")
    public String plannerDetailWr(@RequestPart(value = "data", required = true) Planner plan,
                                  @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                  HttpSession session){
        log.info("plannerDetailWr");
        log.info(plan.toString());
        return hServ.plannerDetailWr(plan, files, session);
    }

    @GetMapping("searchHoneyBrand")
    public HoneyMoon searchHoneyBrand(@RequestParam String hbrand, @RequestParam String hphone){
        log.info("searchHoneyBrand");
        return hServ.searchHoneyBrand(hbrand, hphone);
    }

    @PostMapping("honeyDetailWr")
    public String plannerDetailWr(@RequestPart(value = "data", required = true) HoneyMoon hm,
                                  @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                  HttpSession session){
        log.info("honeyDetailWr");
        log.info(hm.toString());
        return hServ.honeyDetailWr(hm, files, session);
    }

    @GetMapping("getBbibAll")
    public Map<String,Object> getBbibAll(@RequestParam Integer pageNum){
        log.info("getBbibAll");
        return hServ.getBbibAll(pageNum);
    }
    @PostMapping("eventWr")
    public String eventWr(@RequestPart(value = "data", required = true) Event event,
                          @RequestPart(value = "files", required = false) List<MultipartFile> files,
                          HttpSession session){
        log.info("eventWr");
        log.info(event.toString());
        return hServ.eventWr(event, files, session);
    }
    @GetMapping("getReservAll")
    public Map<String, Object> getReservAll(@RequestParam Integer pageNum){
        log.info("getReservAll");
        return hServ.getReservAll(pageNum);
    }
    // 랭킹 만들기
    @GetMapping("whRank")
    public List<Integer> whRank(){
        log.info("whRank()");
        return hServ.rankWh();
    }
}

