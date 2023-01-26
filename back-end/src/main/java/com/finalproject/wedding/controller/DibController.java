package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.Dib;
import com.finalproject.wedding.service.DibService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class DibController {

    @Autowired
    private DibService  dServ;

    @PostMapping("/ddibInsert")
    public String ddibInsert (@RequestBody List<Dib> dibData){
        log.info("ddibInsert()");
        log.info("띱"+dibData);
        return dServ.ddibInsert(dibData);
    }

    @PostMapping("/searchDib")
    public Map searchDib (@RequestParam(name = "mid") String mid) throws Exception{
        log.info(("getDib()"));
        log.info("띱아이디"+mid);
        return dServ.searchDib(mid);
    }

    @PostMapping("/deleteDib")
    public String deleteDib (@RequestBody List<Dib> delData){
        log.info("deleteDib()");
        log.info("띱다중삭제데이터"+delData);
        log.info(delData.toString());
        return dServ.deleteDib(delData);
    }
}
