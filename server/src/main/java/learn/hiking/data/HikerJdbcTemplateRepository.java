package learn.hiking.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Hiker;

@Repository
public class HikerJdbcTemplateRepository implements HikerRepository {
    private final JdbcTemplate jdbcTemplate;

    public HikerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

}
