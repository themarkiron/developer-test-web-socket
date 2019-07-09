package br.com.triad.controller;

import br.com.triad.dto.MessageDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {


    @MessageMapping("/bots-message")
    @SendTo("/topic/bots")
    public MessageDTO botsMessage(MessageDTO messageDTO){

        return messageDTO;
    }


    @MessageMapping("/user-message")
    @SendTo("/topic/user")
    public MessageDTO usersMessage(MessageDTO messageDTO)
    {
        return messageDTO;
    }


    @MessageMapping("/guestjoin")
    @SendTo("/topic/guestnames")
    public MessageDTO handleMemberJoins(MessageDTO message) throws Exception {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setMessage(message.getMessage());
        return messageDTO;
    }


}
