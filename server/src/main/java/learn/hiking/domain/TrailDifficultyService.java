package learn.hiking.domain;

import learn.hiking.data.TrailDifficultyRepository;
import learn.hiking.models.TrailDifficulty;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TrailDifficultyService{

    private final TrailDifficultyRepository repository;

    public TrailDifficultyService(TrailDifficultyRepository repository) {
        this.repository = repository;
    }

    public List<TrailDifficulty> findAll() { return repository.findAll();}

    public TrailDifficulty findById(int trailDifficultyId) { return this.repository.findById(trailDifficultyId);}
}
