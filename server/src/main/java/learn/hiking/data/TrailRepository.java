package learn.hiking.data;

import learn.hiking.models.Trail;

import java.util.List;

public interface TrailRepository {

    List<Trail> findAll();

    Trail findById(int trailId);

    Trail add(Trail trail);

    boolean update(Trail trail);

    boolean deleteById(int trailId);

}