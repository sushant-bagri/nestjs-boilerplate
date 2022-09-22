
echo "Creating test .env file ..."
tee -a .env << END

PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=local_db
END

echo "Creating docker.env file ..."
tee -a docker.env << END

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=local_db
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin

END
echo "Done creating configs"
