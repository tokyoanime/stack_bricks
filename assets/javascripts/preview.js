const previewIds = ['fPreview', 'sPreview', 'tPreview', 'lPreview']
const renderPreview = (previewBricks) => {
  previewBricks.forEach((brick, i) => {
    const cvs = document.getElementById(previewIds[i]);
    const context = cvs.getContext('2d');
    context.save();
    context.scale(20, 20);
    context.clearRect(0, 0, cvs.width, cvs.height);
    brick.drawBrick(context, brick.brick, {x: 0, y: 0});
    context.restore();
  });
};

export default renderPreview;