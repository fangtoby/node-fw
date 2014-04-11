#!/bin/bash
#killall node
./stop.sh
#daily log
positionDir=$(pwd)
echo $positionDir
logDir='log'
dirLine='/'
logFullPath=${positionDir}${dirLine}${logDir}
if [ ! -d $logFullPath ]; then
	echo $logFullPath
	mkdir $logFullPath
fi

dailyLog=$(date '+%Y%m%d')

dirFullName=${logFullPath}${dirLine}${dailyLog}

if [ ! -f $dirFullName ]; then
	echo $dirFullName
	touch $dirFullName
fi

(nohup node app.js &) 2>>$dirFullName 


