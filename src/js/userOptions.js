const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';

export const userOptions = {
  baseUrl: serverUrl,
  headers: {
    authorization: '98158e4b-35d4-4082-a4a4-b4f3010b8fcd',
    'Content-Type': 'application/json'
  }
};