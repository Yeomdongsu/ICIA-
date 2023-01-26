package com.finalproject.wedding.repository;

import com.finalproject.wedding.entity.Declares;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DeclareRepository extends CrudRepository<Declares, String> {
    int countByDecmid(String mid);

    List<Declares> findByDecbmidAndDecbnoAndDectypeAndDecmid(String decbmid, Integer decbno, String dectype, String decmid);

    List<Declares> findByDecbmid(String mid);

    Page<Declares> findByDecidxGreaterThan(int i, Pageable pb);
}
