package learn.hiking.data.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import learn.hiking.models.Location;
import org.springframework.jdbc.core.RowMapper;

public class LocationMapper implements RowMapper<Location> {
    public LocationMapper() {
    }

    public Location mapRow(ResultSet resultSet, int i) throws SQLException {
        Location location = new Location();
        location.setLocationId(resultSet.getInt("location_id"));
        location.setCity(resultSet.getString("city"));
        location.setState(resultSet.getString("state"));

        return location;
    }
}