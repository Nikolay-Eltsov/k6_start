import {sc_01} from '../scripts/sc_01.js'

const rumpUp = '30s'
const duration = '120s'
export const options = {
    scenarios: {
        contacts: {
          executor: 'ramping-arrival-rate',
          startRate: 0,  // start with zero rate ( 0 iterate/second)
          timeUnit: '1s', // iterate per timeUnit = 1s  then iterate/second
          preAllocatedVUs: 50, // max number of virtual users
          stages: [
            { target: 10, duration: rumpUp }, // ramp up to 10 iterations/second
            { target: 10, duration: duration }, // hold at 10 iterations/second
            { target: 20, duration: rumpUp }, // ramp up to 20 iterations/second
            { target: 20, duration: duration }, // hold at 20 iterations/second
            { target: 30, duration: rumpUp }, // ramp up to 30 iterations/second
            { target: 30, duration: duration },// hold at 30 iterations/second
          ],
        },
      },
};

const BASE = 'https://localhost'; 

export default function () {
  sc_01(BASE)
}
