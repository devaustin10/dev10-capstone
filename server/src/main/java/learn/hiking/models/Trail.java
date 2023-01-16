package learn.hiking.models;

public class Trail {
    private int trailId;
    private String trailName;
    private int trailDistance;
    private int trailDifficulty;
    private int locationId;

    public Trail() {
    }

    public int getTrailId() {
        return trailId;
    }

    public void setTrailId(int trailId) {
        this.trailId = trailId;
    }

    public String getTrailName() {
        return trailName;
    }

    public void setTrailName(String trailName) {
        this.trailName = trailName;
    }

    public int getTrailDistance() {
        return trailDistance;
    }

    public void setTrailDistance(int trailDistance) {
        this.trailDistance = trailDistance;
    }

    public int getTrailDifficulty() {
        return trailDifficulty;
    }

    public void setTrailDifficulty(int trailDifficulty) {
        this.trailDifficulty = trailDifficulty;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }
}
