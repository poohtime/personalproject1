const btnAddTxt = document.getElementById("btnAddTxt");

btnAddTxt.addEventListener("click", function () {
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");
  const content = document.getElementById("content");
  const movieId = urlParams.get("id");

  if (userName.value == "") {
    alert("작성자를 입력해주세요.");
    userName.focus();
  } else if (password.value == "") {
    alert("비밀번호를 입력해주세요.");
    password.focus();
  } else if (content.value == "") {
    alert("내용을 입력해주세요.");
    content.focus();
  } else {
    let uuid = self.crypto.randomUUID();
    addObj = {
      newUserName: userName.value,
      newPassword: password.value,
      newContent: content.value,
      newUUID: uuid
    };
    let objString = JSON.stringify(addObj);
    const existReview = window.localStorage.getItem(movieId);
    if (existReview != null) objString = existReview + "+" + objString;
    window.localStorage.setItem(movieId, objString);
  }
  draw();
});


const replyEdit = (uuid) => {
  const movieId = urlParams.get("id");
  let result = prompt("비밀번호를 입력하세요.", "");
  let reply = [];
  let parsed = window.localStorage.getItem(movieId).split("+");
  for (let i = 0; i < parsed.length; i++) {
    parsed[i] = JSON.parse(parsed[i]);
    reply.push(parsed[i]);
  }
  console.log(uuid);
  for (let i = 0; i < window.localStorage.length; i++) {
    if (uuid === reply[i].newUUID) {
      if (result === reply[i].newPassword) {
        let editReply = prompt("새로운 리뷰를 등록하세요.", "");
        reply[i].newContent = editReply;
        let newLocalStorage = "";
        //객체 문자열로 변환
        for (let x = 0; x < reply.length; x++) {
          reply[x] = JSON.stringify(reply[x]);
        }
        //문자열 병합
        if (reply.length != 0) {
          for (let j = 0; j < reply.length; j++) {
            if (newLocalStorage != 0) {
              newLocalStorage = newLocalStorage + "+" + reply[j];
            } else {
              newLocalStorage = reply[j];
            }
          }
          //localstorage 접근
        }
        console.log(newLocalStorage);
        window.localStorage.setItem(movieId, newLocalStorage);
      } else {
        alert("비밀번호가 다릅니다.");
      }
    }
  }
  draw();
};

const replyDel = (uuid) => {
  const movieId = urlParams.get("id");
  let result = prompt("비밀번호를 입력하세요.", "");
  let reply = [];
  let parsed = window.localStorage.getItem(movieId).split("+");
  for (let i = 0; i < parsed.length; i++) {
    parsed[i] = JSON.parse(parsed[i]);
    reply.push(parsed[i]);
  }
  console.log(uuid);
  for (let i = 0; i < window.localStorage.length; i++) {
    if (uuid === reply[i].newUUID) {
      if (result === reply[i].newPassword) {
        reply.splice(i, 1);
        let newLocalStorage = "";
        //객체 문자열로 변환
        for (let x = 0; x < reply.length; x++) {
          reply[x] = JSON.stringify(reply[x]);
        }
        //문자열 병합
        if (reply.length != 0) {
          for (let j = 0; j < reply.length; j++) {
            if (newLocalStorage != 0) {
              newLocalStorage = newLocalStorage + "+" + reply[j];
            } else {
              newLocalStorage = reply[j];
            }
          }
          //localstorage 접근
        } else {
          window.localStorage.removeItem(movieId);
        }
        console.log(newLocalStorage);
        window.localStorage.setItem(movieId, newLocalStorage);
      } else {
        alert("비밀번호가 다릅니다.");
      }
    }
  }
  draw();
};

// 리뷰 그리기
const replyBuilder = (username, content, uuid) => {
  const div = document.createElement("div");
  const newReply =
    "<div>" +

// 댓글 그리기
const replyBuilder = (username, content) => {
  return (
    "<div class = comment>" +
    '<p class="user-info fs-12 txt-gray">' +
    username +
    "</p>" +
    "</div>" +
    "<div>" +
    '<p class="content">' +
    content +
    "</p>" +
    "</div>" +
    '<div class="reply-list"></div>' +
    "<div> +
    '<button id="EditBtn" class="replyEditBtn">수정</button>' +
    '<button id="DelBtn" class="replyDelBtn">삭제</button>';
    "</div>"
  );

  $(div).append(newReply);
  const editBtn = div.querySelector(".replyEditBtn");
  editBtn.addEventListener("click", () => replyEdit(uuid));
  const delBtn = div.querySelector(".replyDelBtn");
  delBtn.addEventListener("click", () => replyDel(uuid));
  return div;
};

const draw = () => {
  //리뷰 불러오기
  const movieId = urlParams.get("id");
  let reply = [];
  if (window.localStorage.length === 0) return;

  //초기 + 포함 시 삭제
  let newparsed = window.localStorage.getItem(movieId);
  if (newparsed.charAt(0) === "+") {
    newparsed = newparsed.substring(1);
    window.localStorage.setItem(movieId, newparsed);
  }

  //로컬 스토리지에 저장된 리뷰 파싱
  let parsed = window.localStorage.getItem(movieId).split("+");
  if (parsed[0].length === 0) parsed.splice(0, 1);
  for (let i = 0; i < parsed.length; i++) {
    parsed[i] = JSON.parse(parsed[i]);
    reply.push(parsed[i]);
  }

  console.log(parsed);
  console.log(reply);

  //기존 리뷰 삭제
  const onlyReply = document.querySelectorAll(".reply");
  for (let i = 0; i < onlyReply.length; i++) {
    onlyReply[i].remove();
  }

  //리뷰 새로 그리기
  const replysEl = document.querySelector(".write-box");

  reply.forEach((reply) => {
    const replyEl = document.createElement("div");
    replyEl.classList.add("reply");
    replyEl.append(replyBuilder(reply.newUserName, reply.newContent, reply.newUUID));
    replysEl.append(replyEl);
  });
};


draw();