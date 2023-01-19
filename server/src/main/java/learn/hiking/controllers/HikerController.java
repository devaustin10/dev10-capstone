package learn.hiking.controllers;

import learn.hiking.controllers.ErrorResponse;
import learn.hiking.domain.HikeService;
import learn.hiking.domain.HikerService;
import learn.hiking.domain.Result;
import learn.hiking.models.Hiker;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/hiker")
public class HikerController {
    private final HikerService service;

    public HikerController(HikerService service) {this.service = service;}

    @GetMapping
    public List<Hiker> findAll() {
        return service.findAll();
    }

    @GetMapping("/{hikerId}")
    public Hiker findById(@PathVariable int hikerId) {
        return service.findById(hikerId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Hiker hiker) {
        Result<Hiker> result = service.add(hiker);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{hikerId}")
    public ResponseEntity<Object> update(@PathVariable int hikerId, @RequestBody Hiker hiker) {
        if (hikerId != hiker.getHikerId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Hiker> result = service.update(hiker);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
        }

    @DeleteMapping("/{hikerId}")
    public ResponseEntity<Void> deleteById(@PathVariable int hikerId) {
        if (service.deleteById(hikerId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
