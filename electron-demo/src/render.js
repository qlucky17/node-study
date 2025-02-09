const btn1 = document.querySelector("#btn1");
const versionsEle = document.querySelector(".versions-info");

const btn2 = document.querySelector("#btn2");
const inputEle = document.querySelector("#inputVal");

const btn3 = document.querySelector("#btn3");
const fileEle = document.querySelector(".file-info");

btn1.onclick = () => {
  versionsEle.innerHTML = `<p>Node: ${myAPI.versions.node}</p><p>Electron: ${myAPI.versions.electron}</p>`;
};

btn2.onclick = () => {
  myAPI.saveFile(inputEle.value);
};

btn3.onclick = async () => {
  const data = await myAPI.readFile();
  fileEle.innerHTML = data;
};
