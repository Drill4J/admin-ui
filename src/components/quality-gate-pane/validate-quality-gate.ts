import { ConditionSettingByType } from 'types/quality-gate-type';

export const validateQualityGate = (values: ConditionSettingByType) => {
  const errors = {
    coverage: { condition: { value: undefined as undefined | string } },
    risks: { condition: { value: undefined as undefined | string } },
    tests: { condition: { value: undefined as undefined | string } },
  };

  const coverageCount = Number(values.coverage?.condition?.value);
  const risksCount = Number(values.risks?.condition?.value);
  const testsRunCount = Number(values.tests?.condition?.value);

  const coverageErrorCondition = values?.coverage?.enabled
    && (Number.isNaN(coverageCount) || coverageCount < 0.1 || coverageCount > 100);
  const risksErrorCondition = values.risks?.enabled
    && (Number.isNaN(risksCount) || !Number.isInteger(risksCount) || risksCount < 0);
  const testsErrorConditions = values.tests?.enabled
    && (Number.isNaN(testsRunCount) || !Number.isInteger(testsRunCount) || testsRunCount < 0);

  if (coverageErrorCondition) {
    errors.coverage.condition.value = 'Build coverage should be between 0.1 and 100 percentages.';
  }
  if (risksErrorCondition) {
    errors.risks.condition.value = 'Risks number should be positive integer or 0.';
  }
  if (testsErrorConditions) {
    errors.tests.condition.value = 'Tests to run number should be positive integer or 0.';
  }
  return errors;
};
