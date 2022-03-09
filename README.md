# 약재 계산기

- react
- sheetjs
- styled-component

## trouble shooting

### fileReader() 비동기처리

- promise 객체 사용 -> 사용법? promise 객체란?

### 성능고민

- 엑셀에서 불러온 약 1000건의 데이터를 state로 관리해도될까?
- 검색어를 입력할 때 onChange가 발생 -> throttle 이용해볼까?
- 서버를 쓰지 않고, 엑셀을 db처럼 쓰려면? ->sheetjs

### electron

https://blog.codefactory.ai/electron/create-desktop-app-with-react-and-electron/1-project-setting/

# Version

- v 1.0.0 : 최초 배포 버전
- v 1.0.1 : 사용성 개선 - 마우스 이벤트 추가, 용량 입력했을 때 약재 이름 input으로 focus
