package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.SDM;
import com.finalproject.wedding.entity.WeddingHall;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SDMRepository extends CrudRepository<SDM, Integer> {
    SDM findBySidx(int sidx);

    @Query("SELECT s FROM SDM s WHERE (s.slocation Like %?1% or s.slocation Like %?2% or s.slocation Like %?3% or s.slocation Like %?4% or s.slocation Like %?5% or s.slocation Like %?6% or s.slocation Like %?7% or s.slocation Like %?8% or s.slocation Like %?9% or s.slocation Like %?10% or s.slocation Like %?11% or s.slocation Like %?12% or s.slocation Like %?13% or s.slocation Like %?14% or s.slocation Like %?15% or s.slocation Like %?16%) And (s.sprice between ?17 and ?18)")
    List<SDM> findBySSlocation(String sseoul, String sgyeong, String sin, String sgang, String sje, String sdae, String schungbuk, String schungnam, String sbu, String sul, String sgyeongnam, String daegu, String sgyeongbuk, String sgwang, String sjeonnam, String sjeonbuk, int wminprice, int wmaxprice);

    List<SDM> findByScompContaining(String str);

    @Query("SELECT s FROM SDM s WHERE((s.slocation=?1)AND(s.sprice>=?2)AND(s.sprice<=?3))")
    List<SDM> estMainWh(String slocation, int mincost, int maxcost);

    List<SDM> findAllBySidx(int sidx);

    SDM findByScompAndSphoneAndSstr(String scomp, String sphone, Object o);

    @Query("SELECT s FROM SDM s WHERE s.sstr IS NOT NULL")
    Page<SDM> findBySstr(Pageable pb);

    Page<SDM> findBySstrIsNull(Pageable pb);
}
