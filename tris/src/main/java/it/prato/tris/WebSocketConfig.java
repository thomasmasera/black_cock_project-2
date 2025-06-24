package it.prato.tris;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    //to enable a simple memory-based message broker to carry the greeting messages back to the client on destinations prefixed with /topic
    config.enableSimpleBroker("/topic");
    //This prefix will be used to define all the message mappings
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    //endpoint che serve per stabilier la connessione col socket
    registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
  }

}