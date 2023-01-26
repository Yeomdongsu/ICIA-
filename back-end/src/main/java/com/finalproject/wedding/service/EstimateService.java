package com.finalproject.wedding.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
@Log
public class EstimateService {
    @Autowired
    private WeddingCompRepository wcRepo;
    @Autowired
    private WeddingHoleRepository whRepo;
    @Autowired
    private SDMRepository sRepo;
    @Autowired
    private PlannerRepository pRepo;
    @Autowired
    private HoneyMoonRepository hRepo;
    @Autowired
    private ReservationRepository rRepo;


    public Map searchEst(String wdate, String wseoul, String wgyeong, String win, String wgang, String wje, String wdae, String wchungbuk, String wchungnam, String wgyeongnam, String wdaegu, String wbu, String wul, String wgyeongbuk, String wgwang, String wjeonnam, String wjeonbuk, String whole, String common, String trad, String hotel, String house, String church, String cathedral, String outdoor, int wminprice, int wmaxprice, String sdate, String sseoul, String sgyeong, String sin, String sgang, String sje, String sdae, String schungbuk, String schungnam, String sbu, String sul, String sgyeongnam, String sdaegu, String sgyeongbuk, String sgwang, String sjeonnam, String sjeonbuk,  int sminprice, int smaxprice, String pdate, int pminprice, int pmaxprice, String hdate, String hseoul, String hgyeong, String hin, String hgang, String hje, String hdae, String hchungbuk, String hchungnam, String hbu, String hul, String hgyeongnam, String hdaegu, String hgyeongbuk, String hgwang, String hjeonnam, String hjeonbuk, int hminprice, int hmaxprice){
        List<WeddingComp> wcList;
        List<WeddingHall> whList = new ArrayList<>();
        List<Reservations> rwhList;
        List<WeddingHall> removewh = new ArrayList<>();
        List<SDM> sList;
        List<Reservations> rsList;
        List<SDM> removes = new ArrayList<>();
        List<Planner> pList;
        List<Reservations> rpList;
        List<Planner> removep = new ArrayList<>();
        List<HoneyMoon> hList;
        List<Reservations> rhList;
        List<HoneyMoon> removeh = new ArrayList<>();

        Map estData = new HashMap<>();
        log.info("날짜어떻게넘어옴?"+hdate);
        java.sql.Date cvtwdate = java.sql.Date.valueOf(wdate);
        java.sql.Date cvtsdate = java.sql.Date.valueOf(sdate);
        java.sql.Date cvtpdate = java.sql.Date.valueOf(pdate);
        java.sql.Date cvthdate = java.sql.Date.valueOf(hdate);
//        java.sql.Timestamp cvthdate = java.sql.Timestamp.valueOf(hdate+" 00:00:00");
            wcList = wcRepo.findBySWClocation(wseoul, wgyeong, win, wgang, wje, wdae, wchungbuk, wchungnam, wbu, wul, wgyeongnam, wdaegu, wgyeongbuk, wgwang, wjeonnam, wjeonbuk);
            log.info("이거시 서치결과"+wcList);
            for(WeddingComp wno : wcList){
                switch(whole){
                    case "데이터없음" :
                        if(common.equals("데이터없음") && trad.equals("데이터없음") && hotel.equals("데이터없음") && house.equals("데이터없음") && church.equals("데이터없음") && cathedral.equals("데이터없음") && outdoor.equals("데이터없음")){
                            whList.addAll(whRepo.findByWhwcidx3(wno.getWidx(), wminprice, wmaxprice));
                        }
                        else if(whRepo.findByWhwcidx2(wno.getWidx(), wminprice, wmaxprice, common, trad, hotel, house, church, cathedral, outdoor)!=null) {
                            whList.addAll(whRepo.findByWhwcidx2(wno.getWidx(), wminprice, wmaxprice, common, trad, hotel, house, church, cathedral, outdoor));
                        }
                        break;
                    case "전체" :
                        if(whRepo.findByWhwcidx3(wno.getWidx(), wminprice, wmaxprice)!=null) {
                            whList.addAll(whRepo.findByWhwcidx3(wno.getWidx(), wminprice, wmaxprice));
                        }
                    break;
                }
            }
            log.info("웨딩회사"+wcList);
            log.info("웨딩홀"+whList);

            rwhList = rRepo.findByRwhdate(cvtwdate);
            int index1=0;
            for(WeddingHall whno : whList){
                for(Reservations rno : rwhList){
                    if(rno.getRsidx()==whno.getWhidx()){
                        removewh.add(whList.get(index1));
                    }   //if end
                }   //for end
                index1++;
            }// for end
            whList.remove(removewh);
            log.info("웨딩홀에서 지역으로 검색해온 데이터에서 예약있는 데이터 제외한 결과"+whList);



            sList = sRepo.findBySSlocation(sseoul, sgyeong, sin, sgang, sje, sdae, schungbuk, schungnam, sbu, sul, sgyeongnam, sdaegu, sgyeongbuk, sgwang, sjeonnam, sjeonbuk, sminprice, smaxprice);
            log.info("이거시 서치결과"+sList);
        log.info(sList+"스드메");
            rsList = rRepo.findByRsdate(cvtsdate);
            int index2=0;
            for(SDM sno : sList){
                for(Reservations rno : rsList){
                    if(rno.getRsidx()==sno.getSidx()){
                        removes.add(sList.get(index2));
                    }   //if end
                }   //for end
                index2++;
            }// for end
            sList.removeAll(removes);
            log.info("스드메에서 지역으로 검색해온 데이터에서 예약있는 데이터 제외한 결과"+sList);




            pList = pRepo.findByPrice(pminprice, pmaxprice);
            log.info("이거시 서치결과"+pList);
        log.info(pList+"플래너");
            rpList = rRepo.findByRpdate(cvtpdate);
            int index3=0;
            for(Planner pno : pList){
                for(Reservations rno : rpList){
                    if(rno.getRpidx()==pno.getPidx()){
                        removep.add(pList.get(index3));
                    }   //if end
                }   //for end
                index3++;
            }// for end
            pList.removeAll(removep);
            log.info("스드메에서 지역으로 검색해온 데이터에서 예약있는 데이터 제외한 결과"+pList);


            hList = hRepo.findBySHlocation(hgyeong, hin, hgang, hje, hdae, hchungbuk, hchungnam, hbu, hul, hgyeongnam, hdaegu, hgyeongbuk, hgwang, hjeonnam, hjeonbuk, hminprice, hmaxprice);
log.info(hList+"허니문");
log.info(hseoul+"이거왜안되지?");
            if(hseoul.equals("국내")){
                List<HoneyMoon> hList2 = new ArrayList<>();
                hList2 = hRepo.findAllByHarrival(hseoul);
                hList.addAll(hList2);
                log.info("여기서안되나?"+hList);
            }
            rhList = rRepo.findByRhdate(cvthdate);
//            log.info("이거시 서치결과"+hList);
//            log.info("컨버팅된 결과" + cvthdate);
                int index4=0;
//                int index2=0;
            for(HoneyMoon hno : hList){
//                log.info("sadads"+hno);
//                log.info(""+hno.getHidx());
//                log.info("예약날짜"+rhList);
                for(Reservations rno : rhList){
                    if(rno.getRhidx()==hno.getHidx()){
//                        log.info("빼기전"+hList);
//                        log.info("빼기전"+hno);
//                        hList.remove(index1);
                        removeh.add(hList.get(index4));
//                        log.info("삭제할 목록"+removeh);
//                        log.info("after remove"+hList);
//                        hList.removeIf(item -> item.getHidx()==rno.getRhidx());
                    }   //if end
//                    log.info("포문 반복확인"+hList);
                }   //for end
                index4++;
            }// for end
            hList.removeAll(removeh);
        // if end
        log.info("스드메에서 지역으로 검색해온 데이터에서 예약있는 데이터 제외한 결과"+sList);
        log.info("허니문에서 지역으로 검색해온 데이터에서 예약있는 데이터 제외한 결과"+hList);

//        int i=0;
//        for(WeddingHall wno : whList){
//            for(SDM sno : sList){
//                for(Planner pno : pList){
//                    for(HoneyMoon hno : hList){
//                        int tcost = wno.getWhprice()+ sno.getSprice()+ pno.getPprice()+hno.getHcost();
//                        if(wno.getWhprice()+ sno.getSprice()+ pno.getPprice()+hno.getHcost()>= minprice && wno.getWhprice()+ sno.getSprice()+ pno.getPprice()+hno.getHcost()<= maxprice){
//                            estData.put(i,whList);
//                            i++;
//                            estData.put(i,sList);
//                            i++;
//                            estData.put(i,pList);
//                            i++;
//                            estData.put(i,hList);
//
//                        }   //if end
//                    }   //for end
//                }   //for end
//            }   //for end
//        }   //for end
        estData.put("w", whList);
        estData.put("s", sList);
        estData.put("p", pList);
        estData.put("h", hList);
        log.info("최종 데이터"+estData);
        return estData;
    }

    public Map<String, Object> estimateMain(String type, String location, int mincost, int maxcost) {
        log.info("estimateMain()");
        List<HoneyMoon> hm = new ArrayList<>();
        List<Planner> pl = new ArrayList<>();
        List<WeddingHall> wh = new ArrayList<>();
        List<SDM> sdm = new ArrayList<>();
        List<WeddingComp> wc = new ArrayList<>();
        Map<String, Object> eMain = new HashMap<>();

        try{
            switch(type){
                case "허니문":
                    hm = hRepo.estMainHm(location, mincost, maxcost);
                    break;
                case "플래너":
                    pl = pRepo.estMainpl(mincost, maxcost);
                    break;
                case "웨딩홀":
                    wc = wcRepo.findByWlocation(location);
                    if(!wc.isEmpty())
                        for(WeddingComp c : wc)
                            wh.add(whRepo.estMainWh(c.getWidx(),mincost, maxcost));
                    break;
                case "스드메":
                    sdm = sRepo.estMainWh(location, mincost, maxcost);
                    break;
            }
            log.info("검색 성공");

            eMain.put("hm", hm);
            eMain.put("pl", pl);
            eMain.put("wh", wh);
            eMain.put("sdm", sdm);
        }catch (Exception e){
            e.printStackTrace();
            log.info("검색 실패");
        }
        return eMain;
    }
}