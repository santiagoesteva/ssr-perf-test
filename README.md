# ssr-perf-test
Comparison between different UI rendering architectures

From a purely server's performance perspective, comparing complex dom pages 2000 elements

- SSR - NextJS app router 

        oha -z 5s http://localhost:3001/no-fetch/2000

        Summary:
          Success rate: 1.0000
          Total:        5.0023 secs
          Slowest:      3.2468 secs
          Fastest:      0.2418 secs
          Average:      1.7185 secs
          Requests/sec: 25.9880

- SSR - NextJS pages router 

        oha -z 5s http://localhost:3000/no-fetch/2000

        Summary:
          Success rate: 1.0000
          Total:        5.0017 secs
          Slowest:      1.4848 secs
          Fastest:      0.4902 secs
          Average:      0.6300 secs
          Requests/sec: 75.1743

- SSR - Remix (ExpressJS out-of-the-box)

        oha -z 5s http://localhost:3002/no-fetch/2000

        Summary:
          Success rate: 1.0000
          Total:        5.0012 secs
          Slowest:      0.4748 secs
          Fastest:      0.3029 secs
          Average:      0.3407 secs
          Requests/sec: 141.7652


Assuming an API response takes 3 seconds, what does the user experience look like? What is the perceived speed?

- CSR + Suspense
- SSR - NextJS pages router
- SSR - NextJS app router
- SSR - Remix
- SSR + Streaming / Suspense - Nextjs app router
- SSR + Streaming / Suspense - Remix 

Lighthouse Reports and Filmstrips

        npx lighthouse http://localhost:3004/1500 --throttling-method=provided --preset desktop 

Tools User
- OHA
- Lighthouse
- binserve - RUST super fast static server
