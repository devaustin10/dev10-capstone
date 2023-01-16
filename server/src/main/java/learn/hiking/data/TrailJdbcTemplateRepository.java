package learn.hiking.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Trail;

@Repository
public class TrailJdbcTemplateRepository implements TrailRepository {
    private final JdbcTemplate jdbcTemplate;

    public TrailJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Trail findById(int trailId) {
        return null;
    }

    @Override
    public Trail add(Trail trail) {
        return null;
    }

    @Override
    public boolean update(Trail trail) {
        return false;
    }

    @Override
    public boolean deleteById(int trailId) {
        return false;
    }
}