package learn.hiking.data;

import learn.hiking.data.mappers.HikeMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Hike;

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
        final String sql = "select hiker_id, first_name, last_name, age, email from hike where hike_id = ?;";
        Hike hike = (Hike)this.jdbcTemplate.query("select hiker_id, first_name, last_name, age, email from hike where hike_id = ?;",
                new HikeMapper(), new Object[]{hike.getHikeId()}).stream().findFirst().orElse((Object)null);
        if (hike != null) {
            this.add(hike);
        }
        return null;
    }

    @Override
    public Hike add(Hike hike) {
        return null;
    }

    @Override
    public boolean update(Hike hike) {
        return false;
    }

    @Override
    public boolean deleteById(int hikeId) {
        return false;
    }
}
