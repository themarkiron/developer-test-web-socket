package br.com.triad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Wither;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Wither
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

    private String id;
    private String conversationId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date timestamp = new Date();
    private String from;
    private String to;
    private String message;




}
