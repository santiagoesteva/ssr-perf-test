# ssr-perf-test
Comparison between different UI rendering architectures


### Tools Used
- OHA
- Lighthouse
- binserve - RUST super fast static server

## Stress Testing the server

From a purely server's performance perspective, comparing complex dom pages 2000 elements

- SSR - NextJS app router - PROD setup

        oha -z 5s http://localhost:3001/no-fetch/2000
        
        Summary:
                Success rate: 1.0000
                Total:        5.0010 secs
                Slowest:      0.9489 secs
                Fastest:      0.4462 secs
                Average:      0.5359 secs
                Requests/sec: 88.5826

- SSR - NextJS pages router - PROD setup

        oha -z 5s http://localhost:3000/no-fetch/2000
        
        Summary:
                Success rate: 1.0000
                Total:        5.0019 secs
                Slowest:      0.6635 secs
                Fastest:      0.1222 secs
                Average:      0.2893 secs
                Requests/sec: 167.9377


- SSR - Remix (ExpressJS PROD)

        oha -z 5s http://localhost:3002/no-fetch/2000

        Summary:
          Success rate: 1.0000
          Total:        5.0016 secs
          Slowest:      0.2006 secs
          Fastest:      0.0421 secs
          Average:      0.0964 secs
          Requests/sec: 515.8332

## Perceived Speed

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
 
- SSR + Streaming / Suspense - Nextjs app router - Perf Score Dev Server: 77 , Prod Server 91
![Nextjs Page](/reports/user-perception/nextjs-app-streaming-delayed.png)

- SSR + Streaming / Suspense - Remix - Perf Score 93
![Nextjs Page](/reports/user-perception/remix-streaming-delayed.png)

Lighthouse full Reports can be found [here](/reports/lighthouse)

