# backend/start.sh
#!/bin/bash
exec gunicorn main:app --workers 1 --bind 0.0.0.0:$PORT -k uvicorn.workers.UvicornWorker
