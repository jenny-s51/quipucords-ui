import { scansTypes, sourcesTypes } from '../constants';
import { reduxHelpers } from '../common';
import { helpers } from '../../common';

const initialState = {
  mergeDialog: {
    show: false,
    scans: [],
    details: false
  },
  empty: {},
  connection: {},
  inspection: {},
  job: {},
  jobs: {},
  action: {},
  selected: {},
  expanded: {},
  update: 0,
  view: {}
};

const scansReducer = (state = initialState, action) => {
  switch (action.type) {
    case scansTypes.UPDATE_SCANS:
      return reduxHelpers.setStateProp(
        null,
        {
          update: helpers.getCurrentDate().getTime()
        },
        {
          state,
          reset: false
        }
      );

    case scansTypes.MERGE_SCAN_DIALOG_SHOW:
      return reduxHelpers.setStateProp(
        'mergeDialog',
        {
          show: true,
          scans: action.scans,
          details: action.details
        },
        {
          state,
          initialState
        }
      );

    case scansTypes.MERGE_SCAN_DIALOG_HIDE:
      return reduxHelpers.setStateProp(
        'mergeDialog',
        {
          show: false
        },
        {
          state,
          initialState
        }
      );

    case scansTypes.SELECT_SCAN:
      return reduxHelpers.setStateProp(
        'selected',
        {
          [action.item?.id]: action.item
        },
        {
          state,
          reset: false
        }
      );
    case scansTypes.DESELECT_SCAN:
      return reduxHelpers.setStateProp(
        'selected',
        {
          [action.item?.id]: null
        },
        {
          state,
          reset: false
        }
      );
    case scansTypes.EXPANDED_SCAN:
      return reduxHelpers.setStateProp(
        'expanded',
        {
          [action.item?.id]: action.cellIndex
        },
        {
          state,
          reset: false
        }
      );
    case scansTypes.NOT_EXPANDED_SCAN:
      return reduxHelpers.setStateProp(
        'expanded',
        {
          [action.item?.id]: null
        },
        {
          state,
          reset: false
        }
      );

    default:
      return reduxHelpers.generatedPromiseActionReducer(
        [
          { ref: 'empty', type: sourcesTypes.GET_SCANS_SOURCES },
          { ref: 'connection', type: scansTypes.GET_SCAN_CONNECTION_RESULTS },
          { ref: 'inspection', type: scansTypes.GET_SCAN_INSPECTION_RESULTS },
          { ref: 'job', type: scansTypes.GET_SCAN_JOB },
          { ref: 'jobs', type: scansTypes.GET_SCAN_JOBS },
          {
            ref: 'action',
            type: [scansTypes.CANCEL_SCAN, scansTypes.PAUSE_SCAN, scansTypes.RESTART_SCAN, scansTypes.START_SCAN]
          },
          { ref: 'view', type: scansTypes.GET_SCANS }
        ],
        state,
        action
      );
  }
};

scansReducer.initialState = initialState;

export { scansReducer as default, initialState, scansReducer };
