package learn.hiking.domain;

import learn.hiking.data.HikeRepository;
import learn.hiking.models.Hike;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HikeService {

    // verify times ->  mockito (advanced mockito learning goal)
    private final HikeRepository repository;

    public HikeService(HikeRepository repository) {
        this.repository = repository;
    }

    public List<Hike> findAll() { return repository.findAll();}

    public Hike findById(int hikeId) { return this.repository.findById(hikeId);}

    public Result<Hike> add(Hike hike) {
        Result<Hike> result = validate(hike);
        if (!result.isSuccess()) {
            return result;
        } else if (hike.getHikeId() != 0) {
            result.addMessage("hikeId cannot be set for add", ResultType.INVALID);
            return result;
        } else {
            hike = this.repository.add(hike);
            result.setPayload(hike);
            return result;
        }
    }

    public Result<Hike> update(Hike hike) {
        Result<Hike> result = this.validate(hike);
        if (!result.isSuccess()) {
            return result;
        } else if (hike.getHikeId() <= 0) {
            result.addMessage("hikeId must be set for update", ResultType.INVALID);
            return result;
        } else {
            if (!this.repository.update(hike)) {
                String message = String.format("hikeId: %s, not found", hike.getHikeId());
                result.addMessage(message, ResultType.NOT_FOUND);
            }
            return result;
        }
    }

    public boolean deleteById(int hikeId) {
        return this.repository.deleteById(hikeId);
    }

    private Result<Hike> validate(Hike hike) {
        Result<Hike> result = new Result<>();
        if (hike == null) {
            result.addMessage("hike cannot be null", ResultType.INVALID);
        } else {
            if (Validations.isNullOrBlank(String.valueOf(hike.getHikerId()))) {
                result.addMessage("hike must have hikerId", ResultType.INVALID);
            }
            if (Validations.isNullOrBlank(String.valueOf(hike.getHikeDate()))) {
                result.addMessage("hike date cannot be blank", ResultType.INVALID);
            } else if (hike.getHikeDate().isAfter(LocalDate.now())) {
                 result.addMessage("hike date cannot be a future date", ResultType.INVALID);
            }
            if (Validations.isNullOrBlank(hike.getDescription())) {
                result.addMessage("hike description cannot be blank or empty", ResultType.INVALID);
            }
            if (Validations.isNullOrBlank(String.valueOf(hike.getTrailId()))) {
                result.addMessage("hike must have trailId", ResultType.INVALID);
            }
        }

        return result;
    }
}
