package learn.hiking.data;

import learn.hiking.models.Trail;

public interface TrailRepository {

    Trail findById(int trailId);

    Trail add(Trail trail);

    boolean update(Trail trail);

    boolean deleteById(int trailId);

}