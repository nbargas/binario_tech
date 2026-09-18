#!/bin/bash
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v1/health)
echo "HTTP_STATUS: $STATUS_CODE - $(date)" > health_check.log
echo "Healthcheck executado. Código HTTP: $STATUS_CODE"
