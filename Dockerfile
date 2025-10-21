#downlawd teh base images
FROM nginx:stable

# copy the code from hopst machiine to ngnix serer
COPY . /usr/share/nginx/html/

#give the pst number 
EXPOSE 80

#run the server 
CMD ["nginx" , "-g" , "daemon off;"]
