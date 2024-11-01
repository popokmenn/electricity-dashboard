import mqtt from 'mqtt';

interface MqttClientOptions {
  username?: string;
  password?: string;
}

export const createMqttClient = (
  topic: string,
  onMessage: (message: string) => void,
  options: MqttClientOptions = {username: process.env.REACT_APP_BROKER_USERNAME, password: ''} // Optional parameter for username and password
) => {
  // Create the MQTT client with options
  console.log(process.env.REACT_APP_BROKER_URL);
  const client = mqtt.connect(process.env.REACT_APP_BROKER_URL, options);

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  });

  client.on('message', (topic, message) => {
    // Message is a Buffer
    onMessage(message.toString());
  });

  // Return the client for further use (e.g., to unsubscribe or disconnect)
  return client;
};
