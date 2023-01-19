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
    void shouldUpdate() {
        Hike hike = new Hike(2,LocalDate.of(2023, 1,12),"Tough","This hike was something else!",1,1);

        when(repository.update(hike)).thenReturn(true);
        Result<Hike> actual = service.update(hike);
        assertEquals(ResultType.SUCCESS,actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        Hike hike = new Hike(99,LocalDate.of(2023, 1,12),"Easy","I did this hike blindfolded.",1,1);

        when(repository.update(hike)).thenReturn(false);
        Result<Hike> actual = service.update(hike);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

//    @Test
//    void shouldNotUpdateWhenInvalid() {
//        Hike hike = new Hike(35, LocalDate.of(2023, 1,12), null, "Test Description",1,1);
//
//        Result<Hike> actual = service.update(hike);
//        assertEquals(ResultType.INVALID, actual.getType());

//        agency.setShortName("TEST");
//        agency.setLongName(" ");
//        actual = service.update(agency);
//        assertEquals(ResultType.INVALID, actual.getType());
//
//        agency.setAgencyId(0);
//        agency.setLongName("Long Name Test");
//        actual = service.update(agency);
//        assertEquals(ResultType.INVALID, actual.getType());
//    }

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