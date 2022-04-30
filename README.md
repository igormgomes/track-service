<p align="center">
  <img src="https://codingly-assets.s3-eu-west-1.amazonaws.com/Codingly+Logo.png" width="200px" height="200px"/>
  </br>
  <a href="https://codingly.io">codingly.io</a>
  <br/>
</p>

## Serverless Framework

This application was developed using [Serverless Framework](https://www.serverless.com/).


# Architeture #

![image info](./draw.png)

Deploy stack to AWS
```
$ sls deploy --verbose
```

Redeploy just a function
```
$ sls deploy -f functioname --verbose
```

Invoke function
```
sls invoke -f functioname -l
```

For see function's logs
```
$ sls logs -f functioname -t 
```

Delete stack to AWS
```
sls remove --verbose
```
