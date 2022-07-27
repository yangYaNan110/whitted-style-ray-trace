function drawColorSetToCanvas(colorArray, width = 400, height = 400) {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");

  const imageData = new ImageData(width, height);
  imageData.data.fill(0);
  for (let i = 0; i < height; i++) {
    const row = i;
    for (let eq = 0; eq < width; eq++) {
      const column = eq;
      let idx = (row*width+column);
      if(!colorArray[idx]){
        console.log(idx);
      }
      // if(colorArray[idx][3] < 0.1){
      //   imageData.data[idx*4 + 0] = 0;
      //   imageData.data[idx*4 + 1] = 0;
      //   imageData.data[idx*4 + 2] = 0;
      //   imageData.data[idx*4 + 3] = 255;
      //   continue;
      // }
      imageData.data[idx*4 + 0] = colorArray[idx][0]*255;
      imageData.data[idx*4 + 1] = colorArray[idx][1]*255;
      imageData.data[idx*4 + 2] = colorArray[idx][2]*255;
      // imageData.data[idx*4 + 3] = colorArray[idx][3]*255;
      imageData.data[idx*4 + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
export {drawColorSetToCanvas};
