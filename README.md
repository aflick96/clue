# clue
### Setup 
1. Download Docker (https://www.docker.com/products/docker-desktop/)
2. Pull project locally
3. cd to clue directory and run the following docker commands:
   - docker-compose build (builds the docker image and downloads the dependencies)
   - docker images (checks that the client and server images have been built)
   - docker-compose up (runs both servers)
4. Client will be available at http://localhost:3000/ (server is running on http://localhost:5000/)
