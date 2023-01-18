package learn.hiking.data;

import learn.hiking.models.Trail;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.swing.*;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TrailJdbcTemplateRepositoryTest {

    @Autowired
    TrailJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll() {
        List<Trail> trails = repository.findAll();
        assertNotNull(trails);
        assertTrue(trails.size() > 0);
    }

    @Test
    void findTrailRedLizard() {
       Trail redLizard = repository.findById(1);
       assertEquals(1, redLizard.getTrailId());
       assertEquals("Red Lizard", redLizard.getTrailName());
    }

    @Test
    void add() {

    }

    @Test
    void update() {
    }

    @Test
    void deleteById() {
    }
}