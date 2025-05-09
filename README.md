# 📈 K6 Load Testing in Docker
*** A project for learning how to run local load tests using K6, with monitoring in InfluxDB and Grafana. *** 

## 📁 Project structure
```shell
.
├── app/                   # Python application
├── load/                  # K6, Grafana, InfluxDB 
    ├── docker-compose.yml # docker-compose.yml for InfluxDB иand Grafana
    ├── grafana/           # setings Grafana
    ├── influxdb/          # data InfluxDB
    ├── scripts/           # user case
    ├── scenario/          # configure how VUs and iteration schedules in granular detail.
├── nginx/                 # config nginx
├── certs/                 
├── *.sh                   # Shell for start tests
├── docker-compose.yml     # docker-compose for application (app, postgres, nginx)
├── Dockerfile             # Dockerfile for application
├── requirements.txt       
└── README.md              
```


## 🚀 Quick start
### 0. Install dependencies
   k6 https://grafana.com/docs/k6/latest/set-up/install-k6/

   Docker Engine https://docs.docker.com/engine/install/

   Docker Compose https://docs.docker.com/compose/install/

### 1. Create a certificate (for local debugging):
```shell
mkdir certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/server.key -out certs/server.crt \
  -subj "/CN=localhost"
```

### 2. Build and run the web environment
```shell
docker-compose up --build -d 
```

### 3. Run load monitoring (InfluxDB, Grafana)
```shell
docker-compose -f load/docker-compose.yml up -d
```

### 4. Run tests
```shell
./Capacity.sh 
./Soak.sh 
```


## Monitoring 📊 Grafana
http://localhost:3000

Login: admin

Password: admin

Dashboard: k6 Load Testing Results


## Startup example
```shell
k6 run --out influxdb=http://localhost:8086/k6 load/scenario/Capacity.js
```

## Сustomise
load changes in Capacity or Soak

user behavior changes in sc_01