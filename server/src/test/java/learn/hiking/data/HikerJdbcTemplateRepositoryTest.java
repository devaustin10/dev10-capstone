package learn.hiking.data;

import learn.hiking.models.Hiker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.swing.*;
import java.time.LocalDate;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HikerJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 2;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    HikerJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() { knownGoodState.set();}

    // (hiker_id, first_name, last_name, age, email)

    @Test
    void shouldFindAll() {
        List<Hiker> hiker = repository.findAll();
        assertNotNull(hiker);

        // can't predict order
        // if delete is first, we're down to 0
        // if add is first, we may go as high as 3
        assertTrue(hiker.size() >= 0 && hiker.size() <= 3);
    }

    @Test
    void shouldFindHiker() {
        Hiker easy = repository.findById(1);
        assertEquals(1, easy.getHikerId());
        assertEquals("Jane", easy.getFirstName());
        assertEquals("Doe", easy.getLastName());
    }

    @Test
    void shouldAdd() {
        // all fields
        Hiker hiker = makeHiker();
        Hiker actual = repository.add(hiker);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getHikerId());

    }

    @Test
    void shouldUpdate() {
        Hiker hiker = makeHiker();
        hiker.setHikerId(1);
        assertTrue(repository.update(hiker));

        hiker.setHikerId(10);
        assertFalse(repository.update(hiker));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }

    private Hiker makeHiker() {
        //  (hiker_id, first_name, last_name, age, email)
        Hiker hiker = new Hiker();
        hiker.setFirstName("Jane");
        hiker.setLastName("Doe");
        hiker.setAge(25);
        hiker.setEmail("JaneDoe@gmail.com");
        return hiker;
    }
}