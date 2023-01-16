package learn.hiking.data;

import learn.hiking.models.Location;

public interface LocationRepository {

    Location findById(int locationId);

    Location add(Location location);

    boolean update(Location location);

    boolean deleteById(int locationId);

}
