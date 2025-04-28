let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#8da9c4'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
  background('#8da9c4'); // 確保背景顏色一致
  image(
    capture,
    (width - capture.width) / 2, // 將影像置中 (水平)
    (height - capture.height) / 2, // 將影像置中 (垂直)
    capture.width,
    capture.height
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
}
