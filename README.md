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

        npx lighthouse http://localhost:3004/1500 --throttling-method=provided --preset desktop 

- CSR + Suspense - Perf Score 93
![CSR](/reports/user-perception/csr-suspense-delayed.png)

- SSR - NextJS pages router - Perf Score 58
![Nextjs Page](/reports/user-perception/nextjs-pages-delayed.png)

- SSR - NextJS app router - Perf Score 54
![Nextjs Page](/reports/user-perception/nextjs-app-delayed.png)

- SSR - Remix - Perf Score 65
![Nextjs Page](/reports/user-perception/remix-delayed.png)
 
- SSR + Streaming / Suspense - Nextjs app router - Perf Score 77
![Nextjs Page](/reports/user-perception/nextjs-app-streaming-delayed.png)

- SSR + Streaming / Suspense - Remix - Perf Score 93
![Nextjs Page](/reports/user-perception/remix-streaming-delayed.png)

Lighthouse full Reports can be found [here](/reports/lighthouse)

### Tools Used
- OHA
- Lighthouse
- binserve - RUST super fast static server
