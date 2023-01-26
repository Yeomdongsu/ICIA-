package com.finalproject.wedding.service;

import com.finalproject.wedding.entity.Declares;
import com.finalproject.wedding.entity.Member;
import com.finalproject.wedding.entity.Reservations;
import com.finalproject.wedding.repository.DeclareRepository;
import com.finalproject.wedding.repository.MemberRepository;
import com.finalproject.wedding.repository.ReservationRepository;
import com.sun.xml.bind.v2.runtime.output.Encoded;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Log
public class MemberService {
    @Autowired
    MemberRepository mRepo;

    @Autowired
    DeclareRepository decRepo;
    @Autowired
    ReservationRepository resRepo;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Transactional
    public String joinMember(Member member) {
        log.info("joinMember()");
        String res = null;

        String epwd = encoder.encode(member.getMpwd());
        member.setMpwd(epwd);
        try{
            if(member.getMid()!=""){
            mRepo.save(member);
            res="ok";}else{res="아이디를입력하세요";}
        }catch(Exception e){
            e.printStackTrace();
            res="failed";
        }
        return res;
    };

    // 로그인
    public Member loginProc(Member member) {
        log.info("loginProc()");
        Member dbMember = null;

        try {
            dbMember = mRepo.findById(member.getMid()).get();
            log.info("dbMember" + dbMember);
            if (encoder.matches(member.getMpwd(), dbMember.getMpwd())){
                //session.setAttribute("member", dbMember);
                log.info("" + dbMember);
                //log.info("" + session);
                return dbMember;
            }
            else {
                dbMember = null;
            }
        }catch (Exception e){
            log.info(e.getMessage());
            dbMember = null;
        }

        return dbMember;
    }

    // 아이디 찾기
    public String selectId(Member member) {
        log.info("selectId()");
        Member m = null;
        String msg = "";

        try {
            m = mRepo.findByMnameAndMpid(member.getMname(),member.getMpid());
            log.info("" + m);
            if (m != null){
                return m.getMid();
            }else {
                return msg = "일치하는 아이디가 없습니다.";
            }
        }catch (Exception e){
            e.printStackTrace();
            return msg = "일치하는 아이디가 없습니다.";
        }

    }

    public String checkPwd(Member member) {
        log.info("checkPwd()");
        String msg = "";

        try {
            Member id = mRepo.findByMidAndMphone(member.getMid(),member.getMphone());
            log.info("조건에 일치하는 ID : " + id);
            if (id != null){
                return id.getMid();
            }else {
                return msg = "조건에 일치하는 회원이 없습니다.";
            }
        }catch (Exception e){
            e.printStackTrace();
            return msg = "조건에 일치하는 회원이 없습니다.";
        }

    }

    @Transactional
    public String resetPwd(Member member) {
        log.info("resetPwd()");
        Member dbMember = null;
        String msg = "";

        try {
            dbMember = mRepo.findById(member.getMid()).get();
            log.info("dbMember -> " + dbMember);
            if (dbMember != null){
                String newPwd = encoder.encode(member.getMpwd());
                dbMember.setMpwd(newPwd);
                mRepo.save(dbMember);
                msg = "성공";
            }else {
                msg = "실패";
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return msg;
    }

    public Map<String, Object> searchUserAll(Integer pageNum) {
        log.info("searchUserAll");
        if (pageNum == null) {
            pageNum = 1;
        }
        int listCnt = 5;

        // 페이징 조건 생성
        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.ASC, "mid");

        Page<Member> result = mRepo.findByGrade("user", pb);
        List<Member> member = result.getContent();

        // 신고테이블/예약테이블 에서 멤버 아이디로 검색
        for(Member m: member){
            log.info(m.getMid());
            List<Declares> dList = decRepo.findByDecbmid(m.getMid());
            log.info("여기");
            log.info(dList.toString());
            List<Reservations> rList = resRepo.findByRmid(m.getMid());
            log.info("예약" + rList.toString());
            int rCnt = 0;
            for(Reservations r:rList){
                if(r.getRstatus().equals("진행예정")){
                    rCnt++;
                }
            }
            log.info("진행예정 : "+rCnt);
            log.info("예약 수 : "+rList.size());
            m.setMresc(rCnt);
            m.setRList(rList);
            m.setDfList(dList);
        }

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("member", member);
        log.info("" + result.getContent());

        return res;
    }

    //회원가입에서사용 아이디중복체크
    public String compareId(String mid) {
        Member findmem = mRepo.findByMid(mid);
        if(findmem==null)
            return "Ok";
        return "Failed";
    }

    // 마이페이지 내정보
    public Member mypage(String mid) {
        log.info("mypage()");
        Member mem = new Member();
        try {
            mem = mRepo.findByMid(mid);
            mem = mRepo.findById(mid).get();

            log.info(mem.toString());
            mRepo.save(mem);
            log.info("bb"+mem);
            log.info("담았느냐");
        }catch (Exception e) {
            log.info("못담았느냐");
            e.printStackTrace();
        }
            return mem;
    }

    // 마이페이지 정보수정
    public String updateMy(Member mem) {
        log.info("updateMy()");
        Member mData = null;
        String msg =null;
        try {
            mData = mRepo.findById(mem.getMid()).get();
            log.info("ㅠㅠ" + mem.getMpwd());
            log.info("흐악ㅇㄱㅇㄱㅇ"+mem);

            if(mem.getMpwd()!="") {
                String epwd = encoder.encode(mem.getMpwd());
                mData.setMpwd(epwd);
            }
            if(mem.getMname()!="") {
                mData.setMname(mem.getMname());
            }
            if(mem.getMemail()!="") {
                mData.setMemail(mem.getMemail());
            }
            if(mem.getMphone()!="") {
                mData.setMphone(mem.getMphone());
            }
            if(mem.getMaddr()!="") {
                mData.setMaddr(mem.getMaddr());
            }
            if(mem.getMdaddr()!="") {
                mData.setMdaddr(mem.getMdaddr());
            }
//
            mRepo.save(mData);
            msg ="수정 성공";
        } catch (Exception e){
            e.printStackTrace();
            msg = "수정 실패";
        }
        return msg;
    }

    // 마이페이지 회원 탈퇴
    public String removeMy(Member mem) {
        log.info("removeMy()");
        String msg = null;
        try {
            mRepo.delete(mem);
            msg = "Ok";
        } catch (Exception e){
            msg = "fail";
        }
        return msg;
    }

    // 네이버 로그인 회원가입
    public String naverLogin(String mid, String mname) {
        log.info("naverLogin()");
        Member dbMember = null;
        String msg = "";

        try {
            if (mRepo.findById(mid).isPresent() == false) {
                Member member = new Member();
                member.setMid(mid);
                member.setMname(mname);
                mRepo.save(member);
                msg = "회원가입 성공";
            }else {
                msg = "존재하는 아이디";
            }

        } catch (Exception e){
            e.printStackTrace();
            msg = "회원가입 실패";
        }

        return msg;
    }

    // 구글 로그인 회원가입
    public String googleLogin(String mid, String mname) {
        log.info("googleLogin()");
        Member dbMember = null;
        String msg = "";

        try {
            if (mRepo.findById(mid).isPresent() == false) {
                Member member = new Member();
                member.setMid(mid);
                member.setMname(mname);
                mRepo.save(member);
                msg = "회원가입 성공";
            }else {
                msg = "존재하는 아이디";
            }

        } catch (Exception e){
            e.printStackTrace();
            msg = "회원가입 실패";
        }

        return msg;
    }

    // 네이버 로그인 시 가입 되어있는 회원인지 체크
    public String naverLoginCheck(String mid, String mname) {
        log.info("naverLogin()");
        Member dbMember = null;
        String msg = "";

        try {
            if (mRepo.findById(mid).isPresent() == false) {
                msg = "회원가입 가능";
            }else {
                msg = "존재하는 아이디";
            }

        } catch (Exception e){
            e.printStackTrace();
            msg = "회원가입 실패";
        }

        return msg;
    }

    // 구글 로그인 시 가입 되어있는 회원인지 체크
    public String googleLoginCheck(String mid, String mname) {
        log.info("googleLoginCheck()");
        Member dbMember = null;
        String msg = "";

        try {
            if (mRepo.findById(mid).isPresent() == false) {
                msg = "회원가입 가능";
            }else {
                msg = "존재하는 아이디";
            }

        } catch (Exception e){
            e.printStackTrace();
            msg = "회원가입 실패";
        }

        return msg;
    }

}
