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
          
Are any of the above amazing figures? Not really,

| Name                | Requests Per Second | Requests Total | Memory Usage |
|---------------------|--------------------|----------------|--------------|
| Node Js             | 3233.377739        | 97772          | 105MB        |
| Spring JVM          | 4457.39441         | 134162         | 675MB        |
| Spring Native Image | 3854.41882         | 116267         | 211MB        |
| Rust Rocket         | 5592.44295         | 168573         | 48MB         |
| Rust Actix          | 5312.356065        | 160310         | 33.5MB       |
| Go Echo             | 13545.859602       | 407254         | 72.1MB       |


[Source](https://medium.com/@alexeynovikov_89393/ultimate-2023-web-server-benchmark-nodejs-vs-java-vs-rust-vs-go-e367d932f699)
          

## Perceived Speed

Assuming an API response takes 3 seconds, what does the user experience look like? What is the perceived speed?

        npx lighthouse http://localhost:3004/1500 --throttling-method=provided --preset desktop 

- CSR + Suspense - Perf Score 93 - Prod build but not very perfomant server
![CSR](/reports/user-perception/csr-suspense-delayed.png)

- SSR - NextJS pages router - Perf Score 62 - Prod setup
![Nextjs Page](/reports/user-perception/nextjs-pages-delayed.png)

- SSR - NextJS app router - Perf Score 62 - Prod Setup
![Nextjs Page](/reports/user-perception/nextjs-app-delayed.png)

- SSR - Remix - Perf Score 65 - Prod setup
![Nextjs Page](/reports/user-perception/remix-delayed.png)
 
- SSR + Streaming / Suspense - Nextjs app router - Perf Score Prod Server 100
![Nextjs Page](/reports/user-perception/nextjs-app-streaming-prod-latest.png)

- SSR + Streaming / Suspense - Remix - Perf Score Prod Server 93
![Nextjs Page](/reports/user-perception/remix-streaming-delayed.png)

Lighthouse full Reports can be found [here](/reports/lighthouse)

