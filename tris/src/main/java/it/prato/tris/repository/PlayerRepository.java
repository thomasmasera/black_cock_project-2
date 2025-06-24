package it.prato.tris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.prato.tris.model.Player;
import java.util.Optional;


@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{

    public boolean existsByName(String name);
    public Optional<Player> findByName(String name);
}
