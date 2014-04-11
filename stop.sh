#!/bin/bash


#killall node
ps -ef |grep node |awk '{if($0!~/tomcat/ && $8~/node/) print $2}' |while read pid
do
	echo "kill -9 "${pid}
	kill -9 $pid
done
