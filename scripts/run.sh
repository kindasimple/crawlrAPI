# Run solver worker
node worker.js &
# make a public solver worker
./ngrok -subdomain=crawlrAPI -authtoken hdqL9zl1QZrLl8c84HzX 5002
