btn.onclick = function () {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance("你好啊")
    u.lang = "zh-CN" //语言
    u.rate = 1 //语速
    u.pitch = 1 //音调
    u.volume = 1 //音量

    window.speechSynthesis.speak(u)
  } else {
    console.log("不支持")
  }
}
