package learn.hiking.controllers;

import learn.hiking.domain.TrailDifficultyService;
import learn.hiking.domain.TrailService;
import learn.hiking.models.Trail;
import learn.hiking.models.TrailDifficulty;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/TrailDifficulty")
public class TrailDifficultyController {
    private final TrailDifficultyService service;

    public TrailDifficultyController(TrailDifficultyService service) {this.service = service;}

    @GetMapping
    public List<TrailDifficulty> findAll() { return service.findAll(); }

    @GetMapping("/{trailDifficultyId}")
    public TrailDifficulty findById(@PathVariable int trailDifficultyId) { return service.findById(trailDifficultyId); }
}
