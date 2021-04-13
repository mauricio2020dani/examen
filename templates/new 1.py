import paho.mqtt.client as mqtt 
import time
import RPi.GPIO as GPIO
import datetime

GPIO.setmode(GPIO.BCM)
GPIO.setup(18,GPIO.OUT)
GPIO.setup(17,GPIO.OUT)
GPIO.setup(19,GPIO.IN)
GPIO.setup(20,GPIO.IN)

def on_message(client,obj,msg):
	mensaje=(msg.payload.decode("utf-8"))
	if mensaje=="s1":
		print("historial1")
		f=open("sensor1","r")
		men1= f.read()
		mqttc.publish("mdpilatuna.fie@unach.edu.ec/WEB", men1)
	elif mensaje=="s2":
		print("historial2")
		g=open("sensor2","r")
		men2= g.read()
		mqttc.publish("mdpilatuna.fie@unach.edu.ec/WEB", men2)

mqttc = mqtt.Client() 
mqttc.on_message = on_message 
mqttc.username_pw_set("mdpilatuna.fie@unach.edu.ec","quitociudadhermosa") 
mqttc.connect("maqiatto.com", 1883) 
mqttc.subscribe("mdpilatuna.fie@unach.edu.ec/RASP", 0)
rc=0
print("inicio...")
i = 0
while rc == 0:
	hora=datetime.datetime.now().strftime('%H:%M:%S')
	time.sleep(3)
	rc = mqttc.loop()
	if GPIO.input(19):
		estado1="Encendido"
		GPIO.output(17,True)
	else: 
		estado1="Apagado"
		GPIO.output(17,False)
	if GPIO.input(20):
		estado2="Encendido"
		GPIO.output(18,True)
	else: 
		estado2="Apagado"
		GPIO.output(18,False)
	f=open("sensor1","w")
	f.write("Sensor1 "+estado1+"a las" + hora)
	f.close()
	g=open("sensor2","w")
	g.write("Sensor2 "+estado2+"a las" + hora)
	g.close()