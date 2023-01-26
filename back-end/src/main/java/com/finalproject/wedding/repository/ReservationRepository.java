package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Member;
import com.finalproject.wedding.entity.Reservations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

public interface ReservationRepository extends CrudRepository<Reservations, String> {
    List<Reservations> findByRmid(String rmid);

    @Query("Select rwh from Reservations rwh where( rwh.rdate=?1 and rwh.rtype='웨딩홀' )")
    List<Reservations> findByRwhdate(Date wdate);
    @Query("Select rs from Reservations rs where( rs.rdate=?1 and rs.rtype='스드메' )")
    List<Reservations> findByRsdate(Date sdate);
    @Query("Select rp from Reservations rp where( rp.rdate=?1 and rp.rtype='플래너')")
    List<Reservations> findByRpdate(Date pdate);
    @Query("Select rh from Reservations rh where( rh.rdate=?1 and rh.rtype='허니문')")
    List<Reservations> findByRhdate(Date hdate);

    List<Reservations> findByRtypeContaining(String str);

    List<Reservations> findByRmidContaining(String str);

    Reservations findByRsidx(int sidx);

    Reservations findByRhidx(int hidx);

    Reservations findByRwhidx(int whidx);

    Reservations findByRpidx(int pidx);

    List<Reservations> findByRtype(String rtype);

    int countByRwhidx(int whidx);

    int countByRmid(String mid);
    @Modifying
    @Transactional
    void deleteByRidx(int ridx);
    Reservations findByRidx(int ridx);

    Page<Reservations> findByRidxGreaterThan(int i, Pageable pb);
}
