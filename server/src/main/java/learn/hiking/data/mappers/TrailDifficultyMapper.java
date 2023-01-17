package learn.hiking.data.mappers;

import learn.hiking.models.TrailDifficulty;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


public class TrailDifficultyMapper implements RowMapper<TrailDifficulty> {


        public TrailDifficulty mapRow(ResultSet resultSet, int i) throws SQLException {
            TrailDifficulty trailDifficulty = new TrailDifficulty();
            trailDifficulty.setTrailDifficultyId(resultSet.getInt("trail_difficulty_id"));
            trailDifficulty.setDescription(resultSet.getString("description"));
            return trailDifficulty;
        }

}
