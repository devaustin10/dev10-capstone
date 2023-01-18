package learn.hiking.data;

import learn.hiking.models.Hike;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.swing.*;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HikeJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 9;

    @Autowired
    HikeJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Hike> hike = repository.findAll();
        assertNotNull(hike);

        // can't predict order
        // if delete is first, we're down to 0
        // if add is first, we may go as high as 3
        assertTrue(hike.size() >= 0 && hike.size() <= 3);
    }

    @Test
    void shouldFindHike() {
        Hike easy = repository.findById(1);
        assertEquals(1, easy.getHikeId());
        assertEquals("Easy", easy.getHikeDifficulty());
        assertEquals(LocalDate.of(2011, 1, 11), easy.getHikeDate());

    }

    @Test
    void shouldAdd() {
        // all fields
        Hike hike = makeHike();
        Hike actual = repository.add(hike);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getHikeId());

        // null dob
        hike = makeHike();
        hike.setHikeDate(null);
        actual = repository.add(hike);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getHikeId());
    }

    private Hike makeHike() {
        Hike agent = new Hike();
        hike.setFirstName("Test");
        hike.setLastName("Last Name");
        hike.setDob(LocalDate.of(1985, 8, 15));
        hike.setHeightInInches(66);
        return hike;
    }

}