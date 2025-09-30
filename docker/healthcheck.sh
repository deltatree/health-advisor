#!/bin/sh

# Health Check Script für VR-StarterKonto Container
# Prüft sowohl Frontend (Nginx) als auch Backend API

# Nginx Health Check
nginx_status=$(wget --no-verbose --tries=1 --spider http://localhost/health 2>&1)
nginx_exit_code=$?

# Backend API Health Check
backend_status=$(wget --no-verbose --tries=1 --spider http://localhost:3001/api/health 2>&1)
backend_exit_code=$?

if [ $nginx_exit_code -eq 0 ] && [ $backend_exit_code -eq 0 ]; then
    echo "✅ Container healthy - Nginx and Backend API responding"
    exit 0
else
    echo "❌ Container unhealthy:"
    if [ $nginx_exit_code -ne 0 ]; then
        echo "  - Nginx not responding: $nginx_status"
    fi
    if [ $backend_exit_code -ne 0 ]; then
        echo "  - Backend API not responding: $backend_status"
    fi
    exit 1
fi