package learn.hiking.data;

import learn.hiking.data.mappers.HikeMapper;
import learn.hiking.data.mappers.TrailMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import learn.hiking.models.Hike;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

/*
hike_id int primary key auto_increment,
hike_date date not null,
hike_difficulty varchar (250) not null,
`description` varchar (255) not null,
hiker_id int not null,
trail_id int not null,
 */


@Repository
public class HikeJdbcTemplateRepository implements HikeRepository {
    private final JdbcTemplate jdbcTemplate;

    public HikeJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Hike> findAll() {
        final String sql = "select hike_id, hike_date, hike_difficulty, `description`, hiker_id, trail_id "
                + "from hike limit 1000;";
        return jdbcTemplate.query(sql, new HikeMapper());
    }

    @Override
    @Transactional //if RTE => roles back change it made
    public Hike findById(int hikeId) {
        final String sql = "select hike_id, hike_date, hike_difficulty,`description`, hiker_id, trail_id from hike where hike_id = ?;";
        return jdbcTemplate.query(sql, new HikeMapper(), hikeId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Hike add(Hike hike) {
        final String sql = "insert into hike (hike_date, hike_difficulty, `description`, hiker_id, trail_id) "
                + " values (?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = this.jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, String.valueOf(hike.getHikeDate()));
            ps.setString(2, hike.getHikeDifficulty());
            ps.setString(3, hike.getDescription());
            ps.setString(4, hike.getHikerId());
            ps.setString(5, String.valueOf(hike.getTrailId()));
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        } else {
            hike.setHikeId(keyHolder.getKey().intValue());
            return hike;
        }
    }

    @Override
    public boolean update(Hike hike) {

        final String sql = "update hike set "
                + "hike_date = ?, "
                + "hike_difficulty = ?, "
                + "`description` = ?, "
                + "trail_id = ? "
                + "where hike_id = ?;";

        return jdbcTemplate.update(sql,
                hike.getHikeDate(),
                hike.getHikeDifficulty(),
                hike.getDescription(),
//                hike.getHikerId(),
                hike.getTrailId(),
                hike.getHikeId()) > 0;
    }


    @Override
    @Transactional
    public boolean deleteById(int hikeId) {
        return jdbcTemplate.update("delete from hike where hike_id = ?;", hikeId) > 0;
    }
}