package learn.hiking.data;

import learn.hiking.data.mappers.HikeMapper;
import learn.hiking.data.mappers.HikerMapper;
import learn.hiking.models.Hike;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Hiker;

import java.util.List;

@Repository
public class HikerJdbcTemplateRepository implements HikerRepository {
    private final JdbcTemplate jdbcTemplate;

    public HikerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Hiker> findAll() {
        final String sql = "select hiker_id, first_name, last_name, age, email"
                + "from hiker limit 1000;";
        return jdbcTemplate.query(sql, new HikerMapper());
    }

    @Override
    public Hiker findById(int hikerId) {
        final String sql = "select hiker_id, first_name, last_name,age, email, from hiker where hiker_id = ?;";
        Hiker hiker = (Hiker)this.jdbcTemplate.query("select hiker_id, first_name, last_name, age, hiker_id, email from hiker where hiker_id = ?;",
                new HikerMapper(), new Object[]{hikerId}).stream().findFirst().orElse((Hiker) null);
        if (hiker != null) {
            this.add(hiker);
        }
        return null;
    }

    @Override
    public Hiker add(Hiker hiker) {
        return null;
    }

    @Override
    public boolean update(Hiker hiker) {
        return false;
    }

    @Override
    public boolean deleteById(int hikerId) {
        return false;
    }
}
