package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.WeddingComp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WeddingCompRepository extends CrudRepository<WeddingComp, String> {

    @Query("SELECT w FROM WeddingComp w WHERE w.wlocation Like %?1% or w.wlocation Like %?2% or w.wlocation Like %?3% or w.wlocation Like %?4% or w.wlocation Like %?5% or w.wlocation Like %?6% or w.wlocation Like %?7% or w.wlocation Like %?8% or w.wlocation Like %?9% or w.wlocation Like %?10% or w.wlocation Like %?11% or w.wlocation Like %?12% or w.wlocation Like %?13% or w.wlocation Like %?14% or w.wlocation Like %?15% or w.wlocation Like %?16%")
    List<WeddingComp> findBySWClocation(String wseoul, String wgyeong, String win, String wgang, String wje, String wdae, String wchungbuk, String wchungnam, String wbu, String wul, String wgyeongnam, String wdaegu,String wgyeongbuk, String wgwang, String wjeonnam, String wjeonbuk);


//    Page<WeddingComp> findByWidx(String widx, Pageable pb);

//    Page<WeddingComp> findByAll(Pageable pb);

    Page<WeddingComp> findByWidxGreaterThan(int i, Pageable pb);

    List<WeddingComp> findByWlocation(String location);

    WeddingComp findByWnameAndWphone(String wname, String wphone);

    WeddingComp findByWidx(int whwcidx);
}
