package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.HoneyMoon;
import com.finalproject.wedding.entity.WeddingHall;
import com.finalproject.wedding.service.EstimateService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class EstimateController {
    @Autowired
    private EstimateService eServ;



//    @PostMapping("searchEstimate")
//    public String getSearchEstimate(@RequestBody String req){
//        log.info("getSearchEstimate()");
//        log.info(req);
//        return null;
//    }
//
//
    @PostMapping("/searchEstimate")
    public Map SearchEstimate(String wdate, String wseoul, String wgyeong, String win, String wgang, String wje, String wdae, String wchungbuk, String wchungnam, String wbu, String wul, String wgyeongnam, String wdaegu, String wgyeongbuk, String wgwang, String wjeonnam, String wjeonbuk, String whole, String common, String trad, String hotel, String house, String church, String cathedral, String outdoor ,int wminprice, int wmaxprice, String sdate, String sseoul, String sgyeong, String sin, String sgang, String sje, String sdae, String schungbuk, String schungnam, String sbu, String sul, String sgyeongnam, String sdaegu, String sgyeongbuk, String sgwang, String sjeonnam, String sjeonbuk, int sminprice, int smaxprice, String pdate, int pminprice, int pmaxprice, String hdate, String hseoul, String hgyeong, String hin, String hgang, String hje, String hdae, String hchungbuk, String hchungnam, String hbu, String hul, String hgyeongnam, String hdaegu, String hgyeongbuk, String hgwang, String hjeonnam, String hjeonbuk, int hminprice, int hmaxprice){
        log.info("searchEstimate()");
//        log.info(wdate);
//        log.info(wseoul);
//        log.info(wgyeong);
//        log.info(win);
        Map last = eServ.searchEst(wdate, wseoul, wgyeong, win, wgang, wje, wdae, wchungbuk, wchungnam, wbu, wul, wgyeongnam, wdaegu, wgyeongbuk, wgwang, wjeonnam, wjeonbuk, whole, common, trad, hotel, house, church, cathedral, outdoor, wminprice, wmaxprice, sdate, sseoul, sgyeong, sin, sgang, sje, sdae, schungbuk, schungnam, sbu, sul, sgyeongnam, sdaegu, sgyeongbuk, sgwang, sjeonnam, sjeonbuk, sminprice, smaxprice, pdate, pminprice, pmaxprice, hdate, hseoul, hgyeong, hin, hgang, hje, hdae, hchungbuk, hchungnam, hbu, hul, hgyeongnam, hdaegu, hgyeongbuk, hgwang, hjeonnam, hjeonbuk, hminprice, hmaxprice);
        return last;
    }
    //searchEstimate end
//
    // main EstimateSearch
    @PostMapping("/mainEstimate")
    public Map<String, Object> mainEstimate(@RequestParam String type,
                            @RequestParam String location,
                            @RequestParam int mincost, @RequestParam int maxcost){
        log.info("mainEstimate()");
        log.info("SeachType : " + type + ", Location : " + location
                + ", Cost Range: " + mincost + " ~ " + maxcost);
        Map<String, Object> estMain = eServ.estimateMain(type, location,
                mincost, maxcost);
        return estMain;
    }
}
