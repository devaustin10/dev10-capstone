package learn.hiking.data;

import learn.hiking.models.Hiker;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface HikerRepository {

    List<Hiker> findAll();

    Hiker findById();

    Hiker add(Hiker hiker);

    boolean update(Hiker hiker);

    @Transactional
    boolean deleteById(int hikerId);

}
