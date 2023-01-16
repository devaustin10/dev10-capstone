package learn.hiking.data.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import learn.hiking.models.Roles;
import org.springframework.jdbc.core.RowMapper;

public class RolesMapper implements RowMapper<Roles> {
    public RolesMapper() {
    }

    public Roles mapRow(ResultSet resultSet, int i) throws SQLException {
        Roles roles = new Roles();
        roles.setRolesId(resultSet.getInt("roles_id"));
        roles.setDescription(resultSet.getString("description"));
        return roles;
    }
}