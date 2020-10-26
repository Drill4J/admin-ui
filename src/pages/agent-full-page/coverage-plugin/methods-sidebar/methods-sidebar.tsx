import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import VirtualList from 'react-tiny-virtual-list';
import { Modal, Icons, OverflowText } from '@drill4j/ui-kit';

import { useElementSize, useBuildVersion } from 'hooks';
import { MethodsDetails } from 'types/methods-details';
import { CoverageRateIcon } from 'components';

import styles from './methods-sidebar.module.scss';

interface Props {
  className?: string;
  title: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  type: 'all' | 'modified' | 'new' | 'deleted';
}

const methodsSidebar = BEM(styles);

export const MethodsSidebar = methodsSidebar(
  ({
    className, isOpen, onToggle, title, type,
  }: Props) => {
    const { methods = [] } = useBuildVersion<{ methods: MethodsDetails[] }>(`/build/methods/${type}`) || {};
    const node = React.useRef<HTMLDivElement>(null);
    const { height: methodsListHeight } = useElementSize(node);
    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Function height={18} width={18} />
            <span data-test="method-modal:total-methods:title">{title}</span>
            <h2 data-test="method-modal:total-methods:count">{methods.length}</h2>
          </Header>
          <Content>
            <MethodsList>
              <div ref={node} style={{ height: '100%' }}>
                <VirtualList
                  itemSize={60}
                  height={methodsListHeight}
                  itemCount={methods.length}
                  renderItem={({ index, style }) => (
                    <MethodsListItem key={index} style={style as any}>
                      <MethodsListIcon>
                        <Icons.Function />
                      </MethodsListIcon>
                      <MethodSignature>
                        <OverflowText data-test="method-modal:method-name">
                          {methods[index].name}
                        </OverflowText>
                        <MethodDescriptor data-test="method-modal:method-descriptor">
                          {methods[index].desc}
                        </MethodDescriptor>
                      </MethodSignature>
                      <CoverageRateIcon coverageRate={methods[index].coverageRate} />
                    </MethodsListItem>
                  )}
                />
              </div>
            </MethodsList>
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = methodsSidebar.header('div');
const Content = methodsSidebar.content('div');
const MethodsList = methodsSidebar.methodsList('div');
const MethodsListItem = methodsSidebar.methodsListItem('div');
const MethodsListIcon = methodsSidebar.methodsListItemIcon('div');
const MethodSignature = methodsSidebar.methodSignature('div');
const MethodDescriptor = methodsSidebar.methodDescriptor(OverflowText);
