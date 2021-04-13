//https://www.eclipse.org/paho/clients/js/

function sensa1() {
	console.log("Enviando mensaje s1");
	message= new Paho.MQTT.Message("s1");
	message.destinationName="mdpilatuna.fie@unach.edu.ec/RASP";
	client.send(message);
}
function sensa2(){
		console.log("Enviando mensaje s2");
	message= new Paho.MQTT.Message("s2");
	message.destinationName="mdpilatuna.fie@unach.edu.ec/RASP";
	client.send(message);

}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "mdpilatuna.fie@unach.edu.ec",
    password: "quitociudadhermosa",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("mdpilatuna.fie@unach.edu.ec/WEB");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "mdpilatuna.fie@unach.edu.ec/RASP";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
	console.log(message.payloadString);
    mentrada=message.payloadString;
    document.getElementById("historial1").innerHTML=mentrada;
  }
  
