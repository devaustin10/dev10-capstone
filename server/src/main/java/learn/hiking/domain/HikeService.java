package learn.hiking.domain;

import learn.hiking.data.HikeRepository;
import learn.hiking.models.Hike;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HikeService {
    private final HikeRepository repository;

    public HikeService(HikeRepository repository) {
        this.repository = repository;
    }

    public List<Hike> findAll() { return repository.findAll();}






}
