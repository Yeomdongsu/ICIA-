package com.finalproject.wedding.service;

import com.finalproject.wedding.entity.*;
import com.finalproject.wedding.repository.*;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.*;

@Service
@Log
public class BoardService {

    // Repository 선언

    @Autowired
    private MemberRepository mRepo;
    @Autowired
    private BoardRepository bRepo;
    @Autowired
    private CommentRepository cRepo;
    @Autowired
    private DeclareRepository desRepo;
    @Autowired
    private DibRepository dibRepo;
    @Autowired
    private EventRepository eveRepo;
    @Autowired
    private FilesRepository fRepo;
    @Autowired
    private HoneyMoonRepository hmRepo;
    @Autowired
    private PlannerRepository planRepo;
    @Autowired
    private ReservationRepository resRepo;
    @Autowired
    private SDMRepository sdmRepo;
    @Autowired
    private WeddingCompRepository wcRepo;
    @Autowired
    private WeddingHoleRepository whRepo;

    @Autowired
    private FilesRepository bfRepo; // 파일 DB 처리용

    ModelAndView mv;
    Model model;

    //커뮤니티 인기글
    public Map<String, List<Board>> bdRank() {
        log.info("bdRank");
        Map<String, List<Board>> bMap = new HashMap<>();
        try {
            bMap.put("a",bRepo.findAllByBtype("공지사항", Sort.by("bview")));
            bMap.put("b",bRepo.findAllByBtype("추천할래요", Sort.by("bview")));
            bMap.put("c",bRepo.findAllByBtype("업체후기톡톡", Sort.by("bview")));
            bMap.put("d",bRepo.findAllByBtype("자랑할래요", Sort.by("bview")));
            bMap.put("e",bRepo.findAllByBtype("고민있어요", Sort.by("bview")));
        } catch(Exception e){
            e.printStackTrace();
        }
        log.info(bMap.toString());
        return bMap;
    }


    //커뮤니티 게시글 리스트
    public Map<String, Object> getBoardList(String type,Integer pageNum){
        log.info("getBoardList()");

        if (pageNum == null){ // 처음에 접속할때 pageNum 못넘어오게
            pageNum = 1;
        }
        int listCnt = 10; // 페이지당 보여질 게시글 갯수

        // 페이징 조건 생성
        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC, "bno");

        Page<Board> result = bRepo.findByBtype(type, pb);
        List<Board> bList = result.getContent();
        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("bList", bList);
        log.info(""+result.getContent());

        return res;
    }

    // 커뮤니티 목록
    public Board getBoard(int bno){
        log.info("getBoard()");
        Board board = new Board();
        try{
            // 게시글 담기
            board = bRepo.findByBno(bno);
            board = bRepo.findById(bno).get();
            int view = board.getBview();
            board.setBview(view +1);
            bRepo.save(board);

            log.info("board collecting");
        }catch (Exception e){
            log.info("board Collecting Fail");
            e.printStackTrace();
        }

        // 첨부파일(목록) 가져와서 담기
        List<Files> bfList = bfRepo.findByFid(board.getBno());

        board.setBfList(bfList);
        return board;
    }

    // 커뮤니티 게시글 작성
    public String insertBoard(Board board, List<MultipartFile> files, HttpSession session){
        log.info("insertBoard()");
        String msg ="fail";
        log.info("Board : " + board.toString());
        try {
            bRepo.save(board);
            log.info("bno : " + board.getBno());

            if (files != null){
                log.info("files not null");
                fileUpload(files, session, board.getBno(), board.getBtype());
                log.info("files not null and fileUploading");
            }else{
                log.info("파일이 없어요");
            }

            msg = "Ok";
        } catch (Exception e){
            e.printStackTrace();
        }
        return msg;
    }


    // 게시글 작성 파일 업로드
    public void fileUpload(List<MultipartFile> files, HttpSession session, int bno, String btype)
            throws Exception{
        log.info("fileUpload()");
        // 파일 저장 위치 지정. session을 활용
        String realPath = session.getServletContext().getRealPath("/");
        log.info("realPath : " + realPath);
        // 파일 업로드용 폴더를 자동으로 생성하도록 처리
        // 업로드용 폴더 : upload
        realPath += "upload/";
        File folder = new File(realPath);
        if (folder.isDirectory() == false){ // 폴더가 없을 경우 실행
            folder.mkdir(); // 폴더 생성 메소드
        }
        for (MultipartFile mf : files){
            String orname = mf.getOriginalFilename(); // 업로드 파일명 가져오기
            if (orname.equals("")){
                // 업로드할 파일이 없음
                return; // 저장처리 중지
            }

            // 파일 정보를 저장(to filetbl)
            Files bf = new Files();
            Board board = bRepo.findByBno(bno);
            bf.setFid(board.getBno()); // 뮨제 생기면 여기임
            bf.setForiname(orname);
            String sysname = System.currentTimeMillis() +
                    orname.substring(orname.lastIndexOf("."));
            bf.setFsysname(sysname);
            bf.setFtype(btype);

            // 업로드하는 파일을 upload 폴더에 저장
            File file = new File(realPath + sysname);

            // 파일 저장(upload 폴더)
            mf.transferTo(file);

            // 파일 정보를 DB에 저장
            bfRepo.save(bf);
        }
    }

    // 파일 다운로드 처리 메소드
    public ResponseEntity<Resource> fileDownload(Files bfile, HttpSession session)
            throws IOException {
        log.info("fileDownload()");

        // 파일 저장 경로 구하기
        String realPath = session.getServletContext().getRealPath("/");
        realPath += "upload/" + bfile.getFsysname();

        InputStreamResource fResource =
                new InputStreamResource(new FileInputStream(realPath));

        // 파일명이 한글인 경우의 처리(UTF-8로 인코딩 처리)
        String fileName = URLEncoder.encode(bfile.getForiname(), "UTF-8");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .cacheControl(CacheControl.noCache())
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename="+ fileName)
                .body(fResource);
    }


//    public Member findingMember(String str){
//        log.info("findingMember()");
//        Member m = new Member();
//        try{
//            Optional<Member> mem = mRepo.findByMid(str);
//            if(mem !=null){
//                m = mem.get();
//            }else{
//                m=null;
//            }
//        }catch (Exception e){
//            e.printStackTrace();
//            m = null;
//        }
//
//        return m;
//    }



    // 커뮤니티 게시글 수정
    @Transactional
    public String boardUpdate(List<MultipartFile> files, HttpSession session, int bno, Board board) {
        log.info("boardUpdate()");
        String msg = null;
        try {
            Board bData = bRepo.findByBno(bno);
            bData.setBtitle(board.getBtitle());
            bData.setBstr(board.getBstr());
            bData.setBtype(board.getBtype());
            bRepo.save(bData);
//            bRepo.findByBno(board.getBno());
            if (files != null){
                log.info("files not null");
                fileUpload(files, session, bno, board.getBtype());
                log.info("files not null and fileUploading");
            }else{
                log.info("파일이 없어요");
            }
            msg = "Ok";
        } catch (Exception e) {
            e.printStackTrace();
            msg = "수정 실패";
        }
        return msg;
    }

    // 커뮤니티 게시글 신고하기
    public String declareBoard(Map declares) {
        log.info("declareBoard()");
        String  msg = null;
        Declares declare = new Declares();
        try {
            declare.setDecbmid(declares.get("decbmid").toString());
            declare.setDecbno(Integer.parseInt(declares.get("decbno").toString()));
            declare.setDectype(declares.get("dectype").toString());
            declare.setDecmid(declares.get("decmid").toString());
            List<Declares> chk = desRepo.findByDecbmidAndDecbnoAndDectypeAndDecmid(declare.getDecbmid(), declare.getDecbno(),declare.getDectype(),declare.getDecmid());
            log.info(chk.toString());
            log.info(chk.size()+"");
            if(chk.size()!=0){
                msg="Already";
            } else {
                Member member = new Member();
                member = mRepo.findByMid(declare.getDecbmid());
                member.setMdec(member.getMdec() + 1);
                mRepo.save(member);
                desRepo.save(declare);
                msg = "Ok";
            }
        }catch (Exception e) {
            e.printStackTrace();

            msg = "fail";
        }
        return msg;
    }

    // 게시글 삭제
    @Transactional
    public String deleteBoard(int bno, HttpSession session) {
        log.info("deleteBoard()");
        String msg = null;
//        Board board = new Board();
//        board.setBno(bno);
//        board.setBno(board.getBno());

        log.info("ㅠㅜㅠㅜㅠㅜ:" + bno);

        String realPath = session.getServletContext().getRealPath("/");
        realPath += "upload/";

        List<Files> bfList = bfRepo.findByFid(bno);
        try {
            // 파일삭제
            for (Files bf : bfList){
                realPath += bf.getFsysname();
                File file = new File(realPath);

                if (file.exists()){
                    file.delete();
                }
                // 파일 정보 삭제
                fRepo.deleteByFid(bf.getFid());
            }
            // 댓글삭제
            cRepo.deleteByMentbno(bno);
            // 게시글 삭제
            bRepo.deleteById(bno);

            msg = "Ok";
        } catch (Exception e){
            e.printStackTrace();
            msg = "fail";
        }

        return msg;
    }

    // 커뮤니티 게시판 댓글쓰기
    public Comment Bwritecomment(Comment comment) {
        log.info("Bwritecomment");
        try {
            cRepo.save(comment);
        } catch (Exception e){
            e.printStackTrace();
        }
        return comment;
    }

    // 커뮤니티 디테일 댓글 가져오기
    public List BcommentList(int mentbno) {
        log.info("BcommentList()");
        List<Comment> comment = null;

        try {
            comment = cRepo.findByMentbno2(mentbno);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return comment;
    }

    // 커뮤니티 디테일 댓글 수정하기
    public List<Comment> updateBcomment(Comment comment) {
        log.info("updateBcomment()");
        List<Comment> cList = new ArrayList<>();

        try {
            log.info(comment.getMentstr());

            cRepo.save(comment);
            log.info("수정완료");
            cList = cRepo.findByMentbno2(comment.getMentbno());
            log.info("수정된댓글리스트" + cList.toString());

        }catch (Exception e){
            e.printStackTrace();
        }
        return cList;
    }

    // 커뮤니티 디테일 댓글 삭제하기
    public String deleteBcomment(Comment comment) {
        log.info("deleteBcomment()");
        String msg = null;
        try {
            cRepo.delete(comment);
            msg = "Ok";
        }catch (Exception e){
            e.printStackTrace();
            msg = "fail";
        }
        return msg;
    }

    // 서비스 1:1문의 글쓰기
    @Transactional
    public String serviceCenterWrite(Board board) {
        log.info("serviceCenterWrite()");
        String msg = "";

        try{
            bRepo.save(board);
            msg = "성공";
        }catch (Exception e){
            e.printStackTrace();
            msg = "실패";
        }

        return msg;
    }

    // 서비스게시판 게시글 출력
    public Map<String, Object> getServiceList(Integer pageNum, String content, String type) {
        log.info("getServiceList()");

        if(pageNum == null){//처음에 접속했을 때는 pageNum이 넘어오지 않는다.
            pageNum = 1;
        }

        int listCnt = 10; // 페이지당 보여질 게시글 갯수

        Map<String, Object> res = new HashMap<>();

        if(content.equals("")) {
            Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC, "bno");
            Page<Board> result = bRepo.findByBtype(type, pb);
            List<Board> bList = result.getContent();
            int totalPage = result.getTotalPages();

            res.put("bList", bList);
            res.put("pageNum", pageNum);
            res.put("totalPage", totalPage);
        }else{
            Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC,"bno");
            Page<Board> board = bRepo.findByBtitleContainingAndBtype(content, type, pb);
            List<Board> bList = board.getContent();
            int totalPage = board.getTotalPages();

            res.put("totalPage", totalPage);
            res.put("pageNum", pageNum);
            res.put("bList", bList);
        }
        return res;
    }

    // 서비스게시판 게시글 상세
    public Board ServiceCenterDetail(int bno, String type) {
        log.info("ServiceCenterDetail()");
        Board board = null;

        try{
            board = bRepo.findByBnoAndBtype(bno,type);
            log.info("board 값 : " + board);

        }catch (Exception e){
            e.printStackTrace();
            board = null;
        }
        return board;
    }

    // 서비스게시판 게시글 비밀번호 확인
    public String SboardPwd(Board board) {
        log.info("SboardPwd()");
        Board pwd = null;
        String msg = "";

        try {
            pwd = bRepo.findByBnoAndBpwd(board.getBno(),board.getBpwd());
            if (pwd.getBpwd().equals(board.getBpwd())){
                msg = "일치";
            } else {
                msg = "불일치";
            }

        }catch (Exception e){
            e.printStackTrace();
            msg = "불일치";
        }

        return msg;
    }

    // 서비스게시판 게시글 댓글쓰기
    public String Swritecomment(Comment comment) {
        log.info("Swritecomment()");
        String msg = "";

        try {
            cRepo.save(comment);
            msg = "성공";
        }catch (Exception e){
            e.printStackTrace();
            msg = "실패";
        }

        return msg;
    }

    // 서비스게시판 게시글 댓글 불러오기
    public Comment ScommentList(int mentbno) {
        log.info("ScommentList()");
        Comment comment = null;

        try{
            comment = cRepo.findByMentbno(mentbno);

        }catch (Exception e){
            e.printStackTrace();
        }

        return comment;
    }

    // 서비스게시판 게시글 댓글 삭제하기
    public String deleteComment(Comment comment) {
        log.info("deleteComment()");
        String msg = "";

        try {
            cRepo.delete(comment);
            msg = "성공";
        }catch (Exception e){
            e.printStackTrace();
            msg = "실패";
        }

        return msg;
    }


    // 웨딩뉴스 작성하기
    public String newsWrite(Board board, List<MultipartFile> files, HttpSession session) {
        log.info("newsWrite()");
        String msg = "";

        try {
            bRepo.save(board);
            log.info("bno : " + board.getBno());
            msg = "ok";

            if (files != null){
                fileUpload(files, session, board.getBno(), board.getBtype());
            }

        }catch (Exception e){
            e.printStackTrace();
            msg = "fail";
        }

        return msg;
    }
        
    // 웨딩뉴스 전체 출력
    public Map<String, Object> newsList(Integer pageNum, String type) {
        log.info("newsList()");

//        if (pageNum == null) {//처음에 접속했을 때는 pageNum이 넘어오지 않는다.
//            pageNum = 1;
//        }

        int listCnt = 13; // 페이지당 보여질 게시글 갯수

        // 페이징 조건 생성
        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.ASC, "bno");

        Page<Board> result = bRepo.findByBtype(type, pb);
        List<Board> bList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("bList", bList);
        log.info("" + result.getContent());

        return res;
    }

    // 웨딩뉴스 전체 출력 시 필요한 이미지 출력
    public List<Files> newsListImg(String type) {
        log.info("newsListImg()");

        List<Files> bfList = bfRepo.findByFtype(type);
        return bfList;
    }

    // 웨딩뉴스 상세 보기
    public Board newsDetail(int bno, String type) {
        log.info("newsDetail()");

        Board board = bRepo.findByBnoAndBtype(bno,type);

        List<Files> bfList = bfRepo.findByFidAndFtype(bno,type);

        board.setBfList(bfList);

        return board;
    }

    // 현재 회원의 리뷰 작성 가능 여부 판단
    public Boolean checkMemberReview(Member member) {
        log.info("checkMemberReview()");

        try{
            int res = mRepo.findByMid(member.getMid()).getMresc();
            if(res>0)
                return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    // 공지사항 가져오기
    public List<Board> searchNotiAll(){
        log.info("searchNotiAll()");
        List<Board> noti = new ArrayList<>();
        String str = "공지사항";
        try{
            noti = bRepo.findByBtypes(str);
            log.info("공지사항을 가져오는 중입니다.");
        }catch (Exception e){
            log.info("공지사항을 가져오지 못했습니다.");
            e.printStackTrace();
        }
        return noti;
    }

    public Map<String, Object> getMemBoard(Integer pageNum, String searchId) {
        log.info("getMemBoard");

        if(pageNum == null){
            pageNum = 1;
        }
        int listCnt = 10;
            Map<String, Object> res = new HashMap<>();

        if(searchId.equals("")) {
            Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC, "bno");
            Page<Board> result = bRepo.findByBtypeMem("자랑할래요", "추천할래요", "업체후기톡톡", "고민있어요", pb);
            List<Board> bList = result.getContent();

            int totalPage = result.getTotalPages();

            res.put("bList", bList);
            res.put("pageNum", pageNum);
            res.put("totalPage", totalPage);

            log.info("" + result.getContent());
        }
        else{
            Pageable pb = PageRequest.of((pageNum - 1), listCnt, Sort.Direction.DESC,"bno");
            Page<Board> result = bRepo.findByBmidContaining(searchId, pb);
            List<Board> bList = result.getContent();

            int totalPage = result.getTotalPages();

            res.put("bList", bList);
            res.put("totalPage", totalPage);
            res.put("pageNum", pageNum);
        }
        return res;
    }

    // 서비스 게시판 게시글 삭제하기
    public String SboardDel(Board board) {
        log.info("SboardDel()");
        String msg = "";

        try {
            bRepo.delete(board);
            msg = "게시글 삭제 성공";
        } catch (Exception e){
            log.info(e.getMessage());
            msg = "실패";
        }

        return msg;
    }

    // 웨딩 뉴스 게시글 삭제하기
    public String newsDel(Board board, HttpSession session) {
        log.info("newsDel()");
        String msg = "";


        List<Files> bfList = bfRepo.findByFid(board.getBno());

        try {
            bRepo.delete(board);

            // 파일삭제
            for (int i=0; i < bfList.size(); i++){
                String realPath = session.getServletContext().getRealPath("/");
                realPath += "upload/";

                realPath += bfList.get(i).getFsysname();
                File file = new File(realPath);

                if (file.exists()){
                    file.delete();
                    realPath = null;
                    fRepo.delete(bfList.get(i));
                }
            }

            msg = "뉴스 삭제 성공";
        } catch (Exception e){
            log.info(e.getMessage());
            msg = "실패";
        }

        return msg;

    }
}
