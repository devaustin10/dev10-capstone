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

    final static int NEXT_ID = 2;

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

    }

    @Test
    void shouldUpdate() {
        Hike hike = makeHike();
        hike.setHikeId(1);
        assertTrue(repository.update(hike));

        hike.setHikeId(10);
        assertFalse(repository.update(hike));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }

    private Hike makeHike() {
        //  (hike_id, hike_date, hike_difficulty, hiker_id, trail_id)
        Hike hike = new Hike();
        hike.setHikeDate(LocalDate.of(1985, 8, 15));
        hike.setHikeDifficulty("TestEasy");
        hike.setDescription("Test");
        hike.setHikerId(1);
        hike.setTrailId(1);
        return hike;
    }

}