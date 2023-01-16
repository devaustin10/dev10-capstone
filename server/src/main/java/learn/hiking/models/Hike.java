package learn.hiking.models;

import java.time.LocalDate;

public class Hike {
    private int hikeId;
    private LocalDate hikeDate;
    private String hikeDifficulty;
    private String description;
    private int hikerId;
    private int trailId;

    public Hike() {
    }

    public int getHikeId() {
        return hikeId;
    }

    public void setHikeId(int hikeId) {
        this.hikeId = hikeId;
    }

    public LocalDate getHikeDate() {
        return hikeDate;
    }

    public void setHikeDate(LocalDate hikeDate) {
        this.hikeDate = hikeDate;
    }

    public String getHikeDifficulty() {
        return hikeDifficulty;
    }

    public void setHikeDifficulty(String hikeDifficulty) {
        this.hikeDifficulty = hikeDifficulty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getHikerId() {
        return hikerId;
    }

    public void setHikerId(int hikerId) {
        this.hikerId = hikerId;
    }

    public int getTrailId() {
        return trailId;
    }

    public void setTrailId(int trailId) {
        this.trailId = trailId;
    }
}
