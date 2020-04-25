import { UNEXPECTED_ERROR } from './ErrorServiceConstatns';
import { ErrorSchema } from './ErrorSchema';

export class ErrorService {
    static emptyDispatchFunction() {
        console.warn('ErrorService: dispatch function are not exist in current flow.');
    }

    constructor() {
        this.currentFlow = null;
        this.errorSchema = ErrorSchema;
        this.dispatch = ErrorService.emptyDispatchFunction;
    }

  setFlowAndDispatch = (currentFlow, dispatch) => {
      this.currentFlow = currentFlow;
      this.dispatch = dispatch || ErrorService.emptyDispatchFunction;
  };

  setErrorSchema = (errorSchema) => {
      this.errorSchema = errorSchema;
  };

  handleError = (error) => {
      try {
          const { payload } = error;
          return { payload, error: this.executeErrorSchemaCase(payload) };
      } catch (e) {
          console.error('ErrorService:handleError:nativeError: ', e);
          console.error('Incoming error: ', error);
          return error;
      }
  };


  executeErrorSchemaCase = (payload) => {
      if (!this.errorSchema) throw new Error('ErrorSchema is not defined in ErrorService.');

      const flow = this.errorSchema[this.currentFlow];
      if (!flow) throw new Error(`Flow ${this.currentFlow} is not defined in errorSchema.`);

      //Trying to find case func for code in currentFlow
      const caseFunc = flow[payload.XHRstatus] || flow[UNEXPECTED_ERROR];

      if (!caseFunc) throw new Error(`Case function for ${payload.XHRstatus} code error is not defined in errorSchema.`);
      return caseFunc({ payload, dispatch: this.dispatch });
  };
}
