touch weight.txt
nohup python3 -u wiiweigh.py &
nohup node index.js weight.txt &
sudo cp nginx-scale.conf /usr/share/nginx/
sudo nginx -s reload -c nginx-scale.conf