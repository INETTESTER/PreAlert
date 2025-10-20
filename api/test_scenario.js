import http from 'k6/http';
import { cookie_env, url_env } from './env.js';

// กำหนด base URL ของ environment
const baseUrl = url_env;
const securePort = ':8443';

// Cookie เดียวกัน
const commonParams = {
    headers: {
        'Cookie': cookie_env
    },
    redirects: 0 // ปิด auto-follow redirect
};

export function test_scenario() {
    // 1. GET /
    const rootResponse = http.get(`${baseUrl}/`, commonParams);
    // console.log('Root Status:', rootResponse.status);
    // console.log('Root Response body:', rootResponse.body);

    // 2. GET /Truck
    const truckResponse = http.get(`${baseUrl}/Truck`, commonParams);
    // console.log('Truck Status:', truckResponse.status);
    // console.log('Truck Response body:', truckResponse.body);

    // 3. GET /CorrectionRequestDocument
    const correctionResponse = http.get(`${baseUrl}/CorrectionRequestDocument`, commonParams);
    // console.log('CorrectionRequestDocument Status:', correctionResponse.status);
    // console.log('CorrectionRequestDocument Response body:', correctionResponse.body);

    // 4. GET /DailyReport
    const dailyReportResponse = http.get(`${baseUrl}/DailyReport`, commonParams);
    // console.log('DailyReport Status:', dailyReportResponse.status);
    // console.log('DailyReport Response body:', dailyReportResponse.body);

    // 5. GET /DetailedDailyReport
    const detailedReportResponse = http.get(`${baseUrl}/DetailedDailyReport`, commonParams);
    // console.log('DetailedDailyReport Status:', detailedReportResponse.status);
    // console.log('DetailedDailyReport Response body:', detailedReportResponse.body);

    // 6. GET /Eseal?page=report
    const esealResponse = http.get(`${baseUrl}/Eseal?page=report`, commonParams);
    // console.log('Eseal Status:', esealResponse.status);
    // console.log('Eseal Response body:', esealResponse.body);

    // 7. GET :8443/Approvelist
    const approveResponse = http.get(`${baseUrl}${securePort}/Approvelist`, commonParams);
    // console.log('Approvelist Status:', approveResponse.status);
    // console.log('Approvelist Response body:', approveResponse.body);

    // 8. GET :8443/WMSReport
    const wmsResponse = http.get(`${baseUrl}${securePort}/WMSReport`, commonParams);
    // console.log('WMSReport Status:', wmsResponse.status);
    // console.log('WMSReport Response body:', wmsResponse.body);

    // 9. GET :8443/DocumentTrackingReport
    const docTrackResponse = http.get(`${baseUrl}${securePort}/DocumentTrackingReport`, commonParams);
    // console.log('DocumentTrackingReport Status:', docTrackResponse.status);
    // console.log('DocumentTrackingReport Response body:', docTrackResponse.body);

    // 10. GET :8443/Xray?page=data
    const xrayResponse = http.get(`${baseUrl}${securePort}/Xray?page=data`, commonParams);
    // console.log('Xray Status:', xrayResponse.status);
    // console.log('Xray Response body:', xrayResponse.body);

    // 11. GET :8443/GateInOut
    const gateResponse = http.get(`${baseUrl}${securePort}/GateInOut`, commonParams);
    // console.log('GateInOut Status:', gateResponse.status);
    // console.log('GateInOut Response body:', gateResponse.body);

    return {
        rootResponse,
        truckResponse,
        correctionResponse,
        dailyReportResponse,
        detailedReportResponse,
        esealResponse,
        approveResponse,
        wmsResponse,
        docTrackResponse,
        xrayResponse,
        gateResponse
    };
}
