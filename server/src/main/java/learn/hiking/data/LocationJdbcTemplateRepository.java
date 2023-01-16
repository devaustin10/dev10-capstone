package learn.hiking.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Location;


@Repository
public class LocationJdbcTemplateRepository implements LocationRepository {

    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Location findById(int locationId) {
        return null;
    }

    @Override
    public Location add(Location location) {
        return null;
    }

    @Override
    public boolean update(Location location) {
        return false;
    }

    @Override
    public boolean deleteById(int locationId) {
        return false;
    }
}