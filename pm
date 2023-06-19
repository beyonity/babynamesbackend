#!/bin/bash
name=baby
echo "pm2 $1 $name"
if [ "$1" == "start" ]; then
pm2 start app.js --name $name
elif [ "$1" == "stop" ]; then
pm2 stop $name
elif [ "$1" == "log" ]; then
pm2 logs $name --timestamp
elif [ "$1" == "restart" ]; then
pm2 restart $name
elif [ "$1" == "delete" ]; then
pm2 delete $name
elif [ "$1" == "status" ]; then
pm2 status
else
echo "command not found"
fi