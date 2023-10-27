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
  for (let i = 0; i < window.localStorage.length; i++) {
    if (uuid === parsed[i].uuid) {
      if (result === parsed[i].newPassword) {
        let editReply = prompt("새로운 리뷰를 등록하세요.", "");
        parsed[i].newContent = editReply;
      } else {
        alert("비밀번호가 다릅니다.");
      }
    }
  }
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
  for (let i = 0; i < window.localStorage.length; i++) {
    if (uuid === parsed[i].uuid) {
      if (result === parsed[i].newPassword) {
        //삭제 로직
        parsed.splice(i, 1);
        let newLocalStorage = "";
        if (parsed.length != 0) {
          for (let j = 0; j < parsed.length; j++) {
            if (newLocalStorage != 0) {
              newLocalStorage = newLocalStorage + "+" + parsed[j];
            } else {
              newLocalStorage = parsed[j];
            }
          }
        }
      } else {
        alert("비밀번호가 다릅니다.");
      }
    }
  }
};

// 리뷰 그리기
const replyBuilder = (username, content, uuid) => {
  const div = document.createElement("div");
  const newReply =
    "<div>" +
    '<p class="user-info fs-12 txt-gray">' +
    username +
    "</p>" +
    "</div>" +
    "<div>" +
    '<p class="content">' +
    content +
    "</p>" +
    "</div>" +
    '<button id="EditBtn" class="replyEditBtn">수정</button>' +
    '<button id="DelBtn" class="replyDelBtn">삭제</button>';

  $(div).append(newReply);
  const editBtn = div.querySelector(".replyEditBtn");
  editBtn.addEventListener("click", () => replyEdit(uuid));
  const delBtn = div.querySelector(".replyDelBtn");
  delBtn.addEventListener("click", () => replyDel(uuid));
  console.log(div);
  return div;
};

const draw = () => {
  const movieId = urlParams.get("id");
  let reply = [];
  if (window.localStorage.length === 0) return;
  let parsed = window.localStorage.getItem(movieId).split("+");
  console.log(parsed);
  for (let i = 0; i < parsed.length; i++) {
    parsed[i] = JSON.parse(parsed[i]);
    reply.push(parsed[i]);
  }
  console.log(reply);
  const replysEl = document.querySelector(".write-box");
  reply.forEach((reply) => {
    const replyEl = document.createElement("div");
    replyEl.classList.add("reply");
    replyEl.innerHTML = replyBuilder(reply.newUserName, reply.newContent, reply.uuid);
    replysEl.append(replyEl);
  });
};

draw();
