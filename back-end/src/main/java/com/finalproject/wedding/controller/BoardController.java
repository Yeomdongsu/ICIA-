package com.finalproject.wedding.controller;

import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.service.BoardService;
import com.finalproject.wedding.service.HomeService;
import com.finalproject.wedding.service.MemberService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@Log
public class BoardController {

    @Autowired
    private BoardService bServ;

    @Autowired
    private HomeService hServ;

    @Autowired
    private MemberService mServ;


    // 커뮤니티 인기글
    @GetMapping ("bdRank")
    public Map<String, List<Board>> bdRank(){
        log.info("bdRank()");
        return bServ.bdRank();
    }

    // 커뮤니티 리스트
    @GetMapping("list")
    public Map<String, Object> getList(@RequestParam Integer pageNum,String type ,HttpSession session){
        log.info("getList()");
        log.info(""+type);
        return bServ.getBoardList(type, pageNum);
    }

    // 커뮤니티 게시글 작성
    @PostMapping("writeProc")
    public String writeProc(@RequestPart(value = "data", required = true) Board board,
                                          @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                          HttpSession session){
        log.info("writeProc()");
        board.setBmid(board.getBmid());
        log.info("보드에 아이디 넣기");
        log.info(board.getBtitle()+", "+board.getBview());
        return bServ.insertBoard(board, files, session);
    }

    // 커뮤니티 게시판 목록
    @GetMapping("getBoard")
    public Board getBoard(@RequestParam int bno){
        log.info("getBoard() bno:" + bno);
        Board board = bServ.getBoard(bno);
        log.info(board.toString());
        return board;
    }

    @GetMapping("getMemBoard")
    public Map<String, Object> getMemBoard(@RequestParam Integer pageNum, @RequestParam String searchId, HttpSession session){
        log.info("getMemBoard");
        return bServ.getMemBoard(pageNum, searchId);
    }

//    @GetMapping("download")
//    public ResponseEntity<Resource> fileDownload(@RequestParam Files bfile, HttpSession session)
//            throws IOException {
//        ResponseEntity<Resource> resp = bServ.fileDownload(bfile, session);
//        return  resp;
//    }

    // 게시글 수정 페이지로 전환
    @PostMapping("updateProc")
    public String updateProc(@RequestPart(value = "files", required = false) List<MultipartFile> files,  HttpSession session,
                             int bno, @RequestPart(value = "data", required = true) Board board){
        log.info("updateProc()");
        log.info("글번호 : "+bno);
        log.info("제목 : " + board.getBtitle());
        String msg = bServ.boardUpdate(files, session, bno, board);
        return msg;
    }

    // 커뮤니티 게시글 신고하기
    @PostMapping("declProc")
    public String  declProc(@RequestBody Map declares){
        log.info("declProc()");
        log.info("여기여기" + declares.toString());
        return bServ.declareBoard(declares);
    }

    // 커뮤니티 댓글 작성
    @PostMapping("Bwritecomment")
    public Comment Bwritecomment(@RequestBody Comment comment){
        log.info("Bwritecomment()");
        log.info("ㅜㅜ" + comment);
        return bServ.Bwritecomment(comment);
    }


    // 커뮤니티 디테일 댓글 불러오기
    @GetMapping("BcommentList")
    public List BcommentList(@RequestParam int mentbno){
        log.info("BcommentList()");
        return bServ.BcommentList(mentbno);
    }

    // 커뮤니티 디테일 댓글 수정하기
    @PostMapping("updateBcomment")
    public List<Comment> updateBcomment(@RequestBody Comment comment){
        log.info("updateBcomment()");
        log.info(comment.toString());
        log.info("히힛" + comment.getMentstrup());
//        log.info(mentup);
        return bServ.updateBcomment(comment);
    }

    // 커뮤니티 디테일 댓글 삭제하기
    @PostMapping("deleteBcomment")
    public String deleteBcomment(@RequestBody Comment comment){
        log.info("deleteBcomment()");
        log.info("뭐찍었게"+comment);
        return bServ.deleteBcomment(comment);
    }


    // 게시글 삭제
    @GetMapping("deleteProc")
    public String deleteProc(@RequestParam int bno, HttpSession session){
        log.info("deleteProc()");
        log.info("보드"+bno);
        return bServ.deleteBoard(bno, session);
    }

    // 서비스게시판 1:1문의 글쓰기
    @PostMapping("serviceCenterWrite")
    public String serviceCenterWrite(@RequestBody Board board){
        log.info("serviceCenterWrite()");
        return bServ.serviceCenterWrite(board);
    }

    // 서비스게시판 게시글 출력
    @GetMapping("ServiceList")
    public Map<String, Object> ServiceList(@RequestParam Integer pageNum, String content, String type, HttpSession session){
        log.info("ServiceList()");
        return bServ.getServiceList(pageNum,content,type);
    }

    // 서비스게시판 게시글 상세
    @GetMapping("ServiceCenterDetail")
    public Board ServiceCenterDetail(@RequestParam int bno, String type){
        log.info("ServiceCenterDetail()");
        return bServ.ServiceCenterDetail(bno, type);
    }

    // 서비스게시판 게시글 비밀번호 확인
    @PostMapping("SboardPwd")
    public String SboardPwd(@RequestBody Board board){
        log.info("SboardPwd()");
        return bServ.SboardPwd(board);
    }

    // 서비스게시판 게시글 댓글쓰기
    @PostMapping("Swritecomment")
    public String Swritecomment(@RequestBody Comment comment){
        log.info("Swritecomment()");
        return bServ.Swritecomment(comment);
    }

    // 서비스게시판 게시글 댓글 불러오기
    @GetMapping("ScommentList")
    public Comment ScommentList(@RequestParam int mentbno){
        log.info("ScommentList()");
        return bServ.ScommentList(mentbno);
    }

    // 서비스게시판 게시글 댓글 삭제하기
    @PostMapping("deleteComment")
    public String deleteComment(@RequestBody Comment comment){
        log.info("deleteComment()");
        return bServ.deleteComment(comment);
    }
    
    // 웨딩뉴스 작성하기
    @PostMapping("newsWrite")
    public String newsWrite(@RequestPart(value = "data", required = true) Board board,
                            @RequestPart(value = "files", required = false) List<MultipartFile> files,
                            HttpSession session){
        log.info("newsWrite()");
        return bServ.newsWrite(board, files, session);
    }

    // 웨딩뉴스 전체 출력
    @GetMapping("newsList")
    public Map<String, Object> newsList(@RequestParam Integer pageNum, String type){
        log.info("newsList()");
        return bServ.newsList(pageNum, type);
    }

    // 웨딩뉴스 전체 출력 시 필요한 이미지 출력
    @GetMapping("newsListImg")
    public List<Files> newsListImg(@RequestParam String type){
        log.info("newsListImg()");
        return bServ.newsListImg(type);
    }

    // 웨딩뉴스 상세 보기
    @GetMapping("newsDetail")
    public Board newsDetail(@RequestParam int bno, String type){
        log.info("newsDetail()");
        return bServ.newsDetail(bno,type);
    }

    // 리뷰 입력
    @GetMapping("inputReview")
    public String inputReview(@RequestPart(value = "board") Board board,
                              List<MultipartFile> files,
                              HttpSession session){
        log.info("inputReview()");
        Member member = (Member) session.getAttribute("member");
        if(bServ.checkMemberReview(member)) {
            board.setBmid(member.getMid());
            return bServ.insertBoard(board, files, session);
        }
        return "fail";
    }

    // main 공지사항
    @GetMapping("searchNotiAll")
    public List<Board> searchNotiAll(){
        log.info("searchNotiAll()");
        List<Board> noti = bServ.searchNotiAll();
        return noti;
    }

    // 서비스게시판 게시글 삭제하기
    @PostMapping("SboardDel")
    public String SboardDel(@RequestBody Board board){
        log.info("SboardDel()");
        return bServ.SboardDel(board);
    }

    // 웨딩 뉴스 게시글 삭제하기
    @PostMapping("newsDel")
    public String newsDel(@RequestBody Board board, HttpSession session){
        log.info("newsDel()");
        return bServ.newsDel(board, session);
    }
}

