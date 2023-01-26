package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.HoneyMoon;
import com.finalproject.wedding.entity.Planner;
import com.finalproject.wedding.entity.WeddingHall;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WeddingHoleRepository extends CrudRepository<WeddingHall, String> {
    WeddingHall findByWhidx(int whidx);

    @Query("SELECT DISTINCT wh from WeddingHall wh WHERE (wh.whwcidx=?1) And (wh.whprice between ?2 and ?3) And (wh.whkind=?4 or wh.whkind=?5 or wh.whkind=?6 or wh.whkind=?7 or wh.whkind=?8 or wh.whkind=?9 or wh.whkind=?10)")
    List<WeddingHall> findByWhwcidx2(int whwcidx, int wminprice, int wmaxprice, String common, String trad, String hotel, String house, String church, String cathedral, String outdoor);
    @Query("SELECT DISTINCT wh from WeddingHall wh WHERE (wh.whwcidx=?1) And (wh.whprice between ?2 and ?3)")
    List<WeddingHall> findByWhwcidx3(int whwcidx, int wminprice, int wmaxprice);

    List<WeddingHall> findByWhnameContaining(String str);

    WeddingHall findByWhwcidx(int widx);

    @Query("SELECT wh FROM WeddingHall wh WHERE((wh.whwcidx=?1)AND(wh.whprice>=?2)AND(wh.whprice<=?3))")
    WeddingHall estMainWh(int whwcidx, int mincost, int maxcost);


//    @Query("SELECT wh FROM WeddingHall wh WHERE wh.whidx=?1")
    List<WeddingHall> findAllByWhidx(int whidx);

    Page<WeddingHall> findByWhidxGreaterThan(int i, Pageable pb);
}
