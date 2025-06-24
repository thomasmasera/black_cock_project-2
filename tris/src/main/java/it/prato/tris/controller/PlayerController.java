package it.prato.tris.controller;

import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.prato.tris.exception.PlayerNotFoundException;
import it.prato.tris.model.PlayerDTO;
import it.prato.tris.service.PlayerService;


@RestController
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    private PlayerService ps;

    @PostMapping("/new")
    public ResponseEntity<?> newPlayer(@RequestBody PlayerDTO pdto) {
        try {
            ps.newPlayer(pdto);
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("message", "player created succesfully"));
        } catch (Exception e) {
            if(e instanceof BeansException){
                return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "failed to copy the submitted data"));
            } else if (e instanceof IllegalArgumentException){
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "null dto given"));
            } else if (e instanceof DataIntegrityViolationException) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", e.getMessage()));
            } else {
                return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "o scoprilo"));
            }

        } 
    }

    //sta roba nella mia testa serve a far si che si controlli la password del giocatore, poi se va da js mi apre la sessione
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody PlayerDTO pdto) {
        try {
            if(ps.checkPassword(pdto)){
                return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Map.of("message", "correct password"));
            } else {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "wrong password"));
            }
        } catch (Exception e) {
            if(e instanceof PlayerNotFoundException){
                return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "player not found"));
            } else if (e instanceof NullPointerException){
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "null password given"));
            } else {
                return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "vattelapesca"));
            }
        }
    }
    
    
}
