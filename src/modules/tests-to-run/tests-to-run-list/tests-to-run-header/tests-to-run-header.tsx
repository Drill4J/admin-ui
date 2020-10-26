import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, Panel } from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import { useBuildVersion } from 'hooks';
import { ParentBuild } from 'types/parent-build';
import { GetSuggestedTestsModal } from './get-suggested-tests-modal';

import styles from './tests-to-run-header.module.scss';

interface Props {
  className?: string;
  testsToRunCount: number;
  agentType: string;
}

const testsToRunHeader = BEM(styles);

export const TestsToRunHeader = testsToRunHeader(({ className, testsToRunCount, agentType }: Props) => {
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const { buildVersion = '' } = useParams<{ buildVersion: string; }>();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <>
      <div className={className}>
        <Panel align="space-between">
          <div>
            <Title data-test="tests-to-run-header:title">
              Tests to Run
              <Count>{testsToRunCount}</Count>
            </Title>
            <SubTitle data-test="tests-to-run-header:subtitle">
              Build:
              <CurrentBuildVersion data-test="tests-to-run-header:current-build-version">{buildVersion}</CurrentBuildVersion>
              <ComparedBuildVersion data-test="tests-to-run-header:compared-build-version">
                (compared to Build {previousBuildVersion})
              </ComparedBuildVersion>
            </SubTitle>
          </div>
          <Button
            type="secondary"
            size="large"
            onClick={() => setModalIsOpen(true)}
            data-test="tests-to-run-header:get-suggested-tests-button"
          >
            Get Suggested Tests
          </Button>
        </Panel>
      </div>
      {modalIsOpen && <GetSuggestedTestsModal isOpen={modalIsOpen} onToggle={setModalIsOpen} agentType={agentType} />}
    </>
  );
});

const Title = testsToRunHeader.title('div');
const Count = testsToRunHeader.count('div');
const SubTitle = testsToRunHeader.subTitle('div');
const CurrentBuildVersion = testsToRunHeader.currentBuildVersion('span');
const ComparedBuildVersion = testsToRunHeader.comparedBuildVersion('span');
