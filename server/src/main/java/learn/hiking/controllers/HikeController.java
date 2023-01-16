package learn.hiking.controllers;

import learn.hiking.models.Hike;
import learn.hiking.domain.HikeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
// @RequestMapping("")  - Do we know what URL goes here?
public class HikeController {

    private final HikeService service;

    public HikeController(HikeService service) {this.service = service;}

    @GetMapping
    public List<Hike> findAll() {return service.findAll();}

    // BugSightingController Pathing Guideline
}
