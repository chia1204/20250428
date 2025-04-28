let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#8da9c4'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 等待攝影機影像準備好後初始化 overlayGraphics
  capture.elt.addEventListener('loadeddata', () => {
    overlayGraphics = createGraphics(capture.width, capture.height);
    overlayGraphics.background(0); // 設定背景為黑色

    // 繪製圓形圖案
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      for (let y = 0; y < overlayGraphics.height; y += 20) {
        let r = map(x, 0, overlayGraphics.width, 0, 255); // 根據 x 計算紅色分量
        let g = map(y, 0, overlayGraphics.height, 0, 255); // 根據 y 計算綠色分量
        let b = map(x + y, 0, overlayGraphics.width + overlayGraphics.height, 0, 255); // 根據 x+y 計算藍色分量
        overlayGraphics.fill(r, g, b); // 設定圓的顏色
        overlayGraphics.noStroke();
        overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓，中心點偏移 10 以置中
      }
    }
  });
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
  if (overlayGraphics) {
    image(
      overlayGraphics,
      (width - capture.width) / 2, // 與攝影機影像對齊 (水平)
      (height - capture.height) / 2, // 與攝影機影像對齊 (垂直)
      capture.width,
      capture.height
    );
  }

  pop(); // 恢復繪圖設定
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小

  // 重新建立 overlayGraphics 並繪製圓形圖案
  if (overlayGraphics) {
    overlayGraphics = createGraphics(capture.width, capture.height);
    overlayGraphics.background(0); // 設定背景為黑色
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      for (let y = 0; y < overlayGraphics.height; y += 20) {
        let r = map(x, 0, overlayGraphics.width, 0, 255);
        let g = map(y, 0, overlayGraphics.height, 0, 255);
        let b = map(x + y, 0, overlayGraphics.width + overlayGraphics.height, 0, 255);
        overlayGraphics.fill(r, g, b);
        overlayGraphics.noStroke();
        overlayGraphics.ellipse(x + 10, y + 10, 15, 15);
      }
    }
  }
}
