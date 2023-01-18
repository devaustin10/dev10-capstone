package learn.hiking.data;

import learn.hiking.data.mappers.TrailDifficultyMapper;
import learn.hiking.data.mappers.TrailMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Trail;

import java.sql.PreparedStatement;
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
        final String sql = "select trail_id, trail_name, trail_distance, trail_difficulty_id, city, state from trail where trail_id = ?;";
        return jdbcTemplate.query(sql, new TrailMapper(), trailId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Trail add(Trail trail) {
        final String sql = "insert into trail (trail_name, trail_distance, trail_difficulty_id, city, state) from trail values (?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = this.jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement("insert into trail (trail_name, trail_distance, trail_difficulty_id, city, state) from trail values (?,?,?,?,?);", 1);
            ps.setString(1, trail.getTrailName() );
            ps.setString(2, String.valueOf(trail.getTrailDistance()));
            ps.setString(3, String.valueOf(trail.getTrailDifficultyId()));
            ps.setString(4, trail.getCity());
            ps.setString(5, trail.getState());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        } else {
            trail.setTrailId(keyHolder.getKey().intValue());
            return trail;
        }
    }

    @Override
    public boolean update(Trail trail) {
        final String sql = "update trail set " +
                "trail_id = ?, " +
                "trail_name = ?, " +
                "trail_distance = ?, " +
                "trail_difficulty_id = ?, " +
                "city = ?, " +
                "state = ?, " +
                "where trail_id = ?;";

        return jdbcTemplate.update(sql,
                trail.getTrailId(),
                trail.getTrailName(),
                trail.getTrailDistance(),
                trail.getTrailDifficultyId(),
                trail.getCity(),
                trail.getState()) > 0;
    }

    @Override
    public boolean deleteById(int trailId) {
        this.jdbcTemplate.update("delete from trail where trail_id = ?;", new Object[]{trailId});
        return this.jdbcTemplate.update("delete from trail where trail_id = ?;", new Object[]{trailId}) > 0;
    }
}