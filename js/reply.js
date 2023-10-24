const btnAddTxt = document.getElementById("btnAddTxt");

btnAddTxt.addEventListener("click", function () {
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");
  const content = document.getElementById("content");

  if (userName.value == "") {
    alert("작성자를 입력해주세요.");
    userName.focus();
  } else if (password.value == "") {
    alert("비밀번호를 입력해주세요.");
    title.focus();
  } else if (content.value == "") {
    alert("내용을 입력해주세요.");
    content.focus();
  } else {
    addObj = {
      newUserName: userName.value,
      newPassword: password.value,
      newContent: content.value
    };
    let replyNumber = window.localStorage.length;
    replyNumber = replyNumber + 1;
    const objString = JSON.stringify(addObj);
    window.localStorage.setItem(replyNumber, objString);
  }
  draw();
});
// 댓글 삭제 기능

// 댓글 그리기
const replyBuilder = (username, content) => {
  return (
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
    '<div class="reply-list"></div>' +
    "</div>"
  );
};

const draw = () => {
  const replyNo = window.localStorage.length;
  let reply = [];
  if (replyNo === 0) return;
  for (let i = 1; i < window.localStorage.length; i++) {
    let parsed = JSON.parse(window.localStorage.getItem(i));
    console.log(parsed);
    reply.push(parsed);
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
