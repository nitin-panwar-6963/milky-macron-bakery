#downlawd teh base images
FROM nginx:stable
#creaking a working directory
WORKDIR /app

#update the sytstem
RUN apt-get update -y && \
    rm -rf /var/lib/apt/lists/*

# copy the code from hopst machiine to ngnix serer
COPY . /usr/share/nginx/html/

#give the pst number
EXPOSE 80

#run the server 
CMD ["nginx" , "-g" , "daemon off;"]
