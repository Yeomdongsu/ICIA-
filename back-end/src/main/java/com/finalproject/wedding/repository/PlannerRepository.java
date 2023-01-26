package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.HoneyMoon;
import com.finalproject.wedding.entity.Planner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlannerRepository extends CrudRepository<Planner, String> {
    Planner findByPidx(int pidx);

    @Query("select p from Planner p WHERE p.pprice between ?1 and ?2")
    List<Planner> findByPrice(int pminprice, int pmaxprice);
    
    List<Planner> findByPnameContaining(String str);

    Object findByPpriceLessThanEqual(int cost);

    @Query("SELECT p FROM Planner p WHERE((p.pprice>=?2)AND(p.pprice<=?3))")
    List<Planner> estMainpl(int mincost, int maxcost);


    List<Planner> findAllByPidx(int pidx);

    Planner findByPnameAndPphone(String pname, String pphone);

    Page<Planner> findByPstrIsNull(Pageable pb);

    @Query("SELECT p FROM Planner p WHERE p.pstr IS NOT NULL")
    Page<Planner> findByPstr(Pageable pb);

    Page<Planner> findByPidxGreaterThan(int i, Pageable pb);
}
