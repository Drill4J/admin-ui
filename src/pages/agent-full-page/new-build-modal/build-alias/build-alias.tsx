import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Form, Field } from 'react-final-form';

import { Panel } from '../../../../layouts';
import { Icons } from '../../../../components';
import { Fields, composeValidators, required, sizeLimit } from '../../../../forms';
import { renameBuildVersion } from '../../api';

import styles from './build-alias.module.scss';

interface Props {
  className?: string;
  agentId: string;
  currentId?: string;
  currentAlias?: string;
  setCurrentAlias: (alias: string) => void;
}

interface FormValues {
  buildVersion: string;
  alias: string;
}

const buildAlias = BEM(styles);

const validateAlias = composeValidators(required('alias'), sizeLimit('alias', 1, 64));

export const BuildAlias = buildAlias(
  ({ className, agentId, currentId, currentAlias, setCurrentAlias }: Props) => {
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <div className={className}>
        {errorMessage && (
          <ErrorMessage>
            <ErrorMessageIcon />
            {errorMessage}
          </ErrorMessage>
        )}
        <Title>Build version name</Title>
        {isEditMode ? (
          <Form
            initialValues={{ buildVersion: currentId, alias: currentAlias }}
            onSubmit={(values) => {
              renameBuildVersion(agentId, {
                onSuccess: () => setIsEditMode(false),
                onError: setErrorMessage,
              })(values as FormValues);
              setCurrentAlias((values as FormValues).alias);
            }}
            validate={validateAlias as any}
            render={({ handleSubmit }) => (
              <FormContent>
                <Panel direction="column" verticalAlign="start">
                  <Field name="alias" component={BuildVersionAliasField} />
                </Panel>
                <ActionsPanel>
                  <IconsWrapper type="save" onClick={handleSubmit as any}>
                    <Icons.Checkbox width={16} height={16} />
                    &nbsp;Save
                  </IconsWrapper>
                  <IconsWrapper type="cancel" onClick={() => setIsEditMode(!isEditMode)}>
                    <Icons.Checkbox width={16} height={16} />
                    &nbsp;Cancel
                  </IconsWrapper>
                </ActionsPanel>
              </FormContent>
            )}
          />
        ) : (
          <Panel align="space-between">
            <BuildVersionAlias>{currentAlias || `${currentId} (autogenerated)`}</BuildVersionAlias>
            <IconsWrapper onClick={() => setIsEditMode(!isEditMode)}>
              <Icons.Edit />
            </IconsWrapper>
          </Panel>
        )}
      </div>
    );
  },
);

const ErrorMessage = buildAlias.errorMessage(Panel);
const ErrorMessageIcon = buildAlias.errorMessageIcon(Icons.Warning);
const Title = buildAlias.title('div');
const ActionsPanel = buildAlias.actionsPanel('div');
const IconsWrapper = buildAlias.iconsWrapper('div');
const FormContent = buildAlias.formContent('div');
const BuildVersionAlias = buildAlias.buildVersionAlias('div');
const BuildVersionAliasField = buildAlias.buildVersionAliasField(Fields.Input);
