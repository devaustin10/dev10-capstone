package learn.hiking.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Hike;

import java.util.List;

@Repository
public class HikeJdbcTemplateRepository implements HikeRepository {
    private final JdbcTemplate jdbcTemplate;

    public HikeJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

}
