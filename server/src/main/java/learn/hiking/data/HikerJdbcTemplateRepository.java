package learn.hiking.data;

import learn.hiking.data.mappers.HikeMapper;
import learn.hiking.data.mappers.HikerMapper;
import learn.hiking.data.mappers.TrailMapper;
import learn.hiking.models.Hike;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Hiker;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;


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
    @Transactional
    public Hiker findById(int hikerId) {
        final String sql = "select hiker_id, first_name, last_name, age, email, from hiker where hiker_id = ?;";
        return jdbcTemplate.query(sql, new HikerMapper(), hikerId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Hiker add(Hiker hiker) {
        final String sql = "insert into hiker (first_name, last_name, age, email) from hiker values (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = this.jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement("insert into hiker (first_name, last_name, age, email) from hiker values (?,?,?,?);", 1);
            ps.setString(1, hiker.getFirstName());
            ps.setString(2, hiker.getLastName());
            ps.setString(3, String.valueOf(hiker.getAge()));
            ps.setString(4, hiker.getEmail());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        } else {
            hiker.setHikerId(keyHolder.getKey().intValue());
            return hiker;
        }
    }

    @Override
    public boolean update(Hiker hiker) {
        final String sql = "update hiker set " +
                "hiker_id = ?, " +
                "first_name = ?, " +
                "last_name = ?, " +
                "age = ?, " +
                "email = ?, " +
                "where hiker_id = ?;";
        return jdbcTemplate.update(sql,
                hiker.getHikerId(),
                hiker.getFirstName(),
                hiker.getLastName(),
                hiker.getAge(),
                hiker.getEmail()) > 0;
    }

    @Override
    public boolean deleteById(int hikerId) {
        this.jdbcTemplate.update("delete from hiker where hiker_id = ?;", new Object[]{hikerId});
        return this.jdbcTemplate.update("delete from hiker where hiker_id=?;", new Object[]{hikerId}) > 0;
    }
}
