package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Dib;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DibRepository extends CrudRepository<Dib, String> {
    List<Dib> findAllByDmid(String dmid);
    @Modifying
    @Transactional
    @Query("DELETE FROM Dib d WHERE (d.dwhidx=?1 AND d.dmid=?2)")
    void deleteByDwhidxmid(int dwhidx, String dmid);
    @Modifying
    @Transactional
    @Query("DELETE FROM Dib d WHERE (d.dsidx=?1 AND d.dmid=?2)")
    void deleteByDsidxmid(int dsidx, String dmid);
    @Modifying
    @Transactional
    @Query("DELETE FROM Dib d WHERE (d.dpidx=?1 AND d.dmid=?2)")
    void deleteByDpidxmid(int dpidx, String dmid);
    @Modifying
    @Transactional
    @Query("DELETE FROM Dib d WHERE (d.dhidx=?1 AND d.dmid=?2)")
    void deleteByDhidxmid(int dhidx, String dmid);
}
