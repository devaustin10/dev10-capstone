package learn.hiking.domain;

import learn.hiking.data.HikerRepository;
import learn.hiking.models.Hiker;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HikerService {
    private final HikerRepository repository;

    public HikerService(HikerRepository repository) {
        this.repository = repository;
    }

    public List<Hiker> findAll() { return repository.findAll();}

    public Hiker findById(String hikerId) { return this.repository.findById(hikerId);}

    public Result<Hiker> add(Hiker hiker) {
        Result<Hiker> result = validate(hiker);
        if (!result.isSuccess()) {
            return result;
        } else if (hiker.getHikerId() != null) {
            result.addMessage("hikerId cannot be set for add", ResultType.INVALID);
            return result;
        } else {
            hiker = this.repository.add(hiker);
            result.setPayload(hiker);
            return result;
        }
    }

    public Result<Hiker> update(Hiker hiker) {
        Result<Hiker> result = this.validate(hiker);
        if (!result.isSuccess()) {
            return result;
        } else if (hiker.getHikerId() != null) {
            result.addMessage("hikerId must be set for update", ResultType.INVALID);
            return result;
        } else {
            if (!this.repository.update(hiker)) {
                String message = String.format("hikerId: %s, not found", hiker.getHikerId());
                result.addMessage(message, ResultType.NOT_FOUND);
            }
            return result;
        }
    }

    public boolean deleteById(String hikerId) {
        return this.repository.deleteById(hikerId);
    }

    private Result<Hiker> validate(Hiker hiker) {
        Result<Hiker> result = new Result<>();
        if (hiker == null) {
            result.addMessage("hiker cannot be null", ResultType.INVALID);
        } else {
            if (Validations.isNullOrBlank(hiker.getFirstName())) {
                result.addMessage("hiker must have valid first name", ResultType.INVALID);
            }
            if (Validations.isNullOrBlank(hiker.getLastName())) {
                result.addMessage("hiker must have valid last name", ResultType.INVALID);
            }
            if (hiker.getAge() < 8 || hiker.getAge() > 100) {
                result.addMessage("hiker age must be greater than 8 and less than 100", ResultType.INVALID);
            } //age is currently optional
        }

        return result;
    }


}
