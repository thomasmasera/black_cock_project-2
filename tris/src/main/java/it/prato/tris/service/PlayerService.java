package it.prato.tris.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import it.prato.tris.model.Player;
import it.prato.tris.model.PlayerDTO;
import it.prato.tris.repository.PlayerRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import it.prato.tris.exception.PlayerNotFoundException;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository pr;

    public Player newPlayer(PlayerDTO pdto) throws Exception{
        if(pdto == null){
            throw new IllegalArgumentException();
        } else if (pr.existsByName(pdto.getName())){
            throw new DataIntegrityViolationException("username already used");
        }
        Player player = new Player();
        BeanUtils.copyProperties(pdto, player);
        return pr.save(player);
    }

    public boolean checkPassword(PlayerDTO pdto) throws Exception{
        Optional<Player> opt = pr.findByName(pdto.getName());
        if(opt.isEmpty()){
            throw new PlayerNotFoundException();
        }
        Player player = opt.get();
        //bellino l'ha fatto lui
        return player.getPassword().equals(pdto.getPassword());
    }
}
