package learn.hiking.domain;

import learn.hiking.data.TrailRepository;
import learn.hiking.models.Trail;

import java.time.LocalDate;
import java.util.List;

public class TrailService {
    private final TrailRepository repository;

    public TrailService(TrailRepository repository) {
        this.repository = repository;
    }

    public List<Trail> findAll() { return repository.findAll();}

    public Trail findById(int TrailId) { return this.repository.findById(TrailId);}

    public Result<Trail> add(Trail Trail) {
        Result<Trail> result = validate(Trail);
        if (!result.isSuccess()) {
            return result;
        } else if (Trail.getTrailId() != 0) {
            result.addMessage("TrailId cannot be set for add", ResultType.INVALID);
            return result;
        } else {
            Trail = this.repository.add(Trail);
            result.setPayload(Trail);
            return result;
        }
    }

    public Result<Trail> update(Trail Trail) {
        Result<Trail> result = this.validate(Trail);
        if (!result.isSuccess()) {
            return result;
        } else if (Trail.getTrailId() <= 0) {
            result.addMessage("TrailId must be set for update", ResultType.INVALID);
            return result;
        } else {
            if (!this.repository.update(Trail)) {
                String message = String.format("TrailId: %s, not found", Trail.getTrailId());
                result.addMessage(message, ResultType.NOT_FOUND);
            }
            return result;
        }
    }

    public boolean deleteById(int TrailId) {
        return this.repository.deleteById(TrailId);
    }

    private Result<Trail> validate(Trail Trail) { // Add City and State
        Result<Trail> result = new Result<>();
        if (Trail == null) {
            result.addMessage("Trail cannot be null", ResultType.INVALID);
        } else {
            if (Validations.isNullOrBlank(String.valueOf(Trail.getTrailId()))) {
                result.addMessage("Trail must have TrailId.", ResultType.INVALID);
            }
            if (Validations.isNullOrBlank(String.valueOf((Trail.getTrailName())))) {
                result.addMessage("Trail name cannot be blank or empty.", ResultType.INVALID);
            }
            if (Validations.isNullOrBlank(String.valueOf(Trail.getTrailDistance()))) {
                result.addMessage("Trail distance cannot be blank or empty", ResultType.INVALID);
            }
            if (Validations.isNullOrBlank(String.valueOf(Trail.getTrailDifficultyId()))) {
                result.addMessage("Trail must have trailDifficultyId", ResultType.INVALID);
            }
        }

        return result;
    }
}
