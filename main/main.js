//=============================== import API =================================
import { sleep } from 'k6';
import { error_check } from '../check/check.js';
import { scenario } from 'k6/execution';
import { test_scenario } from '../api/test_scenario.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';




//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  response = test_scenario()


  error_check(response.rootResponse);
  error_check(response.truckResponse);
  error_check(response.correctionResponse);
  error_check(response.dailyReportResponse);
  error_check(response.detailedReportResponse);
  error_check(response.esealResponse);
  error_check(response.approveResponse);
  error_check(response.wmsResponse);
  error_check(response.docTrackResponse);
  error_check(response.xrayResponse);
  error_check(response.gateResponse);
  sleep(1)
}

// ----------------------------
// สร้าง HTML report หลังจบ test
// ----------------------------
export function handleSummary(data) {
  return {
    [`./report/${projectname}.html`]: htmlReport(data),
  };
}











































































const cid = __ENV.cid || "1";
const id = __ENV.id || "1";
const projectname = __ENV.projectname || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
let response;
const scenariox = __ENV.scenariox || "1";
let options;
const vusx = Math.ceil(user / durationx);
if (scenariox == 1) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
        gracefulStop: '120s',
      },
    },
  };
}
else if (scenariox == 2) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    vus: user,
    duration: durationx + 's',
    gracefulStop: '120s',
  };
}
else if (scenariox == 3) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    scenarios: {
      example_scenario: {
        executor: 'constant-arrival-rate',
        // rate: user,
        // timeUnit: durationx+'s',
        rate: vusx,
        timeUnit: '1s',
        preAllocatedVUs: user,
        duration: durationx + 's', // ระบุระยะเวลาที่ต้องการให้ทดสอบ
        gracefulStop: '120s',
      },
    },
  };
}
else if (scenariox == 4) {
  options = {
    insecureSkipTLSVerify: true,
    stages: [
      { duration: '2m', target: user },  // ramp-up
      { duration: '10m', target: user },  // steady load
      { duration: '2m', target: 0 },    // ramp-down
    ],
    thresholds: {
      http_req_failed: ['rate<0.01'],        // error rate < 1%
      http_req_duration: ['p(95)<1000'],     // 95% requests < 1s
    },
  };
}
else if (scenariox == 5) {
  options = {
    insecureSkipTLSVerify: true,
    stages: [
      { duration: '1m', target: 100 },   // เริ่มจาก 100 VUs
      { duration: '1m', target: 200 },
      { duration: '1m', target: 400 },
      { duration: '1m', target: 600 },
      { duration: '1m', target: 800 },
      { duration: '1m', target: 1000 },
      { duration: '1m', target: 1200 },  // เพิ่มขึ้นเรื่อย ๆ จนถึงจุดที่ระบบอาจล้ม
      { duration: '2m', target: 0 },     // ลด VUs ลง
    ],
    thresholds: {
      'http_req_failed': ['rate<0.1'],    // กำหนดว่าผิดพลาดเกิน 10% ถือว่าล้ม
      'http_req_duration': ['p(95)<1000'] // 95% ของ request ต้อง < 1 วินาที
    }
  };
}
else if (scenariox == 6) {
  options = {
    insecureSkipTLSVerify: true,
    stages: [
      { duration: '1m', target: 10 },      // เริ่มเบา ๆ
      { duration: '30s', target: 500 },    // Spike ขึ้นทันที
      { duration: '1m', target: 500 },     // รักษาระดับสูง
      { duration: '30s', target: 10 },     // ลดทันที
      { duration: '1m', target: 10 },      // รักษาระดับต่ำ
    ],
    thresholds: {
      'http_req_failed': ['rate<0.1'],     // Error rate ต้อง <10%
      'http_req_duration': ['p(95)<1000'], // 95% ของ request < 2 วินาที
    },
  };
}
else {
  options = {
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
      },
    },
  };
}
export { options };