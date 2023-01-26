package com.finalproject.wedding.service;

import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.repository.*;
import com.google.gson.Gson;
import lombok.extern.java.Log;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Log
public class PaymentService {
    @Autowired
    PaymentRepository pRepo;
    @Autowired
    ReservationRepository rRepo;
    @Autowired
    DibRepository dRepo;
    @Autowired
    WeddingHoleRepository wRepo;
    @Autowired
    SDMRepository sRepo;
    @Autowired
    PlannerRepository planRepo;
    @Autowired
    HoneyMoonRepository hRepo;

    @Transactional
    public String inputData(Refund refund){
        log.info("inputData()");
        String res = null;
        log.info(refund.getMerchant_uid());
        try {
            pRepo.save(refund);
            res = "Ok";
        }catch (Exception e){
            e.printStackTrace();
            res = "Fail";
        }
        log.info(res);
        return res;
    }

    @PostMapping("/getBuyerInfo")
    public void getBuyerInfo(String imp_uid, String access){
        RestTemplate restTemplate= new RestTemplate();
        log.info("이얻앙ㅁㅁㄴ엄ㄴ안ㅁ안언ㅁ엄ㄴㅇ"+access);
        HttpHeaders headers= new HttpHeaders();
    //        headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "https://api.iamport.kr/");
    //        headers.ACCESS_CONTROL_ALLOW_ORIGIN("sdfdd", headers.add();)
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", "Bearer "+access);

        Map<String, Object> body=new HashMap<>();
        body.put("imp_uid", imp_uid);
    //        body.put("imp_key", imp_key);
    //        body.put("imp_secret", imp_secret);
        Gson var = new Gson();
        String json= var.toJson(body);
        //
        try{
            HttpEntity<String> entity=new HttpEntity<>(json, headers);
            log.info("이게 뭐게???"+entity);
            log.info("이게 뭐게???"+entity.getBody());
            log.info("이게 뭐게???"+entity.getHeaders());
            log.info("이게 뭐게???"+entity.getClass());
            log.info("이게 뭐게???"+ JSONObject.class);
            ResponseEntity<String> buyerInfo=restTemplate.postForEntity("https://api.iamport.kr/payments/"+imp_uid, entity, String.class);

            System.out.println(buyerInfo+"fullBuyerInfo");
            System.out.println(buyerInfo.getBody()+"fullbuyerInfo");
    //            System.out.println(token.getStatusCode()+"getToken");
    //            System.out.println(token.getStatusCodeValue()+"getTokenValue");
    //            System.out.println(token.getBody()+"tokenBody");
    //            System.out.println(token.getBody().get("response")+"tokenBody");
        }catch (Exception e){
           e.printStackTrace();
        }
    }

    public String insertReservation(List<Reservations> reservations) {
        String msg=null;
        log.info("이게 정보다아아"+reservations.toString());
        try {
            for(Reservations rList : reservations) {
                rRepo.save(rList);
                switch (rList.getRtype()){
                    case "웨딩홀":
                        dRepo.deleteByDwhidxmid(rList.getRwhidx(), rList.getRmid());
                        break;
                    case "스드메":
                        dRepo.deleteByDsidxmid(rList.getRsidx(), rList.getRmid());
                        break;
                    case "플래너":
                        dRepo.deleteByDpidxmid(rList.getRpidx(), rList.getRmid());
                        break;
                    case "허니문":
                        dRepo.deleteByDhidxmid(rList.getRhidx(), rList.getRmid());
                        break;
                }
            }
            msg="성공";
        }
        catch(Exception e){
            e.printStackTrace();
            msg="실패";
        }
        return msg;
    }


    public Map myReservation(String mid) {
        List<Reservations> rList = new ArrayList<>();
        List<WeddingHall> wList= new ArrayList<>();
        List<SDM> sList= new ArrayList<>();
        List<Planner> pList= new ArrayList<>();
        List<HoneyMoon> hList= new ArrayList<>();
        Map tMap = new HashMap();
        try{
            rList = rRepo.findByRmid(mid);
            for(Reservations rno : rList){
                switch (rno.getRtype()){
                    case "웨딩홀":
                        wList.add(wRepo.findByWhidx(rno.getRwhidx()));
                        break;
                    case "스드메":
                        sList.add(sRepo.findBySidx(rno.getRsidx()));
                        break;
                    case "플래너":
                        pList.add(planRepo.findByPidx(rno.getRpidx()));
                        break;
                    case "허니문":
                        hList.add(hRepo.findByHidx(rno.getRhidx()));
                        break;
                }
            }
        log.info("돌리기전"+pList);
            for(Reservations rno : rList){
                switch(rno.getRtype()){
                    case "웨딩홀":
                        for(WeddingHall wno : wList){
                            if(wno.getWhidx()==rno.getRwhidx()){
                                wno.setWhrList(rno);
                            }
                        }
                        break;
                    case "스드메":
                        for(SDM sno : sList){
                            if(sno.getSidx()==rno.getRsidx()){
                                sno.setSrList(rno);
                            }
                        }
                        break;
                    case "플래너":
                        for(Planner pno : pList){
                            if(pno.getPidx()==rno.getRpidx()){
                                pno.setPrList(rno);
                            }
                        }
                        break;
                    case "허니문":
                        for(HoneyMoon hno : hList){
                            if(hno.getHidx()==rno.getRhidx()){
                                hno.setHrList(rno);
                            }
                        }
                        break;
                }
            }
                log.info("돌린후"+pList);
            tMap.put("rw", wList);
            tMap.put("rs", sList);
            tMap.put("rp", pList);
            tMap.put("rh", hList);


        }catch(Exception e){
            e.printStackTrace();
        }

        return tMap;
    }

    public String TokenRequest(String imp_key, String imp_secret) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
//        headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "https://api.iamport.kr/");
//        headers.ACCESS_CONTROL_ALLOW_ORIGIN("sdfdd", headers.add("access","*",));
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
//        body.put("imp_uid", imp_uid);
        body.put("imp_key", imp_key);
        body.put("imp_secret", imp_secret);
        Gson var = new Gson();
        String json = var.toJson(body);
        String access = null;
        try {
            HttpEntity<String> entity = new HttpEntity<>(json, headers);
            log.info("이게 뭐게???" + entity);
            log.info("이게 뭐게???" + entity.getBody());
            log.info("이게 뭐게???" + entity.getHeaders());
            log.info("이게 뭐게???" + entity.getClass());
            log.info("이게 뭐게???" + JSONObject.class);
            ResponseEntity<String> token = restTemplate.postForEntity("https://api.iamport.kr/users/getToken", entity, String.class);

            System.out.println(token + "fullToken");
            System.out.println(token.getBody() + "fullToken");
//            System.out.println(token.getStatusCode()+"getToken");
////            System.out.println(token.getStatusCodeValue()+"getTokenValue");
////            System.out.println(token.getBody()+"tokenBody");
//            System.out.println(token.getBody().get("response")+"tokenBody");
            access = token.getBody().substring(53, 93);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return access;
    }


    public String refundCall(String imp_uid, String access) {
        RestTemplate restTemplate= new RestTemplate();
        String res = "Failed";
        HttpHeaders headers= new HttpHeaders();
//        headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "https://api.iamport.kr/");
//        headers.ACCESS_CONTROL_ALLOW_ORIGIN("sdfdd", headers.add();)
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", "Bearer "+access);

        Map<String, Object> body=new HashMap<>();
        body.put("imp_uid", imp_uid);
//        body.put("imp_key", imp_key);
//        body.put("imp_secret", imp_secret);
        Gson var = new Gson();
        String json= var.toJson(body);
        try{
            HttpEntity<String> entity=new HttpEntity<>(json, headers);
            log.info("이게 뭐게???"+entity);
            log.info("이게 뭐게???"+entity.getBody());
            log.info("이게 뭐게???"+entity.getHeaders());
            log.info("이게 뭐게???"+entity.getClass());
            log.info("이게 뭐게???"+JSONObject.class);
            ResponseEntity<String> buyerInfo=restTemplate.postForEntity("https://api.iamport.kr/payments/cancel", entity, String.class);

            System.out.println("환불 성공");
            System.out.println(buyerInfo+"fullBuyerInfo");
            System.out.println(buyerInfo.getBody()+"fullbuyerInfo");
//            System.out.println(token.getStatusCode()+"getToken");
//            System.out.println(token.getStatusCodeValue()+"getTokenValue");
//            System.out.println(token.getBody()+"tokenBody");
//            System.out.println(token.getBody().get("response")+"tokenBody");
            res="Success";
        }catch (Exception e){
            e.printStackTrace();
        }
        return res;
    }

    public String delReserv(int ridx) {
        String res="Failed";
        Reservations rData = new Reservations();
        try{
            rData=rRepo.findByRidx(ridx);
            rData.setRstatus("환불완료");
            rRepo.save(rData);
            res="Success";
        }catch (Exception e){
            e.printStackTrace();
        }
        return res;
    }

}
