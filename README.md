# simple-http-proxy

Simple HTTP proxy for prototyping

```bash
git clone git@github.com:adrior/simple-http-proxy.git
cd simple-http-proxy
npm i
npm start
```

Now you have local proxy-server on port 8060

If you want go get url `http://something.ru?param1=one&param2=two`, first you need to encode it

```javascript
let endoded = encodeURIComponent("http://something.ru?param1=one&param2=two");
```

Then you need to pass encoded url as `uri` parametr to the proxy

```
http://locahlost:8060?uri=http%3A%2F%2Fsomething.ru%3Fparam1%3Done%26param2%3Dtwo
```

As result you will have response form `http://something.ru?param1=one&param2=two` with no CORS restrictions.

For exapmle

```javascript
let url = "http://something.ru?param1=one&param2=two";
let encodedURL = encodeURIComponent(url);
fetch("http://localhost:8060?url=" + encodedURL)
  .then(res => res.json())
  .then(json => console.log(json));
```
