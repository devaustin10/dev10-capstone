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
        trail.setTrailDistance(resultSet.getInt("trail_distance"));
        trail.setTrailDifficulty(resultSet.getString("trail_difficulty"));
        trail.setLocationId(resultSet.getInt("location_id"));

        return trail;
    }
}
