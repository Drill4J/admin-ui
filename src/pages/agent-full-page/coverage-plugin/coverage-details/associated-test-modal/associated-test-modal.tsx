import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Modal, Icons } from 'components';
import { AssociatedTests } from 'types/associated-tests';
import { useBuildVersion } from '../../use-build-version';
import { ItemInfo } from './item-info';

import styles from './associated-test-modal.module.scss';

interface Props {
  className?: string;
  id?: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  associatedTestsTopic: string;
}

const associatedTestModal = BEM(styles);

export const AssociatedTestModal = associatedTestModal(
  ({
    className, isOpen, onToggle, id, associatedTestsTopic,
  }: Props) => {
    const associatedTests = useBuildVersion<AssociatedTests[]>(associatedTestsTopic) || [];
    const {
      tests = [], packageName = '', className: testClassName = '', methodName = '',
    } = associatedTests.find((test) => test.id === id) || {};
    const testsMap = tests.reduce((acc, { type = '', name = '' }) =>
      ({ ...acc, [type]: acc[type] ? [...acc[type], name] : [name] }), {} as { [testType: string]: string[] });
    const [expandedSection, setExpandedSection] = React.useState('');

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
            <span>Associated tests</span>
            <h2>{tests.length}</h2>
          </Header>
          <ItemInfo
            packageName={packageName}
            testClassName={testClassName}
            methodName={methodName}
          />
          <Content>
            {Object.keys(testsMap).map((testType) => (
              <>
                <TestSection
                  expanded={expandedSection === testType}
                  onClick={() => setExpandedSection(expandedSection === testType ? '' : testType)}
                >
                  <ExpanderIcon
                    rotate={expandedSection === testType ? 90 : 0}
                    height={13}
                    width={13}
                  />
                  <TestListItemIcon>
                    <Icons.Test />
                  </TestListItemIcon>
                  {testType}
                </TestSection>
                <TestList>
                  {testType === expandedSection
                    && testsMap[testType].map((test) => (
                      <TestListItem>
                        <TestListItemIcon>
                          <Icons.Test />
                        </TestListItemIcon>
                        {test}
                      </TestListItem>
                    ))}
                </TestList>
              </>
            ))}
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = associatedTestModal.header('div');
const Content = associatedTestModal.content('div');
const TestSection = associatedTestModal.section(
  div({ onClick: () => {} } as { expanded?: boolean; onClick: () => void }),
);
const TestList = associatedTestModal.testList('div');
const ExpanderIcon = associatedTestModal.expanderIcon(Icons.Expander);
const TestListItem = associatedTestModal.testListItem('div');
const TestListItemIcon = associatedTestModal.testListItemIcon('div');
