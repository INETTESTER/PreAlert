import { check } from 'k6';

export function error_check(res) {
    check(res, {
        // 2xx
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '202 Accepted': (r) => r.status === 202,
        '203 Non-Authoritative Information': (r) => r.status === 203,
        '204 No Content': (r) => r.status === 204,
        '205 Reset Content': (r) => r.status === 205,
        '206 Partial Content': (r) => r.status === 206,

        // 3xx
        '300 Multiple Choices': (r) => r.status === 300,
        '301 Moved Permanently': (r) => r.status === 301,
        '302 Found': (r) => r.status === 302,
        '303 See Other': (r) => r.status === 303,
        '304 Not Modified': (r) => r.status === 304,
        '305 Use Proxy': (r) => r.status === 305,
        '307 Temporary Redirect': (r) => r.status === 307,
        '308 Permanent Redirect': (r) => r.status === 308,

        // 4xx
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '405 Method Not Allowed': (r) => r.status === 405,
        '406 Not Acceptable': (r) => r.status === 406,
        '407 Proxy Authentication Required': (r) => r.status === 407,
        '408 Request Timeout': (r) => r.status === 408,
        '409 Conflict': (r) => r.status === 409,
        '410 Gone': (r) => r.status === 410,
        '411 Length Required': (r) => r.status === 411,
        '412 Precondition Failed': (r) => r.status === 412,
        '413 Payload Too Large': (r) => r.status === 413,
        '414 URI Too Long': (r) => r.status === 414,
        '415 Unsupported Media Type': (r) => r.status === 415,
        '416 Range Not Satisfiable': (r) => r.status === 416,
        '417 Expectation Failed': (r) => r.status === 417,
        '418 I\'m a teapot': (r) => r.status === 418,
        '422 Unprocessable Entity': (r) => r.status === 422,
        '429 Too Many Requests': (r) => r.status === 429,

        // 5xx
        '500 Internal Server Error': (r) => r.status === 500,
        '501 Not Implemented': (r) => r.status === 501,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
        '505 HTTP Version Not Supported': (r) => r.status === 505
    });
}
