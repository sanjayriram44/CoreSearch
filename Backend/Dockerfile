# Use slim Python as base
FROM python:3.10-slim

# Set working dir
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install deps
RUN pip install --no-cache-dir -r requirements.txt

# Copy all source code
COPY . .

# Expose the port your app will run on
EXPOSE 10000

# Start FastAPI using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
