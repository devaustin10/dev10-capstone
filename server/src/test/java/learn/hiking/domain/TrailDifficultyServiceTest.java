package learn.hiking.domain;

import learn.hiking.data.TrailDifficultyRepository;
import learn.hiking.models.TrailDifficulty;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;



import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class TrailDifficultyServiceTest {

    @Autowired
    TrailDifficultyService service;

    @MockBean
    TrailDifficultyRepository repository;


    @Test
    void shouldFindValidId() {
        TrailDifficulty expected = makeTrailDifficulty();
        when(repository.findById(1)).thenReturn(expected);
        TrailDifficulty actual = service.findById(1);
        assertEquals(expected.getDescription(), actual.getDescription());
    }


    TrailDifficulty makeTrailDifficulty() {
        TrailDifficulty td = new TrailDifficulty();
        td.setTrailDifficultyId(2);
        td.setDescription("Great hike! Loved.");
        return td;
    }
}