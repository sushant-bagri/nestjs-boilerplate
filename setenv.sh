
echo "Creating test .env file ..."
tee -a .env << END

PORT=3000
MONGO_DB_HOST=localhost:27017
MONGO_DB_NAME=your_db_name
END
