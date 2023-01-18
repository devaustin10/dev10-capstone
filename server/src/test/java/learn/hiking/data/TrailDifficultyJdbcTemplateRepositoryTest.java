package learn.hiking.data;

import learn.hiking.models.TrailDifficulty;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TrailDifficultyJdbcTemplateRepositoryTest {

    @Autowired
    TrailDifficultyJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll() {
        List<TrailDifficulty> trailDifficulties = repository.findAll();
        assertNotNull(trailDifficulties);
        assertTrue(trailDifficulties.size() == 1);
    }

    @Test
    void findById() {
        TrailDifficulty test = repository.findById(1);
        assertNotNull(test);
        assertEquals("Easy", test.getDescription());
    }
}