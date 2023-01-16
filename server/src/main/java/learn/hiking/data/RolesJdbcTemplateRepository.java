package learn.hiking.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import learn.hiking.models.Roles;

import java.util.List;

@Repository
public class RolesJdbcTemplateRepository implements RolesRepository {
    private final JdbcTemplate jdbcTemplate;

    public RolesJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

}