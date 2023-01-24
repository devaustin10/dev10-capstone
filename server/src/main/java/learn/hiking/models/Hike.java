package learn.hiking.models;

import java.time.LocalDate;

public class Hike {
    private int hikeId;
    private LocalDate hikeDate;
    private String hikeDifficulty;
    private String description;
    private String hikerId;
    private int trailId;

    public Hike() {

    }

    public Hike(int hikeId, LocalDate hikeDate, String hikeDifficulty, String description, String hikerId, int trailId) {
        this.hikeId = hikeId;
        this.hikeDate = hikeDate;
        this.hikeDifficulty = hikeDifficulty;
        this.description = description;
        this.hikerId = hikerId;
        this.trailId = trailId;
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

    public String getHikerId() {
        return hikerId;
    }

    public void setHikerId(String hikerId) {
        this.hikerId = hikerId;
    }

    public int getTrailId() {
        return trailId;
    }

    public void setTrailId(int trailId) {
        this.trailId = trailId;
    }
}
