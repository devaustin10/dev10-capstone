package learn.hiking.domain;

import learn.hiking.data.HikerRepository;
import learn.hiking.models.Hike;
import learn.hiking.models.Hiker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class HikerServiceTest {

    @Autowired
    HikerService service;

    @MockBean
    HikerRepository repository;

    @Test
    void findPaulBlart() {
        Hiker expected = makeHiker();
        when(repository.findById(1)).thenReturn(expected);
        Hiker actual = service.findById(1);
        assertEquals(expected.getFirstName(), actual.getFirstName());
        assertEquals("Paul", actual.getFirstName());
    }

    @Test
    void add() {
        Hiker expected = makeHiker();
        Hiker arg = makeHiker();
        arg.setHikerId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<Hiker> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotAddInvalidHiker() {
        Hiker hiker = makeHiker();
        hiker.setAge(4);
        Result<Hiker> result = service.add(hiker);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldUpdateWhenValid() {
        Hiker hiker = new Hiker(2, "Johnny", "Appleseed", 28, "johnnyappleseed@aol.com");
        when(repository.update(hiker)).thenReturn(true);
        Result<Hiker> result = service.update(hiker);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateWhenMissing() {
        Hiker hiker = new Hiker(12, "Mr", "Fredrickson", 89, "i_dont_like_doug_or_Kevin.com");
        when(repository.update(hiker)).thenReturn(false);
        Result<Hiker> result = service.update(hiker);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalidValues() {
        Hiker hiker = new Hiker(2, "Johnny", "Appleseed", 128, "johnnyappleseed@aol.com");
        when(repository.update(hiker)).thenReturn(false);
        Result<Hiker> result = service.update(hiker);
        assertEquals(ResultType.INVALID, result.getType());
    }

    Hiker makeHiker() {
        Hiker hiker = new Hiker();
        hiker.setHikerId(1);
        hiker.setFirstName("Paul");
        hiker.setLastName("Blart");
        hiker.setAge(23);
        hiker.setEmail("paulblart@yahoo.com");
        return hiker;
    }
}