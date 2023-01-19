package learn.hiking.data;

import learn.hiking.models.Hike;
import learn.hiking.models.Trail;
import org.junit.jupiter.api.BeforeAll;
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

    final static int NEXT_ID = 2;
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
        assertTrue(trails.size() >= 0 && trails.size() <= 3);


        // can't predict order
        // if delete is first, we're down to 7
        // if add is first, we may go as high as 10
        //assertTrue(agents.size() >= 7 && agents.size() <= 10);
    }

    @Test
    void findTheMountain() {
       Trail theMountain = repository.findById(1);
       assertEquals(1, theMountain.getTrailId());
       assertEquals("The Mountain", theMountain.getTrailName());
    }

    @Test
    void add() {
        Trail blueSquirrel = makeTrail();
        Trail actual = repository.add(blueSquirrel);
        assertNotNull(actual);
        //assertEquals(2 || 3, actual.getTrailId());
    }

    @Test
    void update() {
        Trail trail = makeTrail();
        trail.setTrailId(1);
        assertTrue(repository.update(trail));

        trail.setTrailId(10);
        assertFalse(repository.update(trail));
    }

    @Test
    void shouldDelete() {
//        Trail trail = new Trail();
//        trail.setTrailName("TestDelete");
//        trail.setTrailDistance(2);
//        trail.setCity("TestCity");
//        trail.setState("TestState");
//        trail.setTrailDifficultyId(1);

        Trail blueSquirrel = makeTrail();
        repository.add(blueSquirrel);

        assertTrue(repository.deleteById(NEXT_ID));
        assertFalse(repository.deleteById(0));
    }

    private Trail makeTrail() {
        //  (trail_id, trail_name, trail_distance, city, state, trail_difficulty_id)
        Trail trail = new Trail();
        trail.setTrailName("TestTrail");
        trail.setTrailDistance(1);
        trail.setCity("TestCity");
        trail.setState("TestState");
        trail.setTrailDifficultyId(1);
        return trail;
    }
}