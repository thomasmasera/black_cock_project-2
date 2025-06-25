package it.prato.tris.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import it.prato.tris.model.Move;

@Controller
public class SocketController {
    
    @MessageMapping("/{roomId}")
	@SendTo("/topic/game/{roomId}")
	public Move move(Move move, @DestinationVariable String roomId) throws Exception {
		return move;
	}

}
