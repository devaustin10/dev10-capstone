package learn.hiking.data;

import learn.hiking.data.mappers.TrailDifficultyMapper;
import learn.hiking.data.mappers.TrailMapper;
import learn.hiking.models.Trail;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import learn.hiking.models.TrailDifficulty;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class TrailDifficultyJdbcTemplateRepository implements TrailDifficultyRepository{
    private final JdbcTemplate jdbcTemplate;

    public TrailDifficultyJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


  @Override
    public List<TrailDifficulty> findAll() {
        final String sql = "select trail_difficulty_id, `description` "
                + "from trail_difficulty limit 100;";
        return jdbcTemplate.query(sql, new TrailDifficultyMapper());
    }

  @Override
    public TrailDifficulty findById(int trailDifficultyId){
      final String sql = "select trail_difficulty_id,`description` " +
              "from trail_difficulty " +
              "where trail_difficulty_id = ?;";

      return jdbcTemplate.query(sql, new TrailDifficultyMapper(), trailDifficultyId).stream()
              .findFirst()
              .orElse(null);
    }
}
