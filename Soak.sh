# !/bin/bash
k6 run \
    --insecure-skip-tls-verify \
    --out influxdb=http://localhost:8086/k6 \
    load/scenario/Soak.js