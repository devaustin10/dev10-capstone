package learn.hiking.data;

import learn.hiking.data.mappers.HikeMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Hiker;

import java.util.List;

@Repository
public class HikerJdbcTemplateRepository implements HikerRepository {
    private final JdbcTemplate jdbcTemplate;

    public HikerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Hiker> findAll() {
    }

    @Override
    public Hiker findById() {
        return null;
    }

    @Override
    public Hiker add(Hiker hiker) {
        return null;
    }

    @Override
    public boolean update(Hiker hiker) {
        return false;
    }

    @Override
    public boolean deleteById(int hikerId) {
        return false;
    }
}
