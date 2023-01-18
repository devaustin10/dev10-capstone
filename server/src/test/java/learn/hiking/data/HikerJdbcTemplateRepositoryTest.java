package learn.hiking.data;

import learn.hiking.models.Hiker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.swing.*;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HikerJdbcTemplateRepositoryTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    HikerJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() { knownGoodState.set();}

    @Test
    void findAll() {
    }

    @Test
    void findById() {
    }

    @Test
    void add() {
    }

    @Test
    void update() {
    }

    @Test
    void deleteById() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }
}