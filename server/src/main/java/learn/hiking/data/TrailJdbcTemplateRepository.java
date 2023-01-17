package learn.hiking.data;

import learn.hiking.data.mappers.TrailMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Trail;
import java.util.List;

/*
trail_id
trail_name
trail_distance
trail_difficulty_id
city
state
 */

@Repository
public class TrailJdbcTemplateRepository implements TrailRepository {
    private final JdbcTemplate jdbcTemplate;

    public TrailJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Trail> findAll() {
        final String sql = "select trail_id, trail_name, trail_distance, trail_difficulty_id, city, state "
                + "from trail limit 1000;";
        return jdbcTemplate.query(sql, new TrailMapper());

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