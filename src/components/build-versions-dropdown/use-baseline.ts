import { useReducer } from 'react';

interface BuildVersion {
  buildVersion: string;
  selectedAsBaseline: boolean;
}

interface CurrentBuildVersion {
  version: string;
  prevVersion: string;
}

type BaselineState = {
  buildVersions: BuildVersion[];
  currentBuildVersion: CurrentBuildVersion;
  isExpanded: boolean;
};

export type Action = ReturnType<typeof setAsBaseline | typeof setIsExpanded>;

const initialState = {
  buildVersions: [
    {
      buildVersion: '0.1.0', selectedAsBaseline: false,
    },
    {
      buildVersion: '0.3.0', selectedAsBaseline: false,
    },
    {
      buildVersion: '0.4.0', selectedAsBaseline: false,
    },
    {
      buildVersion: '0.5.0', selectedAsBaseline: false,
    },
    {
      buildVersion: '0.6.0', selectedAsBaseline: false,
    },
    {
      buildVersion: '0.7.0', selectedAsBaseline: false,
    },
    {
      buildVersion: '0.8.0', selectedAsBaseline: false,
    },
  ],
  currentBuildVersion: { version: '0.2.0', prevVersion: '0.1.0' },
  isExpanded: false,
};

const SET_AS_BASELINE = 'SET_AS_BASELINE';
const SET_IS_EXPANDED = 'SET_IS_EXPANDED';

export const setAsBaseline = (buildVersion: string) => ({ type: SET_AS_BASELINE, payload: buildVersion } as const);
export const setIsExpanded = (isExpanded: boolean) => ({ type: SET_IS_EXPANDED, payload: isExpanded } as const);

export const reducer = ({
  buildVersions, currentBuildVersion, isExpanded,
}: BaselineState, action: Action): BaselineState => {
  switch (action.type) {
    case SET_AS_BASELINE:
      return {
        buildVersions: buildVersions.map(buildVersion => {
          if (buildVersion.buildVersion === action.payload) {
            return ({ ...buildVersion, selectedAsBaseline: !buildVersion.selectedAsBaseline });
          }
          return { ...buildVersion, selectedAsBaseline: false };
        }),
        currentBuildVersion,
        isExpanded,
      };
    case SET_IS_EXPANDED:
      return {
        buildVersions, currentBuildVersion, isExpanded: action.payload,
      };
    default:
      return {
        buildVersions, currentBuildVersion, isExpanded,
      };
  }
};

export const useBaseline = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
