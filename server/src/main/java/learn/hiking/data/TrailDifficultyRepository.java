package learn.hiking.data;

import learn.hiking.models.Trail;
import learn.hiking.models.TrailDifficulty;

import java.util.List;

public interface TrailDifficultyRepository {

    List<TrailDifficulty> findAll();

    TrailDifficulty findById(int trailDifficultyId);

}
