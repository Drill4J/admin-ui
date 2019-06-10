import * as React from 'react';
import { createPortal } from 'react-dom';

export class Portal<Props extends {}> extends React.Component<Props> {
  public element: HTMLDivElement;
  public modalRoot: HTMLElement | null;

  constructor(props: Props) {
    super(props);
    this.element = document.createElement('div');
    this.modalRoot = document.getElementById('modal');
  }

  public componentDidMount() {
    if (this.modalRoot) {
      this.modalRoot.appendChild(this.element);
    }
  }

  public componentWillUnmount() {
    if (this.modalRoot) {
      this.modalRoot.removeChild(this.element);
    }
  }

  public render() {
    return createPortal(this.props.children, this.element);
  }
}
