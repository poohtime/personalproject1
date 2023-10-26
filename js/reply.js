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
// 댓글 삭제 기능

// 댓글 그리기
const replyBuilder = (username, content) => {
  return (
    "<div class = comment>" +
    '<p class="user-info fs-12 txt-gray">' +
    username + ": " +
    "</p>" +
    "</div>" +
    "<div>" +
    '<p class="content">' +
    content +
    "</p>" +
    "</div>" +
    '<div class="reply-list"></div>' +
    "</div>"
  );
};

const draw = () => {
  const replyNo = window.localStorage.length;
  const movieId = urlParams.get("id");
  let reply = [];
  if (replyNo === 0) return;
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
    replyEl.innerHTML = replyBuilder(reply.newUserName, reply.newContent);
    replysEl.append(replyEl);
  });
};

draw();
