JWT_SECRET="$(node -e "process.stdout.write(require('crypto').randomBytes(32).toString('hex'))")"

cat > .env <<EOF
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=employee_management_system
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=7d
EOF

unset JWT_SECRET
chmod 600 .env
