package learn.hiking.models;

public class Trail {
    private int trailId;
    private String trailName;
    private String city;
    private String state;
    private double trailDistance;
    private int trailDifficultyId;

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

    public double getTrailDistance() {
        return trailDistance;
    }

    public void setTrailDistance(double trailDistance) {
        this.trailDistance = trailDistance;
    }

    public int getTrailDifficultyId() {
        return trailDifficultyId;
    }

    public void setTrailDifficultyId(int trailDifficultyId) {
        this.trailDifficultyId = trailDifficultyId;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

}
