export function copyToClipboard(text: string) {
  const span = document.createElement('span');
  span.textContent = text;

  span.style.whiteSpace = 'pre';

  document.body.appendChild(span);

  const selection = window.getSelection();
  const range = window.document.createRange();
  selection && selection.removeAllRanges();
  range.selectNode(span);
  selection && selection.addRange(range);

  window.document.execCommand('copy');

  selection && selection.removeAllRanges();
  window.document.body.removeChild(span);
}
