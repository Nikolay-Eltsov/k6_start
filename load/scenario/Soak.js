import {sc_01} from '../scripts/sc_01.js'

export const options = {
    scenarios: {
        contacts: {
          executor: 'ramping-arrival-rate',
          startRate: 0,
          timeUnit: '1s',
          preAllocatedVUs: 50,
          stages: [
            { target: 10, duration: '60s' },
            { target: 10, duration: '6h' },
          ],
        },
      },
};

const BASE = 'https://localhost'; 

export default function () {
  sc_01(BASE)
}