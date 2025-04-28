let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#8da9c4'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與攝影機影像相同大小的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.rect(0, 0, overlayGraphics.width, overlayGraphics.height); // 填滿紅色背景
}

function draw() {
  background('#8da9c4'); // 確保背景顏色一致

  // 鏡像翻轉
  push(); // 儲存當前繪圖設定
  translate(width, 0); // 將原點移動到畫布右上角
  scale(-1, 1); // 水平翻轉畫布

  // 繪製攝影機影像
  image(
    capture,
    (width - capture.width) / 2, // 將影像置中 (水平)
    (height - capture.height) / 2, // 將影像置中 (垂直)
    capture.width,
    capture.height
  );

  // 繪製 overlayGraphics 在攝影機影像上方
  image(
    overlayGraphics,
    (width - capture.width) / 2, // 與攝影機影像對齊 (水平)
    (height - capture.height) / 2, // 與攝影機影像對齊 (垂直)
    capture.width,
    capture.height
  );

  pop(); // 恢復繪圖設定
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
  overlayGraphics = createGraphics(capture.width, capture.height); // 調整 overlayGraphics 大小
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  //overlayGraphics.rect(0, 0, overlayGraphics.width, overlayGraphics.height); // 填滿紅色背景
}
