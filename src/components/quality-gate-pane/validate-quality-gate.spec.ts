import { validateQualityGate } from './validate-quality-gate';
import { ConditionSettingByType } from 'types/quality-gate-type';

describe('validateQualityGate', () => {
  const valuesWithValidLimits = {
    tests: { enabled: true, condition: { measure: 'tests', value: 10 } },
    risks: { enabled: true, condition: { measure: 'risks',  value: 2 } },
    coverage: { enabled: true, condition: { measure: 'coverage',  value: 15 } },
  };
  const valuesWithInvalidLimits = {
    tests: { enabled: true, condition: { measure: 'tests', value: 'foo bar' } },
    risks: { enabled: true, condition: { measure: 'risks',  value: '-100' } },
    coverage: { enabled: true, condition: { measure: 'coverage',  value: 29999 } },
  };

  it('should return errors if property goes beoynd limits', () => {
    expect(validateQualityGate(valuesWithInvalidLimits as any)).toStrictEqual(
      {
        coverage: { condition: { value: 'Build coverage should be between 0.1 and 100 percentages.' } },
        risks: { condition: { value: 'Risks number should be positive integer or 0.' } },
        tests: { condition: { value: 'Tests to run number should be positive integer or 0.' } },
      }
    );
  });

  it('should return empty errors object if no errors found', () => {
    expect(validateQualityGate(valuesWithValidLimits as ConditionSettingByType)).toStrictEqual({
        coverage: { condition: { value: undefined } },
        risks: { condition: { value: undefined} },
        tests: { condition: { value: undefined } },
    });
  });
});
