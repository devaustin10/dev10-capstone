package learn.hiking.controllers;

import learn.hiking.models.Hike;
import learn.hiking.domain.HikeService;
import learn.hiking.domain.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/hike")
public class HikeController {

    private final HikeService service;

    public HikeController(HikeService service) {this.service = service;}

    @GetMapping
    public List<Hike> findAll() { return service.findAll(); }

    @GetMapping("/{hikeId}")
    public ResponseEntity<Hike> findById(@PathVariable int hikeId) {
        Hike result = service.findById(hikeId);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Hike hike) {
        Result<Hike> result = service.add(hike);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{hikeId}")
    public ResponseEntity<Object> update(@PathVariable int hikeId, @RequestBody Hike hike) {
        if (hikeId != hike.getHikeId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Hike> result = service.update(hike);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{hikeId}")
    public ResponseEntity<Void> deleteById(@PathVariable int hikeId) {
        if (service.deleteById(hikeId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    // BugSightingController Pathing Guideline
}
