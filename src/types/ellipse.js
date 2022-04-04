import {Element} from 'chart.js';
import {PI, toRadians} from 'chart.js/helpers';
import {EPSILON, getRectCenterPoint, getChartRect, setBorderStyle, setShadowStyle, rotated, translate} from '../helpers';

export default class EllipseAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    const {x, y, x2, y2} = this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition);
    const rotation = this.options.rotation;
    const borderWidth = this.options.borderWidth;
    if (axis !== 'x' && axis !== 'y') {
      return pointInEllipse({x: mouseX, y: mouseY}, this, rotation, borderWidth);
    }
    const hBorderWidth = borderWidth / 2;
    const limit = axis === 'y' ? {start: y, end: y2} : {start: x, end: x2};
    const rotatedPoint = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-rotation));
    return rotatedPoint[axis] >= limit.start - hBorderWidth - EPSILON && rotatedPoint[axis] <= limit.end + hBorderWidth + EPSILON;
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    const {width, height, options} = this;
    const center = this.getCenterPoint();

    ctx.save();
    translate(ctx, this, options.rotation);
    setShadowStyle(ctx, this.options);
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    const stroke = setBorderStyle(ctx, options);
    ctx.ellipse(center.x, center.y, height / 2, width / 2, PI / 2, 0, 2 * PI);
    ctx.fill();
    if (stroke) {
      ctx.shadowColor = options.borderShadowColor;
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }

}

EllipseAnnotation.id = 'ellipseAnnotation';

EllipseAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderWidth: 1,
  display: true,
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: undefined,
  yMax: undefined,
  yMin: undefined,
  yScaleID: undefined
};

EllipseAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function pointInEllipse(p, ellipse, rotation, borderWidth) {
  const {width, height} = ellipse;
  const center = ellipse.getCenterPoint(true);
  const xRadius = width / 2;
  const yRadius = height / 2;

  if (xRadius <= 0 || yRadius <= 0) {
    return false;
  }
  // https://stackoverflow.com/questions/7946187/point-and-ellipse-rotated-position-test-algorithm
  const angle = toRadians(rotation || 0);
  const hBorderWidth = borderWidth / 2 || 0;
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const a = Math.pow(cosAngle * (p.x - center.x) + sinAngle * (p.y - center.y), 2);
  const b = Math.pow(sinAngle * (p.x - center.x) - cosAngle * (p.y - center.y), 2);
  return (a / Math.pow(xRadius + hBorderWidth, 2)) + (b / Math.pow(yRadius + hBorderWidth, 2)) <= 1.0001;
}
