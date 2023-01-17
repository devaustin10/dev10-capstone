package learn.hiking.data;

import learn.hiking.data.mappers.HikeMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import learn.hiking.models.Hike;

import java.sql.PreparedStatement;
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
        final String sql = "select hike_id, hike_date, hike_difficulty, hiker_id, trail_id "
                + "from hike limit 1000;";
        return jdbcTemplate.query(sql, new HikeMapper());
    }

    @Override
    public Hike findById() {
        return null;
    }

    @Override
    public Hike findById(int hikeId) {
        final String sql = "select hike_id, hike_date, hike_difficulty, hiker_id, trail_id from hike where hike_id = ?;";
        Hike hike = (Hike)this.jdbcTemplate.query("select hike_id, hike_date, hike_difficulty, hiker_id, trail_id from hike where hike_id = ?;",
                new HikeMapper(), new Object[]{hikeId}).stream().findFirst().orElse((Hike) null);
        if (hike != null) {
            this.add(hike);
        }
        return null;
    }

    @Override
    public Hike add(Hike hike) {
        final String sql = "insert into hike (hike_date, hike_difficulty, hiker_id, trail_id) from hike values (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = this.jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement("insert into hike (hike_date, hike_difficulty, hiker_id, trail_id) from hike values (?,?,?,?);",1);
            ps.setString(1, String.valueOf(hike.getHikeDate()));
            ps.setString(2, hike.getHikeDifficulty());
            ps.setString(3, String.valueOf(hike.getHikerId()));
            ps.setString(4, String.valueOf(hike.getTrailId()));
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        } else {
            hike.setHikeId(keyHolder.getKey().intValue());
            return hike;
        }

    @Override
    public boolean update(Hike hike) {

        final String sql = "update hike set "
                + "hike_id = ?, "
                + "hike_date = ?, "
                + "hike_difficulty = ?, "
                + "`description` = ?, "
                + "where hiker_id = ? and trail_id = ?;";

        return jdbcTemplate.update(sql,
                hike.getHikeId(),
                hike.getHikeDate(),
                hike.getHikeDifficulty(),
                hike.getDescription(),
                hike.getHikerId(),
                hike.getTrailId()) > 0;
    }


    @Override
    public boolean deleteById(int hikeId) {
        return jdbcTemplate.update("delete from hike where hike_id = ?;", hikeId) > 0;
    }
}
