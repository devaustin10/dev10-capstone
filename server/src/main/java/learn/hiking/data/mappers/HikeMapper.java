package learn.hiking.data.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import learn.hiking.models.Hike;
import org.springframework.jdbc.core.RowMapper;

public class HikeMapper implements RowMapper<Hike> {
    public HikeMapper() {
    }

    public Hike mapRow(ResultSet resultSet, int i) throws SQLException {
        Hike hike = new Hike();
        hike.setHikeId(resultSet.getInt("hike_id"));
        hike.setHikeDate(resultSet.getDate("hike_date").toLocalDate());
        hike.setHikeDifficulty(resultSet.getString("hike_difficulty"));
        hike.setDescription(resultSet.getString("description"));
        hike.setHikerId(resultSet.getInt("hiker_id"));
        hike.setTrailId(resultSet.getInt("trail_id"));

        // might not need foreign keys for mappers

        return hike;
    }
}
