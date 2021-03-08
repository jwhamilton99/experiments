import time
import math
import os

def secToTimeString(sec):
	h = math.floor(sec/60)
	m = sec%60
	return (str(h)+":"+("0" if (m<10) else "")+str(m))

if __name__ == "__main__":
	seconds = 0
	while(1):
		os.system("clear")
		print("snake stopwatch")
		print(secToTimeString(seconds))
		seconds+=1
		time.sleep(1)
