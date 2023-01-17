package learn.hiking.models;

public class Trail {
    private int trailId;
    private String trailName;
    private int trailDistance;
    private String trailDifficulty;
    private String city;
    private String state;



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

    public String getTrailDifficulty() {
        return trailDifficulty;
    }

    public void setTrailDifficulty(String trailDifficulty) {
        this.trailDifficulty = trailDifficulty;
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
