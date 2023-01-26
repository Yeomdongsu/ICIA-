package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.HoneyMoon;
import com.finalproject.wedding.entity.Planner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HoneyMoonRepository extends CrudRepository<HoneyMoon, String> {

    HoneyMoon findByHidx(int hidx);

    @Query("SELECT h FROM HoneyMoon h WHERE((h.hlocation Like %?1% or h.hlocation Like %?2% or h.hlocation Like %?3% or h.hlocation Like %?4% or h.hlocation Like %?5% or h.hlocation Like %?6% or h.hlocation Like %?7% or h.hlocation Like %?8% or h.hlocation Like %?9% or h.hlocation Like %?10% or h.hlocation Like %?11% or h.hlocation Like %?12% or h.hlocation Like %?13% or h.hlocation Like %?14% or h.hlocation Like %?15%) And (h.hcost between ?16 and ?17))")
    List<HoneyMoon> findBySHlocation(String hgyeong, String hin, String hgang, String hje, String hdae, String hchungbuk, String hchungnam, String hbu, String hul, String hgyeongnam, String hdaegu, String hgyeongbuk, String hgwang, String hjeonnam, String hjeonbuk, int hminprice, int hmaxprice);

    List<HoneyMoon> findByHbrandContaining(String str);

    @Query("SELECT h FROM HoneyMoon h WHERE((h.hlocation=?1)AND(h.hcost>=?2)AND(h.hcost<=?3))")
    List<HoneyMoon> estMainHm(String location, int mincost, int maxcost);

    List<HoneyMoon> findAllByHidx(int hidx);
    
    Page<HoneyMoon> findByHidxGreaterThan(int i, Pageable pb);

    HoneyMoon findByHbrandAndHphoneAndHstr(String hbrand, String hphone, Object o);

    Page<HoneyMoon> findByHstrIsNull(Pageable pb);

    @Query("SELECT h FROM HoneyMoon h WHERE h.hstr IS NOT NULL")
    Page<HoneyMoon> findByHstr(Pageable pb);

    List<HoneyMoon> findAllByHarrival(String hseoul);

    @Query("SELECT h FROM HoneyMoon h WHERE h.hstr IS NOT NULL")
    List<HoneyMoon> findByHlocation();
}
