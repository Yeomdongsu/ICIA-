package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.Board;
import com.finalproject.wedding.entity.Member;
import com.finalproject.wedding.service.MemberService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class MemberController {
    @Autowired
    private MemberService mServ;

    @PostMapping("/joinProc")
    public String joinProc(@RequestBody Member member){
        log.info("joinProc()");
        String res = mServ.joinMember(member);
        return res;
    }

    // 로그인
    @ResponseBody
    @PostMapping("loginProc")
    public Member loginProc(@RequestBody Member member, HttpServletRequest request){
        log.info("loginProc()");
        HttpSession session = request.getSession();
        Member login = mServ.loginProc(member);
        session.setAttribute("member", login);
        return login;
    }

    // 아이디 찾기
    @ResponseBody
    @PostMapping("selectId")
    public String selectId(@RequestBody Member member){
        log.info("selectId()");
        log.info("" + member);
        return mServ.selectId(member);
    }

    // 비밀번호 재설정 할 ID 찾기
    @ResponseBody
    @PostMapping("checkPwd")
    public String checkPwd(@RequestBody Member member){
        log.info("checkPwd()");
        return mServ.checkPwd(member);
    }

    // 비밀번호 재설정하기
    @ResponseBody
    @PostMapping("resetPwd")
    public String resetPwd(@RequestBody Member member){
        log.info("resetPwd()");
        return mServ.resetPwd(member);
    }

    @GetMapping("searchUserAll")
    public Map<String, Object> searchUserAll(@RequestParam Integer pageNum, HttpSession session){
        log.info("searchMemberAll");
        return mServ.searchUserAll(pageNum);
    }


    //회원가입에서사용 아이디중복체크
    @GetMapping("compareId")
    public String compareId(String mid){
        log.info("mypage()");
        return mServ.compareId(mid);
    }

    // 마이페이지 내정보
    @PostMapping("mypage")
    public Member mypage(@RequestParam String mid) {
        log.info("mypage()");
        log.info("불러와 :" +mid);
        Member member = mServ.mypage(mid);
        log.info(member.toString());
        return member;
    }

    // 마이페이지 정보수정
    @ResponseBody
    @PostMapping("updateMy")
    public String updateMy(@RequestBody Member mem){
        log.info("updateMy()");
        return  mServ.updateMy(mem);
    }


    // 네이버 로그인 회원가입
    @GetMapping("naverLogin")
    public String naverLogin(@RequestParam String mid, String mname){
        log.info("naverLogin()");
        return mServ.naverLogin(mid, mname);
    }
    
    // 마이페이지 회원탈퇴
    @PostMapping("resignMy")
    public String resignMy(@RequestBody Member mem ){
        log.info("resignMy()");
        return mServ.removeMy(mem);
    }

    // 구글 로그인 회원가입
    @GetMapping("googleLogin")
    public String googleLogin(@RequestParam String mid, String mname){
        log.info("googleLogin()");
        return mServ.googleLogin(mid, mname);
    }

    // 네이버 로그인 시 가입 되어있는 회원인지 체크
    @GetMapping("naverLoginCheck")
    public String naverLoginCheck(@RequestParam String mid, String mname){
        log.info("naverLogin()");
        return mServ.naverLoginCheck(mid, mname);
    }

    // 구글 로그인 시 가입 되어있는 회원인지 체크
    @GetMapping("googleLoginCheck")
    public String googleLoginCheck(@RequestParam String mid, String mname){
        log.info("googleLogin()");
        return mServ.googleLoginCheck(mid, mname);
    }

}
