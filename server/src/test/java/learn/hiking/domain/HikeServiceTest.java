package learn.hiking.domain;

import learn.hiking.data.HikeRepository;
import learn.hiking.models.Hike;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class HikeServiceTest {

    @Autowired
    HikeService service;

    @MockBean
    HikeRepository repository;


    @Test
    void shouldFindEasyHike() {
        Hike expected = makeHike();
        when(repository.findById(1)).thenReturn(expected);
        Hike actual = service.findById(1);
        assertEquals(expected.getDescription(), actual.getDescription());
    }

    @Test
    void shouldAddWhenValid() {
        Hike expected = makeHike();
        Hike arg = makeHike();
        arg.setHikeId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<Hike> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());

    }

    @Test
    void shouldNotAddWhenInvalid() {
        Hike hike = makeHike();
        Result<Hike> result = service.add(hike);
        assertEquals(ResultType.INVALID, result.getType());

        hike.setHikeDate(LocalDate.of(2024,01,10));
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void update() {

    }

    @Test
    void deleteById() {
    }

    Hike makeHike() {
        Hike hike = new Hike();
        hike.setHikeId(1);
        hike.setHikeDate(LocalDate.of(2023,01,10));
        hike.setHikeDifficulty("Easy");
        hike.setDescription("Super fun! Lots of mountains.");
        hike.setHikerId(1);
        hike.setTrailId(1);
        return hike;
    }
}