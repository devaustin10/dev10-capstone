package learn.hiking.domain;

import learn.hiking.data.TrailRepository;
import learn.hiking.models.Trail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class TrailServiceTest {

    @Autowired
    TrailService service;

    @MockBean
    TrailRepository repository;

    @Test
    void shouldFindTrail() {
        Trail expected = makeTrail();
        when(repository.findById(1)).thenReturn(expected);
        Trail actual = service.findById(1);
        assertEquals(expected.getTrailName(), actual.getTrailName());
    }

    @Test
    void shouldAddWhenValid() {
        Trail expected = makeTrail();
        Trail arg = makeTrail();
        arg.setTrailId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<Trail> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());

    }

    @Test
    void shouldNotAddWhenInvalid() {
        Trail trail = makeTrail();
        Result<Trail> result = service.add(trail);
        assertEquals(ResultType.INVALID, result.getType());

        trail.setTrailName(" ");
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldUpdate() {
//       (int trailId, String trailName, String city, String state, double trailDistance, int trailDifficultyId)
        Trail trail = new Trail(3,"TestNameTwo", "RandCity" , "RandState", 5.5, 1);

        when(repository.update(trail)).thenReturn(true);
        Result<Trail> actual = service.update(trail);
        assertEquals(ResultType.SUCCESS,actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        Trail trail = new Trail(1000, "no", "nop", "noo", 5, 1);
        when(repository.update(trail)).thenReturn(false);
        Result<Trail> actual = service.update(trail);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

//(trail_id, trail_name, trail_distance, city, state, trail_difficulty_id)

    Trail makeTrail() {
        Trail trail = new Trail();
        trail.setTrailId(1);
        trail.setTrailName("TestTrail");
        trail.setTrailDistance(1);
        trail.setCity("TestCity");
        trail.setState("TestState");
        trail.setTrailDifficultyId(1);
        return trail;
    }
}