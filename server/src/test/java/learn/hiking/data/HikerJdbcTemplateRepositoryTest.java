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

    final static String NEXT_STRING = "JaneDoe111";

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
        assertTrue(hiker.size() >= 0 && hiker.size() <= 7);
    }

    @Test
    void shouldFindHiker() {
        Hiker easy = repository.findById("therealjohnsmith");
        assertEquals("therealjohnsmith", easy.getHikerId());
        assertEquals("Joe", easy.getFirstName());
        assertEquals("Doe", easy.getLastName());
    }

    @Test
    void shouldAdd() {
        Hiker hiker = makeHiker2();
        Hiker actual = repository.add(hiker);
        assertNotNull(actual);
        assertEquals("Jake", actual.getFirstName());
    }

//    @Test
//    void shouldNotAdd() {
//        // all fields
//        Hiker hiker = makeHiker();
//        Hiker actual = repository.add(hiker);
//        assertNotNull(actual);
//        assertEquals(NEXT_STRING, actual.getHikerId());
//
//    }

    @Test
    void shouldUpdate() {
        Hiker hiker = makeHiker();
        hiker.setFirstName("Joe"); //name does change
        System.out.println(hiker.getFirstName());
        assertTrue(repository.update(hiker));

        hiker.setHikerId(null);
        assertFalse(repository.update(hiker));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById("jakesmith"));
        assertFalse(repository.deleteById("jakesmith"));
    }

    private Hiker makeHiker() {
        //  (hiker_id, first_name, last_name, age, email)
        Hiker hiker = new Hiker();
        hiker.setHikerId("therealjohnsmith");
        hiker.setFirstName("Jane");
        hiker.setLastName("Doe");
        hiker.setAge(25);
        return hiker;
    }

    private Hiker makeHiker2() {
        Hiker hiker = new Hiker();
        hiker.setHikerId("jakesmith");
        hiker.setFirstName("Jake");
        hiker.setLastName("Smith");
        hiker.setAge(26);
        return hiker;
    }
}