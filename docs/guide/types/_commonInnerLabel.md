## Label

Namespace: `options.annotations[annotationID].label`, it defines options for the the label of annotation.

All of these options can be [Scriptable](../options#scriptable-options)

| Name | Type | Default | Notes
| ---- | ---- | :----: | ----
| `color` | [`Color`](../options#color) | `'black'` | Text color.
| `content` | `string`\|`string[]`\|[`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)\|[`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) | `null` | The content to show in the label.
| `display` | `boolean` | `false` | Whether or not the label is shown.
| `drawTime` | `string` | `options.drawTime` | See [drawTime](../options#draw-time). Defaults to the annotation draw time if unset
| `font` | [`Font`](../options#font) | `{ weight: 'bold' }` | Label font
| `height` | `number`\|`string` | `undefined` | Overrides the height of the image or canvas element. Could be set in pixel by a number, or in percentage of current height of image or canvas element by a string. If undefined, uses the height of the image or canvas element. It is used only when the content is an image or canvas element.
| `padding` | [`Padding`](../options#padding) | `6` | The padding to add around the text label.
| [`position`](#position) | `string`\|`{x: string, y: string}` | `'center'` | Anchor position of label in the annotation.
| `rotation` | `number` | `undefined` | Rotation of label, in degrees. If `undefined`, the annotation rotation is used.
| `textAlign` | `string` | `'start'` | Text alignment of label content when there's more than one line. Possible options are: `'left'`, `'start'`, `'center'`, `'end'`, `'right'`.
| `textStrokeColor` | [`Color`](../options#color) | `undefined` | The color of the stroke around the text.
| `textStrokeWidth` | `number` | `0` | Stroke width around the text.
| `width` | `number`\|`string` | `undefined` | Overrides the width of the image or canvas element. Could be set in pixel by a number, or in percentage of current width of image or canvas element by a string. If undefined, uses the width of the image or canvas element. It is used only when the content is an image or canvas element.
| `xAdjust` | `number` | `0` | Adjustment along x-axis (left-right) of label relative to computed position. Negative values move the label left, positive right.
| `yAdjust` | `number` | `0` | Adjustment along y-axis (top-bottom) of label relative to computed position. Negative values move the label up, positive down.
| `z` | `number` | `0` | It determines the drawing stack level of the label element, with same `drawTime`.

### Position

A position can be set in 2 different values types:

1. `'start'`, `'center'`, `'end'` which are defining where the label will be located
2. a `string`, in percentage format `'number%'`, is representing the percentage on the size where the label will be located

If this value is a string (possible options are `'start'`, `'center'`, `'end'` or a string in percentage format), it is applied to vertical and horizontal position in the annotation.

If this value is an object, the `x` property defines the horizontal alignment in the annotation. Similarly, the `y` property defines the vertical alignment in the annotation. Possible options for both properties are `'start'`, `'center'`, `'end'`, a string in percentage format. Omitted property have value of the default, `'center'`.
