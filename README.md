# Using Docker 
### Add API key in `config/.env` then run
```docker-compose --env-file ./config/.env up```

navigate to http://localhost:4000 or edit port on docker-compose.yml

# Regular
## on frontend directory 
### run
```npm install```

```npm start```

## on api-gateway directory 
### run
```npm install```

```export NVISION_API_URL=https://nvision.nipa.cloud/api/v1 && export NVISION_API_KEY={{API Key}}```

```npm start```

navigate to http://localhost:3000