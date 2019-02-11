const HTML_INPUT_ATTRS = [
  // REACT
  'selected',
  'defaultValue',
  'defaultChecked',

  // LIMITED HTML PROPS
  'autoComplete',
  'autoFocus',
  'checked',
  'disabled',
  'form',
  'id',
  'list',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'step',
  'type',
  'value',
];

const HTML_INPUT_EVENTS = [
  // EVENTS
  // keyboard
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',

  // clipboardData
  'onPaste',

  // focus
  'onFocus',
  'onBlur',

  // form
  'onChange',
  'onInput',

  // mouse
  'onClick',
  'onContextMenu',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',

  // selection
  'onSelect',

  // touch
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
];

export const INPUT_PROPS = [...HTML_INPUT_EVENTS, ...HTML_INPUT_ATTRS];
