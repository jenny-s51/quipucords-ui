import viewOptionsReducer from '../viewOptionsReducer';
import {
  viewTypes,
  viewPaginationTypes,
  viewToolbarTypes,
  credentialsTypes,
  scansTypes,
  sourcesTypes
} from '../../constants';
import { reduxHelpers } from '../../common/reduxHelpers';

describe('viewOptionsReducer', () => {
  it('should return the initial state', () => {
    expect(viewOptionsReducer.initialState).toBeDefined();
  });

  it('should handle specific defined types', () => {
    const specificTypes = [
      viewToolbarTypes.SET_FILTER_TYPE,
      viewToolbarTypes.SET_FILTER_VALUE,
      viewToolbarTypes.ADD_FILTER,
      viewToolbarTypes.REMOVE_FILTER,
      viewToolbarTypes.CLEAR_FILTERS,
      viewToolbarTypes.SET_SORT_TYPE,
      viewToolbarTypes.TOGGLE_SORT_ASCENDING,
      viewPaginationTypes.VIEW_PAGE,
      viewPaginationTypes.SET_PER_PAGE,
      viewTypes.SELECT_ITEM,
      viewTypes.DESELECT_ITEM,
      viewTypes.EXPAND_ITEM
    ];

    specificTypes.forEach(value => {
      const dispatched = {
        type: value,
        viewType: viewTypes.SOURCES_VIEW
      };

      const resultState = viewOptionsReducer(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot(`defined type ${value}`);
    });
  });

  it('should handle all defined fulfilled types', () => {
    const specificTypes = [credentialsTypes.GET_CREDENTIALS, sourcesTypes.GET_SOURCES, scansTypes.GET_SCANS];

    specificTypes.forEach(value => {
      const dispatched = {
        type: reduxHelpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            test: 'success'
          }
        }
      };

      const resultState = viewOptionsReducer(undefined, dispatched);

      expect({ type: reduxHelpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot(
        `fulfilled types ${value}`
      );
    });
  });
});
