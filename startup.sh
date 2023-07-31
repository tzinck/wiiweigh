nohup python3 wiiweigh.py &
nohup node index.js weight.txt &
cp nginx-scale.conf /usr/share/nginx/
nginx reload -c nginx-scale.conf