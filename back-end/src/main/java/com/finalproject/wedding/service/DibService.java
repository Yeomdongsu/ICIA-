package com.finalproject.wedding.service;

import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Log
public class DibService {
    @Autowired
    private DibRepository dRepo;
    @Autowired
    private WeddingHoleRepository whRepo;
    @Autowired
    private SDMRepository sRepo;
    @Autowired
    private PlannerRepository pRepo;
    @Autowired
    private HoneyMoonRepository hRepo;
    public String ddibInsert(List<Dib> dibData) {
        String res = null;
        try{
            for(Dib dList : dibData){
                dRepo.save(dList);
            }
            res="Success";
        }catch(Exception e){
            e.printStackTrace();
            res="Failed";
        }

        return res;
    }

    public Map searchDib(String mid) throws Exception {
        Map dibData = new HashMap();
        List<Dib> dList = dRepo.findAllByDmid(mid);
        List<WeddingHall> whList = new ArrayList<>();
        List<SDM> sList = new ArrayList<>();
        List<Planner> pList = new ArrayList<>();
        List<HoneyMoon> hList = new ArrayList<>();
        for(Dib dno : dList){
            switch (dno.getDtype()) {
                case "웨딩홀":
                    whList.addAll(whRepo.findAllByWhidx(dno.getDwhidx()));
                    break;
                case "스드메":
                    sList.addAll(sRepo.findAllBySidx(dno.getDsidx()));
                    break;
                case "플래너":
                    pList.addAll(pRepo.findAllByPidx(dno.getDpidx()));
                    break;
                case "허니문":
                    hList.addAll(hRepo.findAllByHidx(dno.getDhidx()));
                    break;
            }
        }
        dibData.put("wh",whList);
        dibData.put("sd",sList);
        dibData.put("pl", pList);
        dibData.put("ho", hList);
        return dibData;
    }


    public String deleteDib(List<Dib> delData) {
        String res = "Failed";
        try{
            for(Dib delList : delData){
                switch (delList.getDtype()){
                    case "웨딩홀":
                        dRepo.deleteByDwhidxmid(delList.getDwhidx(),delList.getDmid());
                        break;
                    case "스드메":
                        dRepo.deleteByDsidxmid(delList.getDsidx(),delList.getDmid());
                        break;
                    case "플래너":
                        dRepo.deleteByDpidxmid(delList.getDpidx(),delList.getDmid());
                        break;
                    case "허니문":
                        dRepo.deleteByDhidxmid(delList.getDhidx(),delList.getDmid());
                        break;
                }
            }
            res = "Ok";
        }catch(Exception e){
            e.printStackTrace();
        }
        return res;
    }
}
