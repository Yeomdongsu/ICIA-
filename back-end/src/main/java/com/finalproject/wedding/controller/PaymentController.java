package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.Refund;
import com.finalproject.wedding.entity.Reservations;
import com.finalproject.wedding.service.PaymentService;
import com.google.gson.Gson;
import lombok.extern.java.Log;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class PaymentController {
        //    @Value("${pgmodule.imp_uid}")
    @Value("${pgmodule.imp_key}")
    public String imp_key;
    @Value("${pgmodule.imp_secret}")
    public String imp_secret;

    @Autowired
    PaymentService pServ;
//    @PostMapping("/CancelPayISRequest")
//    public String CancelPayISRequest(@RequestBody Refund refund){
//        log.info("CancelPayISRequest()");
//        log.info(refund.getMerchant_uid());
//        String res = pServ.inputData(refund);
//        return res;
//    }

//    @PostMapping("/TokenRequest")
//    public String TokenRequest(@RequestParam("imp_uid") String imp_uid){
////        log.info("이게 뭐게???"+imp_uid);
//        log.info("이게 뭐게???"+imp_secret);
//        log.info("이게 뭐게???"+imp_key);
//        RestTemplate restTemplate= new RestTemplate();
//
//        HttpHeaders headers= new HttpHeaders();
////        headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "https://api.iamport.kr/");
////        headers.ACCESS_CONTROL_ALLOW_ORIGIN("sdfdd", headers.add();)
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        Map<String, Object>map = new HashMap<>();
//        map.put("imp_key", imp_key);
//        map.put("imp_secret", imp_secret);
////        body.put("imp_uid", imp_uid);
//        Gson var = new Gson();
//        String json=var.toJson(map);
//        HttpEntity<String> entity=new HttpEntity<>(json, headers);
//        ResponseEntity<String> token= restTemplate.postForEntity("https://api.iamport.kr/users/getToken", entity, String.class);
//                System.out.println(token+"fullToken");
//        System.out.println(token.getBody()+"fullToken");
////            System.out.println(token.getStatusCode()+"getToken");
////            System.out.println(token.getStatusCodeValue()+"getTokenValue");
////            System.out.println(token.getBody()+"tokenBody");
////            System.out.println(token.getBody().get("response")+"tokenBody");
//        String access= token.getBody().substring(53,93);
//        pServ.getBuyerInfo(imp_uid, access);
//        refund(imp_uid, access);
////        }catch (Exception e){
////            e.printStackTrace();
////        }
//
//        return access;
//    }

    @PostMapping("/insertReservation")
    public String insertReservation(@RequestBody List<Reservations> reservations){
        log.info("insertReservation()");
        log.info(""+reservations);
        String msg=pServ.insertReservation(reservations);
        return msg;
    }

    @GetMapping("myReservation")
    public Map myReservation(@RequestParam String mid){
        log.info("myReservation()");
        log.info(mid);
        return pServ.myReservation(mid);
    }

    @PostMapping("/TokenRequest")
    public String TokenRequest(@RequestBody Map refundData){
        log.info("이게 뭐게???"+refundData.get("imp_uid"));
        log.info("이게 뭐게???"+imp_secret);
        log.info("이게 뭐게???"+imp_key);
        String imp_uid = refundData.get("imp_uid").toString();
        log.info(imp_uid);
        String access=pServ.TokenRequest(imp_key, imp_secret);
        log.info("토큰"+access);
//        pServ.getBuyerInfo(imp_uid, access);
        String res=refundCall(imp_uid, access);
        pServ.getBuyerInfo(imp_uid, access);

        return res;
    }
//    tokenRequest end

    @PostMapping("/refundCall")
    public String refundCall(String imp_uid, String access){
        log.info("이얻앙ㅁㅁㄴ엄ㄴ안ㅁ안언ㅁ엄ㄴㅇ"+access);
        String res = pServ.refundCall(imp_uid, access);
        return res;
    }

    @PostMapping("delReserv")
    public String delReserv(@RequestBody Map delReserv){
        log.info("delReserv()");
        log.info("das"+delReserv.toString());
        String ridx= delReserv.get("ridx").toString();
        log.info(""+ridx);
        String res=pServ.delReserv(Integer.parseInt(ridx));
        return res;
    }

}
