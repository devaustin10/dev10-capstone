package learn.hiking.data.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import learn.hiking.models.Trail;
import org.springframework.jdbc.core.RowMapper;

public class TrailMapper implements RowMapper<Trail> {
    public TrailMapper() {
    }

    public Trail mapRow(ResultSet resultSet, int i) throws SQLException {
        Trail trail = new Trail();
        trail.setTrailId(resultSet.getInt("trail_id"));
        trail.setTrailName(resultSet.getString("trail_name"));
        trail.setTrailDistance(resultSet.getDouble("trail_distance"));
        trail.setTrailDifficultyId(resultSet.getInt("trail_difficulty_id"));
        trail.setCity(resultSet.getString("city"));
        trail.setState(resultSet.getString("state"));
        return trail;
    }
}
