package learn.hiking.models;

public class TrailDifficulty {
    private int trailDifficultyId;
    private String description;

    public TrailDifficulty() {
    }

    public int getTrailDifficultyId() {
        return trailDifficultyId;
    }

    public void setTrailDifficultyId(int trailDifficultyId) {
        this.trailDifficultyId = trailDifficultyId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
