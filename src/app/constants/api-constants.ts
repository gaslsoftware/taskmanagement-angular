// Api related constants
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const ApiConstants = {
    URL : {
        LOGIN: `${environment.API_ENDPOINT}/authenticate`,
        REGISTER: `${environment.API_ENDPOINT}/createnewuser`,
        FETCH_TASKS: `${environment.API_ENDPOINT}/fetchtasks`,
    },
    STATUS_CODES: {
        SUCCESS: 20001,
        VALIDATION_ERROR: 20006,
        AUTH_ERROR: 20038
    },
    COMMON_HEADER: {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json' })
    }
};

