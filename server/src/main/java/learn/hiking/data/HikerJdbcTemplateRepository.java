package learn.hiking.data;

import learn.hiking.data.mappers.HikerMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Hiker;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;


import java.sql.Statement;
import java.util.List;
import java.util.Objects;

@Repository
public class HikerJdbcTemplateRepository implements HikerRepository {
    private final JdbcTemplate jdbcTemplate;

    public HikerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Hiker> findAll() {
        final String sql = "select hiker_id, first_name, last_name, age"
                + " from hiker limit 1000;";
        return jdbcTemplate.query(sql, new HikerMapper());
    }

    @Override
    @Transactional
    public Hiker findById(String hikerId) {
        final String sql = "select hiker_id, first_name, last_name, age from hiker where hiker_id = ?;";
        return jdbcTemplate.query(sql, new HikerMapper(), hikerId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Hiker add(Hiker hiker) {
        final String sql = "insert into hiker (first_name, last_name, age, hiker_id)" + " values (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = this.jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, hiker.getFirstName());
            ps.setString(2, hiker.getLastName());
            ps.setString(3, String.valueOf(hiker.getAge()));
            ps.setString(4, hiker.getHikerId());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0) {
            return null;
        } else {
            hiker.setHikerId((keyHolder.getKey().toString());
            return hiker;
        }
    }

    @Override
    public boolean update(Hiker hiker) {
        final String sql = "update hiker set " +
                "first_name = ?, " +
                "last_name = ?, " +
                "age = ?, " +
                "where hiker_id = ?;";
        return jdbcTemplate.update(sql,
                hiker.getFirstName(),
                hiker.getLastName(),
                hiker.getAge(),
                hiker.getHikerId()) > 0;
    }

    @Override
    public boolean deleteById(String hikerId) {
        return jdbcTemplate.update("delete from hiker where hiker_id=?;", hikerId) > 0;
    }
}
