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
        when(repository.findById("mallCopPB")).thenReturn(expected);
        Hiker actual = service.findById("mallCopPB");
        assertEquals(expected.getFirstName(), actual.getFirstName());
        assertEquals("Paul", actual.getFirstName());
    }

    @Test
    void shouldAddWhenValid() {
        Hiker expected = makeHiker();
        Hiker arg = makeHiker();

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
    void shouldNotUpdateWhenNotAdded() {
        Hiker hiker = new Hiker("johnnyappleseedofficial", "Johnny", "Appleseed", 128);
        when(repository.update(hiker)).thenReturn(true);
        Result<Hiker> result = service.update(hiker);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldUpdateWhenDataIsValid() {
        Hiker hiker = makeHiker();
        hiker.setLastName("Testing");
        when(repository.update(hiker)).thenReturn(true);
        Result<Hiker> result = service.update(hiker);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateWhenMissing() {
        Hiker hiker = new Hiker("kevinanddougHater", "Mr", "Fredrickson", 89);
        when(repository.update(hiker)).thenReturn(false);
        Result<Hiker> result = service.update(hiker);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalidValues() {
        Hiker hiker = new Hiker("johnnyappleseedofficial", "Johnny", "Appleseed", 128);
        when(repository.update(hiker)).thenReturn(false);
        Result<Hiker> result = service.update(hiker);
        assertEquals(ResultType.INVALID, result.getType());
    }

    Hiker makeHiker() {
        Hiker hiker = new Hiker();
        hiker.setHikerId("mallCopPB");
        hiker.setFirstName("Paul");
        hiker.setLastName("Blart");
        hiker.setAge(23);
        return hiker;
    }
}