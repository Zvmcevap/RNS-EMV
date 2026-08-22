
## Configure and start the backend

Open a terminal and enter the backend directory:

```bash
cd Backend
```

Install the backend dependencies:

```bash
npm install
```

The project contains a `createenv.sh` script for creating the backend environment configuration.

If necessary, make it executable:

```bash
chmod +x createenv.sh
```

Run it:

```bash
./createenv.sh
```

The resulting `.env` file must contain the JWT configuration required by the authentication system. The important values are:

```env
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

`JWT_SECRET` can be any sufficiently long development secret.

No database installation is required because this version of the project uses the data under `Backend/data/`.

Start the backend:

```bash
npm start
```

The backend runs at:

```text
http://localhost:5000
```

The REST API is available under:

```text
http://localhost:5000/api/v1
```

Keep this terminal running.

---